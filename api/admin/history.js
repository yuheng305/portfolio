// POST /api/admin/history — one-off backfill of daily history from the platforms' own analytics
// (TikTok Studio, YouTube Studio, Meta Business Suite), which the public APIs don't expose.
// Body: { days: { "YYYY-MM-DD": { tiktok: { views, followers, engagements }, ... } } }.
// Guarded by ADMIN_SECRET as a bearer token. Never overwrites a platform that already has a
// live snapshot for that day; backfilled entries are tagged source: "analytics".
import { redis, redisConfigured } from "../_lib/redis.js";

const HISTORY_KEY = "social:daily";
const PLATFORMS = ["tiktok", "youtube", "facebook"];
const METRICS = ["views", "followers", "engagements"];

export default async function handler(req, res) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).end();
  if (req.method !== "POST") return res.status(405).end();
  if (!redisConfigured) return res.status(500).json({ error: "Redis not configured" });

  const days = req.body?.days;
  if (!days || typeof days !== "object") return res.status(400).json({ error: "days missing" });

  const written = [];
  for (const [date, entry] of Object.entries(days)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: `bad date ${date}` });
    const current = JSON.parse((await redis("HGET", HISTORY_KEY, date)) || "{}");
    let changed = false;
    for (const name of PLATFORMS) {
      if (!entry[name] || (current[name] && current[name].source !== "analytics")) continue;
      const values = Object.fromEntries(
        METRICS.filter((m) => Number.isFinite(entry[name][m])).map((m) => [m, entry[name][m]])
      );
      current[name] = { ...values, source: "analytics" };
      changed = true;
    }
    if (changed) {
      await redis("HSET", HISTORY_KEY, date, JSON.stringify(current));
      written.push(date);
    }
  }
  res.status(200).json({ written });
}
