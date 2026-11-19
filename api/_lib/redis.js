// Minimal Upstash Redis REST client (the store Vercel's Redis integration provisions).
// Used only for state that must survive between invocations, e.g. TikTok's rotating refresh token.

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;

export const redisConfigured = Boolean(url && token);

export async function redis(...command) {
  if (!redisConfigured) throw new Error("Redis is not configured (KV_REST_API_URL / KV_REST_API_TOKEN)");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const body = await res.json();
  if (!res.ok || body.error) throw new Error(`Redis ${command[0]} failed: ${body.error || res.status}`);
  return body.result;
}

export async function getJSON(key) {
  const raw = await redis("GET", key);
  return raw ? JSON.parse(raw) : null;
}

export function setJSON(key, value, ...options) {
  return redis("SET", key, JSON.stringify(value), ...options);
}
