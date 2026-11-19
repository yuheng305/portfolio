// GET /api/tiktok/login?key=<ADMIN_SECRET> — one-time TikTok authorization.
// Starts OAuth; /api/tiktok/callback stores the tokens in Redis (never shown in the browser).
import { randomUUID, timingSafeEqual } from "node:crypto";
import { setJSON } from "../_lib/redis.js";
import { SCOPES, tiktokConfigured } from "../_lib/tiktok.js";

const { ADMIN_SECRET: adminSecret, TIKTOK_CLIENT_KEY: clientKey, TIKTOK_REDIRECT_URI: redirectUri } = process.env;

function isAdmin(key) {
  if (!adminSecret || typeof key !== "string") return false;
  const a = Buffer.from(key);
  const b = Buffer.from(adminSecret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (!isAdmin(req.query.key)) return res.status(404).end();
  if (!tiktokConfigured || !redirectUri) return res.status(500).send("TikTok env vars are missing.");

  const state = randomUUID();
  await setJSON(`tiktok:oauth-state:${state}`, true, "EX", "600");

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: SCOPES,
    response_type: "code",
    redirect_uri: redirectUri,
    state,
  });
  res.redirect(302, `https://www.tiktok.com/v2/auth/authorize/?${params}`);
}
