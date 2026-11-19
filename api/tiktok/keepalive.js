// GET /api/tiktok/keepalive — called daily by Vercel Cron (see vercel.json).
// Refreshing the access token also rotates the refresh token, so TikTok access never
// lapses even if nobody opens the site for months. Vercel sends CRON_SECRET as a bearer token.
import { getAccessToken, tiktokConfigured } from "../_lib/tiktok.js";

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).end();
  if (!tiktokConfigured) return res.status(200).json({ skipped: "TikTok not configured" });

  try {
    await getAccessToken();
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[tiktok/keepalive]", err.message);
    res.status(500).json({ ok: false });
  }
}
