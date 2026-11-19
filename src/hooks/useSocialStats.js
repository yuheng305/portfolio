import { useEffect, useState } from "react";

const ENDPOINT = "/api/social-stats";
const REFRESH_MS = 5 * 60 * 1000;

// Live channel stats from the serverless endpoint; refreshes while the tab is visible.
// Returns null until the first successful response (or when the API isn't available,
// e.g. under `npm start`, which doesn't serve /api).
export default function useSocialStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let controller;
    const load = async () => {
      if (document.visibilityState !== "visible") return;
      controller?.abort();
      controller = new AbortController();
      try {
        const res = await fetch(ENDPOINT, { signal: controller.signal });
        if (!res.ok) return;
        const data = await res.json();
        if (Object.keys(data.platforms || {}).length > 0) setStats(data);
      } catch (err) {
        if (err.name !== "AbortError") console.warn("social stats unavailable", err);
      }
    };

    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      clearInterval(id);
      controller?.abort();
    };
  }, []);

  return stats;
}
