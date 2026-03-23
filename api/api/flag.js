// api/flag.js — receives "flag this advice" reports and posts to Discord
// Requires env var: DISCORD_WEBHOOK_URL
// Optional: DISCORD_FLAG_ROLE_ID — if set, pings that role on each flag

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const { spec, cls, advice, reason, patch } = body || {};
  if (!spec || !advice) return res.status(400).json({ error: "Missing spec or advice" });

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    // Silently succeed if webhook not configured — don't break the UI
    console.warn("DISCORD_WEBHOOK_URL not set — flag dropped");
    return res.status(200).json({ ok: true });
  }

  const roleping = process.env.DISCORD_FLAG_ROLE_ID
    ? `<@&${process.env.DISCORD_FLAG_ROLE_ID}> `
    : "";

  const truncate = (s, n) => s?.length > n ? s.slice(0, n) + "…" : s;

  const embed = {
    title: `⚠️ Advice Flagged — ${spec} ${cls || ""}`.trim(),
    color: 0xe84545, // red
    fields: [
      { name: "Spec / Class",   value: `${spec} ${cls || "Unknown"}`.trim(), inline: true },
      { name: "Patch",          value: patch || "unknown",                    inline: true },
      { name: "Reason",         value: reason || "No reason given",           inline: false },
      { name: "Flagged Advice", value: `\`\`\`${truncate(advice, 900)}\`\`\``, inline: false },
    ],
    footer: { text: "Vaultwright — flag report" },
    timestamp: new Date().toISOString(),
  };

  try {
    const dr = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: roleping || undefined, embeds: [embed] }),
    });
    if (!dr.ok) {
      console.error("Discord webhook error:", dr.status);
      return res.status(502).json({ error: "Webhook delivery failed" });
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("flag.js error:", err.message);
    res.status(502).json({ error: "Failed to send flag" });
  }
}
