// api/raiderio.js — Vercel serverless function
// Proxies Raider.IO character requests server-side, bypassing CORS entirely.
// Called from the frontend as: /api/raiderio?region=us&realm=stormrage&name=Arthas

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { region, realm, name } = req.query;

  if (!region || !realm || !name) {
    return res.status(400).json({ error: "Missing required params: region, realm, name" });
  }

  const url = `https://raider.io/api/v1/characters/profile?region=${encodeURIComponent(region)}&realm=${encodeURIComponent(realm)}&name=${encodeURIComponent(name)}&fields=gear`;

  // SEC-05: Enforce an 8-second timeout on the upstream fetch.
  // Without this the Vercel function hangs until the platform kills it (10 s),
  // consuming the function slot and leaving the user with no feedback.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const upstream = await fetch(url, {
      headers: { "User-Agent": "Apex-WoW-Advisor/1.0" },
      signal: controller.signal,
    });
    clearTimeout(timer);

    const data = await upstream.json();

    // Pass through the exact status code from Raider.IO
    res.status(upstream.status).json(data);
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      console.error("Raider.IO timeout");
      return res.status(504).json({ error: "Raider.IO took too long to respond. Try again." });
    }
    console.error("Raider.IO proxy error:", err);
    res.status(502).json({ error: "Failed to reach Raider.IO. Try again in a moment." });
  }
}
