// api/wclogs.js — Warcraft Logs GraphQL proxy
// Requires env vars: WCL_CLIENT_ID, WCL_CLIENT_SECRET
// Without them: returns a helpful "coming soon" message so the UI doesn't break

const TOKEN_CACHE = { token: null, expiresAt: 0 };

async function getToken(clientId, clientSecret) {
  if (TOKEN_CACHE.token && Date.now() < TOKEN_CACHE.expiresAt - 60000) {
    return TOKEN_CACHE.token;
  }
  const res = await fetch("https://www.warcraftlogs.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  if (!res.ok) throw new Error(`WCL auth failed: ${res.status}`);
  const data = await res.json();
  TOKEN_CACHE.token = data.access_token;
  TOKEN_CACHE.expiresAt = Date.now() + (data.expires_in * 1000);
  return TOKEN_CACHE.token;
}

// Parse WCL URL → { reportId, fightId, sourceId }
function parseWclUrl(url) {
  const m = url.match(/warcraftlogs\.com\/reports\/([a-zA-Z0-9]+)/);
  if (!m) return null;
  const reportId = m[1];
  const fightM  = url.match(/fight=(\d+|last)/);
  const sourceM = url.match(/source=(\d+)/);
  return {
    reportId,
    fightId:  fightM  ? fightM[1]  : "last",
    sourceId: sourceM ? parseInt(sourceM[1]) : null,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const { url } = body || {};
  if (!url) return res.status(400).json({ error: "Missing url" });

  const parsed = parseWclUrl(url);
  if (!parsed) return res.status(400).json({ error: "Invalid Warcraft Logs URL. Should look like warcraftlogs.com/reports/abc123" });

  const clientId = process.env.WCL_CLIENT_ID;
  const clientSecret = process.env.WCL_CLIENT_SECRET;

  // No API key yet — return a useful placeholder so the UI works during setup
  if (!clientId || !clientSecret) {
    return res.status(200).json({
      placeholder: true,
      message: "Warcraft Logs integration coming soon — add WCL_CLIENT_ID and WCL_CLIENT_SECRET in Vercel env vars to enable.",
      reportId: parsed.reportId,
    });
  }

  try {
    const token = await getToken(clientId, clientSecret);

    // Query: get character info + their performance on the selected fight
    const query = `
      query GetReport($reportId: String!, $fightIds: [Int]) {
        reportData {
          report(code: $reportId) {
            title
            startTime
            fights(killType: Kills, id: $fightIds) {
              id
              name
              kill
              difficulty
              keystoneLevel
              averageItemLevel
            }
            playerDetails(fightIDs: $fightIds)
            rankings(playerMetric: dps, fightIDs: $fightIds)
          }
        }
      }
    `;

    const fightIds = parsed.fightId === "last" ? null : [parseInt(parsed.fightId)];

    const gqlRes = await fetch("https://www.warcraftlogs.com/api/v2/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { reportId: parsed.reportId, fightIds },
      }),
    });

    if (!gqlRes.ok) throw new Error(`WCL API error: ${gqlRes.status}`);
    const data = await gqlRes.json();

    if (data.errors?.length) {
      console.error("WCL GraphQL errors:", data.errors);
      return res.status(400).json({ error: data.errors[0].message });
    }

    const report = data.data?.reportData?.report;
    if (!report) return res.status(404).json({ error: "Report not found or private" });

    // Extract the relevant player from playerDetails if sourceId given
    let playerInfo = null;
    if (parsed.sourceId && report.playerDetails) {
      const details = typeof report.playerDetails === "string"
        ? JSON.parse(report.playerDetails)
        : report.playerDetails;
      const allPlayers = [
        ...(details?.data?.playerDetails?.dps || []),
        ...(details?.data?.playerDetails?.healers || []),
        ...(details?.data?.playerDetails?.tanks || []),
      ];
      playerInfo = allPlayers.find(p => p.id === parsed.sourceId) || allPlayers[0];
    }

    res.status(200).json({
      placeholder: false,
      report: {
        title:    report.title,
        fights:   report.fights || [],
        player:   playerInfo,
        rankings: report.rankings,
      },
      parsed,
    });

  } catch (err) {
    console.error("wclogs.js error:", err.message);
    res.status(502).json({ error: "Failed to fetch Warcraft Logs data. Check the URL and try again." });
  }
}
