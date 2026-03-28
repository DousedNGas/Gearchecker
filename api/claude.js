// api/claude.js
// PAID_MODE=true → no rate limit
// Default        → 5 req/IP/day
//
// ⚠ KNOWN LIMITATION: In-memory rate limiting does not work reliably on
// Vercel serverless functions — each cold start gets a fresh Map.
// For real enforcement, replace ipHits with Vercel KV or Upstash Redis.
// The client-side dailyCount in localStorage is the actual user-facing limit.

const ipHits = new Map();
const DAILY_LIMIT = 5;

function isRateLimited(ip) {
  if (process.env.PAID_MODE === "true") return false;
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.resetAt > 24 * 60 * 60 * 1000) {
    ipHits.set(ip, { count: 1, resetAt: now });
    return false;
  }
  if (entry.count >= DAILY_LIMIT) return true;
  entry.count++;
  return false;
}

// Collapse tool_use + tool_result cycles in the response into plain text so the
// client only ever sees a single assistant text string — no tool plumbing leaks out.
function extractFinalText(content = []) {
  return content
    .filter(b => b.type === "text")
    .map(b => b.text || "")
    .join("")
    .trim() || "No response.";
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Daily limit reached (5 analyses/day). Come back tomorrow!" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON body" }); }
  }

  const { system, messages, max_tokens } = body || {};
  if (!messages?.length) return res.status(400).json({ error: "Missing messages" });

  // Web search tool — Claude can look up current Icy Veins / Wowhead pages mid-response
  const tools = [
    {
      type: "web_search_20250305",
      name: "web_search",
    },
  ];

  try {
    // Agentic loop: Claude may make multiple tool calls before producing a final text response.
    // We run up to 4 rounds then return whatever we have.
    let currentMessages = messages;
    let finalText = "";

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
          model: "claude-haiku-4-5-20251001",
          max_tokens: max_tokens || 2000,
          system: system ?? "",
          messages: currentMessages,
          tools,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Anthropic error:", response.status, JSON.stringify(data.error));
        return res.status(response.status).json({ error: data.error?.message || "API error" });
      }

      // If no tool use or stop_reason is end_turn, we're done
      const hasToolUse = data.content?.some(b => b.type === "tool_use");
      if (!hasToolUse || data.stop_reason === "end_turn") {
        finalText = extractFinalText(data.content);
        break;
      }

      // Tool use round: append assistant message + tool results and loop
      const toolResults = data.content
        .filter(b => b.type === "tool_use")
        .map(b => ({
          type: "tool_result",
          tool_use_id: b.id,
          content: b.input?.query
            ? `[Web search for "${b.input.query}" — results will be provided by the search tool]`
            : "[Tool result]",
        }));

      currentMessages = [
        ...currentMessages,
        { role: "assistant", content: data.content },
        { role: "user",      content: toolResults },
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
