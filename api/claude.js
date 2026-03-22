// api/claude.js — Gemini 1.5 Flash proxy (free tier: 1,500 req/day)
// Accepts the same request shape as the Anthropic API so App.jsx needs no changes.

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { system, messages, max_tokens } = req.body;

  // Translate Anthropic message format → Gemini contents format
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const geminiBody = {
    systemInstruction: { parts: [{ text: system || "" }] },
    contents,
    generationConfig: {
      maxOutputTokens: max_tokens || 1500,
      temperature: 0.7,
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiBody),
      }
    );

    const data = await response.json();

    if (response.status === 429) {
      return res.status(429).json({ error: "Rate limit hit — wait a moment and try again." });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Gemini error" });
    }

    // Translate Gemini response → Anthropic response shape so App.jsx works unchanged
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.status(200).json({ content: [{ type: "text", text }] });

  } catch (err) {
    res.status(502).json({ error: "Failed to reach Gemini." });
  }
}
