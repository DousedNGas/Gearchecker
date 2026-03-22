// api/claude.js
// PAID_MODE=true  → use ANTHROPIC_API_KEY, no rate limit (Option D)
// PAID_MODE unset → use ANTHROPIC_API_KEY, 5 req/IP/day limit (Option B)

// In-memory IP store (resets on each cold start — good enough for rate limiting)
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
    return res.status(429).json({
      error: "Daily limit reached (5 analyses/day on free tier). Come back tomorrow!",
    });
  }

  const { system, messages, max_tokens } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", // Haiku = cheapest, still great for gear advice
        max_tokens: max_tokens || 1500,
        system,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic error:", response.status, data.error?.message);
      return res.status(response.status).json({ error: data.error?.message || "API error" });
    }

    res.status(200).json(data); // already in Anthropic shape, App.jsx reads it directly
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: "Failed to reach Anthropic. Try again." });
  }
}
