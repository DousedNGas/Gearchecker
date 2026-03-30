// api/claude.js
// PAID_MODE=true  → no rate limit
// Default         → 5 req/IP/day, enforced via Vercel KV
//
// Rate limiting uses Vercel KV (KV_REST_API_URL + KV_REST_API_TOKEN).
// Falls back to an in-memory Map if KV is not configured — unreliable on
// serverless (resets on cold start) but acceptable for development.
//
// SEC-01 NOTE: The client currently sends the full system prompt. Moving
// system-prompt assembly to the server (so the client only sends gear data
// and spec/mode) is the recommended next step to close the prompt-injection
// surface. Tracked as SEC-01 in the audit report.

const ipHits      = new Map(); // fallback only — not reliable on Vercel
const DAILY_LIMIT    = 5;
const MAX_MESSAGES   = 20;     // SEC-04: reject oversized message arrays
const MAX_SYSTEM_LEN = 50_000; // SEC-04: reject oversized system prompts

// ── KV-backed rate limit ─────────────────────────────────────────
// Uses Vercel KV REST API directly (no npm package required).
// Key: vw_rate:<ip>:<YYYY-MM-DD>  → integer hit count, TTL 24 h
async function isRateLimited(ip) {
  if (process.env.PAID_MODE === "true") return false;

  const kvUrl   = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const key   = `vw_rate:${ip}:${today}`;

      // INCR is atomic: increment and return new value in one call
      const incrRes = await fetch(`${kvUrl}/incr/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      if (!incrRes.ok) throw new Error(`KV incr ${incrRes.status}`);
      const { result: count } = await incrRes.json();

      // Set 24-hour TTL on first hit so keys self-expire
      if (count === 1) {
        fetch(`${kvUrl}/expire/${encodeURIComponent(key)}/86400`, {
          method: "POST",
          headers: { Authorization: `Bearer ${kvToken}` },
        }).catch(() => {}); // fire-and-forget; missing TTL is not fatal
      }

      return count > DAILY_LIMIT;
    } catch (e) {
      // KV unavailable — fall through to in-memory fallback
      console.warn("KV rate limit unavailable, using memory fallback:", e.message);
    }
  }

  // ── In-memory fallback (development / missing KV config) ───────
  const now   = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.resetAt > 86_400_000) {
    ipHits.set(ip, { count: 1, resetAt: now });
    return false;
  }
  if (entry.count >= DAILY_LIMIT) return true;
  entry.count++;
  return false;
}

// ── Strip tool-use plumbing — client only sees final text ────────
function extractFinalText(content = []) {
  return content
    .filter(b => b.type === "text")
    .map(b => b.text || "")
    .join("")
    .trim() || "No response.";
}

// ── Handler ──────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // SEC-03: Use Vercel's trusted headers before x-forwarded-for,
  // which is user-controllable and can be trivially spoofed.
  const ip =
    req.headers["x-real-ip"] ||
    req.headers["x-vercel-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    "unknown";

  if (await isRateLimited(ip)) {
    return res.status(429).json({ error: "Daily limit reached (5 analyses/day). Come back tomorrow!" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON body" }); }
  }

  const { system, messages, max_tokens } = body || {};

  // SEC-04: Reject requests with oversized payloads
  if (!messages?.length)
    return res.status(400).json({ error: "Missing messages" });
  if (messages.length > MAX_MESSAGES)
    return res.status(400).json({ error: "Too many messages" });
  if (typeof system === "string" && system.length > MAX_SYSTEM_LEN)
    return res.status(400).json({ error: "System prompt too large" });

  // SEC-02: Cap max_tokens server-side. Without this a caller can set it to
  // Haiku's ceiling (8,192) and generate very long completions on every request.
  const safeMaxTokens = Math.min(typeof max_tokens === "number" ? max_tokens : 2000, 2000);

  // web_search_20250305 is a server-side tool — Anthropic executes the search
  // and populates the results before the model sees them.
  const tools = [
    { type: "web_search_20250305", name: "web_search" },
  ];

  try {
    // Agentic loop: up to 4 rounds before forcing a text reply.
    let currentMessages = messages;
    let finalText       = "";

    for (let round = 0; round < 4; round++) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-beta": "prompt-caching-2024-07-31",
        },
        body: JSON.stringify({
          model:      "claude-haiku-4-5-20251001",
          max_tokens: safeMaxTokens,
          system:     system ?? "",
          messages:   currentMessages,
          tools,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Anthropic error:", response.status, JSON.stringify(data.error));
        return res.status(response.status).json({ error: data.error?.message || "API error" });
      }

      const hasToolUse = data.content?.some(b => b.type === "tool_use");
      if (!hasToolUse || data.stop_reason === "end_turn") {
        finalText = extractFinalText(data.content);
        break;
      }

      // CRIT-02 fix: For web_search_20250305, Anthropic executes the search
      // server-side and populates b.content with the real results.
      // Previously this sent a placeholder string, so Claude received text
      // saying results "will be provided" — but they never were. Claude was
      // answering from training data while the UI implied live verification.
      // Passing b.content (real results) or "" (signals Anthropic to fill in)
      // gives Claude actual web data.
      const toolResults = data.content
        .filter(b => b.type === "tool_use")
        .map(b => ({
          type:        "tool_result",
          tool_use_id: b.id,
          content:     b.content ?? "",
        }));

      currentMessages = [
        ...currentMessages,
        { role: "assistant", content: data.content },
        { role: "user",      content: toolResults  },
      ];

      if (round === 3) {
        finalText = extractFinalText(data.content) || "Search completed — no text response generated.";
      }
    }

    res.status(200).json({
      content: [{ type: "text", text: finalText }],
    });

  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: "Failed to reach Anthropic. Try again." });
  }
}
