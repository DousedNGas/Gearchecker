// api/claude.js
// PAID_MODE=true → no rate limit (Option D)
// Default        → 5 req/IP/day (Option B)

const ipHits = new Map();
const DAILY_LIMIT = 5;

function isRateLimited(ip) {
  if (process.env.PAID_MODE === "true") return false;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const entry = ipHits.get(ip);
  if (!entry || now - entry.resetAt > dayMs) {
    ipHits.set(ip, { count: 1, resetAt: now });
    return false;
  }
  if (entry.count >= DAILY_LIMIT) return true;
  entry.count++;
  return false;
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

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Missing or invalid messages field" });
  }

  // system can be a string OR an array of content blocks (with optional cache_control)
  // Anthropic accepts both formats — pass through as-is
  const systemPayload = system ?? "";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "prompt-caching-2024-07-31",  // enables cache_control blocks
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: max_tokens || 1500,
        system: systemPayload,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic error:", response.status, JSON.stringify(data.error));
      return res.status(response.status).json({ error: data.error?.message || "API error" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: "Failed to reach Anthropic. Try again." });
  }
}
