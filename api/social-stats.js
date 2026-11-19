// GET /api/social-stats — live followers / views / engagements for the
// "Giải Mã Toán Olympic" channels. All credentials come from environment variables.
// Responses are cached at Vercel's edge for CACHE_SECONDS, so the platforms are
// queried at most once per window no matter how many visitors load the page.
import { getYouTubeStats, youtubeConfigured } from "./_lib/youtube.js";
import { getTikTokStats, tiktokConfigured } from "./_lib/tiktok.js";
import { getFacebookStats, facebookConfigured } from "./_lib/facebook.js";

const CACHE_SECONDS = 120;

const PLATFORMS = [
  { name: "tiktok", configured: tiktokConfigured, load: getTikTokStats },
  { name: "youtube", configured: youtubeConfigured, load: getYouTubeStats },
  { name: "facebook", configured: facebookConfigured, load: getFacebookStats },
];

const METRICS = ["followers", "views", "engagements"];

export default async function handler(req, res) {
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

  res.setHeader("Cache-Control", `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`);
  res.status(200).json({ updatedAt: new Date().toISOString(), platforms, totals });
}
