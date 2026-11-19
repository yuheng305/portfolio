import { useEffect, useState } from "react";

// True while the element is on screen and the browser tab is visible.
// Returns [ref, visible]; attach `ref` as a callback ref so the observer follows
// the element even if it mounts later. With `enabled = false` nothing is observed.
export default function usePageVisibleInView(enabled = true) {
  const [element, ref] = useState(null);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState === "visible");

  useEffect(() => {
    if (!enabled || !element) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, enabled]);

  useEffect(() => {
    if (!enabled) return undefined;
    const onChange = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [enabled]);

  return [ref, enabled && inView && tabVisible];
}
