// GET /api/tiktok/keepalive — called daily by Vercel Cron (see vercel.json).
// Refreshing the access token also rotates the refresh token, so TikTok access never
// lapses even if nobody opens the site for months. The same run saves the day's stats
// snapshot, so the dashboard history has no gaps on days without visitors.
// Vercel sends CRON_SECRET as a bearer token.
import { getAccessToken, tiktokConfigured } from "../_lib/tiktok.js";
import { collectStats, saveSnapshot } from "../_lib/collect.js";

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).end();

  const result = {};
  try {
    if (tiktokConfigured) await getAccessToken();
    result.tiktok = tiktokConfigured ? "ok" : "skipped";
  } catch (err) {
    console.error("[tiktok/keepalive]", err.message);
    result.tiktok = "failed";
  }
  try {
    await saveSnapshot(await collectStats());
    result.snapshot = "ok";
  } catch (err) {
    console.error("[keepalive] snapshot:", err.message);
    result.snapshot = "failed";
  }
  res.status(result.tiktok === "failed" ? 500 : 200).json(result);
}
