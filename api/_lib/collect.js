// Loads every configured platform in parallel and keeps one snapshot per day in Redis,
// so the dashboard can chart growth over time (the platform APIs only give current totals).
import { getYouTubeStats, youtubeConfigured } from "./youtube.js";
import { getTikTokStats, tiktokConfigured } from "./tiktok.js";
import { getFacebookStats, facebookConfigured } from "./facebook.js";
import { redis, redisConfigured } from "./redis.js";

const PLATFORMS = [
  { name: "tiktok", configured: tiktokConfigured, load: getTikTokStats },
  { name: "youtube", configured: youtubeConfigured, load: getYouTubeStats },
  { name: "facebook", configured: facebookConfigured, load: getFacebookStats },
];

const METRICS = ["followers", "views", "engagements", "videos"];
const HISTORY_KEY = "social:daily";

// Days are counted in Vietnam time, where the channels post.
const vnDate = (d = new Date()) => new Date(d.getTime() + 7 * 3600_000).toISOString().slice(0, 10);

export async function collectStats() {
  const active = PLATFORMS.filter((p) => p.configured);
  const results = await Promise.allSettled(active.map((p) => p.load()));

  const platforms = {};
  results.forEach((result, i) => {
    const { name } = active[i];
    if (result.status === "fulfilled") {
      platforms[name] = result.value;
    } else {
      // Details stay in the server log; the client only learns the platform is unavailable.
      console.error(`[social-stats] ${name}:`, result.reason?.message || result.reason);
    }
  });

  const values = Object.values(platforms);
  const totals = Object.fromEntries(METRICS.map((m) => [m, values.reduce((t, p) => t + (p[m] || 0), 0)]));
  return { updatedAt: new Date().toISOString(), platforms, totals };
}

// Overwrites today's entry with the latest totals; a day keeps its last reading.
// Partial results (a platform failed) only update the platforms that loaded.
export async function saveSnapshot({ platforms }) {
  if (!redisConfigured || Object.keys(platforms).length === 0) return;
  const day = vnDate();
  const previous = JSON.parse((await redis("HGET", HISTORY_KEY, day)) || "{}");
  const today = { ...previous };
  for (const [name, p] of Object.entries(platforms)) {
    today[name] = Object.fromEntries(METRICS.map((m) => [m, p[m] || 0]));
  }
  await redis("HSET", HISTORY_KEY, day, JSON.stringify(today));
}

// [{ date: "2026-11-24", tiktok: {...}, youtube: {...}, facebook: {...} }, ...] oldest first.
export async function loadHistory() {
  if (!redisConfigured) return [];
  const flat = (await redis("HGETALL", HISTORY_KEY)) || [];
  const days = [];
  for (let i = 0; i < flat.length; i += 2) days.push({ date: flat[i], ...JSON.parse(flat[i + 1]) });
  return days.sort((a, b) => a.date.localeCompare(b.date));
}
