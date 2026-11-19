import { useEffect, useState } from "react";

// Index state for a looping slideshow with optional auto-advance.
// The timer restarts after every change (manual or automatic) and stops while `paused`.
export default function useCarousel(count, { autoPlay = false, interval = 4000, paused = false } = {}) {
  const [rawIndex, setIndex] = useState(0);
  // Clamp so a shrinking `count` can never point past the last slide.
  const index = count > 0 ? rawIndex % count : 0;

  useEffect(() => {
    if (!autoPlay || paused || count < 2) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearTimeout(id);
  }, [autoPlay, paused, count, interval, index]);

  return {
    index,
    goTo: setIndex,
    next: () => setIndex((index + 1) % count),
    prev: () => setIndex((index - 1 + count) % count),
  };
}
