// TikTok Display API v2 (official, OAuth). Access tokens live ~2h and every refresh
// returns a NEW refresh token that replaces the old one, so tokens are kept in Redis.
import { fetchJSON, collectPages, sum } from "./http.js";
import { getJSON, setJSON, redis, redisConfigured } from "./redis.js";

const OPEN_API = "https://open.tiktokapis.com/v2";
const TOKEN_KEY = "tiktok:token";
const LOCK_KEY = "tiktok:refresh-lock";
export const SCOPES = "user.info.basic,user.info.stats,video.list";

const { TIKTOK_CLIENT_KEY: clientKey, TIKTOK_CLIENT_SECRET: clientSecret } = process.env;

export const tiktokConfigured = Boolean(clientKey && clientSecret && redisConfigured);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestToken(params) {
  const body = await fetchJSON(`${OPEN_API}/oauth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key: clientKey, client_secret: clientSecret, ...params }),
  });
  if (!body.access_token) throw new Error(`TikTok token request failed: ${body.error || "no access_token"}`);
  return body;
}

export async function saveToken(body) {
  await setJSON(TOKEN_KEY, {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    expiresAt: Date.now() + body.expires_in * 1000,
  });
}

export async function exchangeCode(code, redirectUri) {
  await saveToken(await requestToken({ grant_type: "authorization_code", code, redirect_uri: redirectUri }));
}

const isFresh = (token) => token && token.expiresAt - Date.now() > 60_000;

export async function getAccessToken() {
  let token = await getJSON(TOKEN_KEY);
  if (!token) throw new Error("TikTok is not connected yet — run /api/tiktok/login once");
  if (isFresh(token)) return token.accessToken;

  // Only one invocation may spend the refresh token; the others wait for its result.
  const locked = await redis("SET", LOCK_KEY, "1", "NX", "EX", "20");
  if (!locked) {
    for (let i = 0; i < 10 && !isFresh(token); i += 1) {
      await sleep(500);
      token = await getJSON(TOKEN_KEY);
    }
    if (isFresh(token)) return token.accessToken;
    throw new Error("Timed out waiting for TikTok token refresh");
  }
  try {
    const body = await requestToken({ grant_type: "refresh_token", refresh_token: token.refreshToken });
    await saveToken(body);
    return body.access_token;
  } finally {
    await redis("DEL", LOCK_KEY);
  }
}

export async function getTikTokStats() {
  const accessToken = await getAccessToken();
  const auth = { Authorization: `Bearer ${accessToken}` };

  const { data: userData } = await fetchJSON(
    `${OPEN_API}/user/info/?fields=follower_count,likes_count,video_count`,
    { headers: auth }
  );

  const videos = await collectPages(async (cursor) => {
    const { data } = await fetchJSON(`${OPEN_API}/video/list/?fields=id,view_count,like_count,comment_count,share_count`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ max_count: 20, ...(cursor && { cursor }) }),
    });
    return { items: data.videos || [], next: data.has_more ? data.cursor : null };
  });

  const { user } = userData;
  return {
    followers: user.follower_count,
    views: sum(videos, (v) => v.view_count),
    engagements: sum(videos, (v) => v.like_count) + sum(videos, (v) => v.comment_count) + sum(videos, (v) => v.share_count),
    videos: user.video_count,
  };
}
