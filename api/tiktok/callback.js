// GET /api/tiktok/callback — TikTok redirects here after /api/tiktok/login.
// Accepts only a `state` issued by /login, then stores the tokens server-side.
import { redis } from "../_lib/redis.js";
import { exchangeCode } from "../_lib/tiktok.js";

export default async function handler(req, res) {
  const { code, state, error } = req.query;
  if (error) return res.status(400).send(`TikTok authorization was cancelled: ${error}`);
  if (!code || !state) return res.status(400).send("Missing code or state.");

  const issued = await redis("GETDEL", `tiktok:oauth-state:${state}`);
  if (!issued) return res.status(400).send("Unknown or expired state. Start again from /api/tiktok/login.");

  try {
    await exchangeCode(code, process.env.TIKTOK_REDIRECT_URI);
  } catch (err) {
    console.error("[tiktok/callback]", err.message);
    return res.status(502).send("Could not exchange the TikTok code. Check the server log.");
  }
  res.status(200).send("TikTok connected. You can close this tab.");
}
