// GET /api/social-stats — live followers / views / engagements for the
// "Giải Mã Toán Olympic" channels, plus per-video items and the daily history.
// All credentials come from environment variables. Responses are cached at Vercel's edge
// for CACHE_SECONDS, so the platforms are queried at most once per window.
import { collectStats, saveSnapshot, loadHistory } from "./_lib/collect.js";

const CACHE_SECONDS = 120;

export default async function handler(req, res) {
  const stats = await collectStats();

  let history = [];
  try {
    await saveSnapshot(stats);
    history = await loadHistory();
  } catch (err) {
    console.error("[social-stats] history:", err.message);
  }

  res.setHeader("Cache-Control", `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`);
  res.status(200).json({ ...stats, history });
}
