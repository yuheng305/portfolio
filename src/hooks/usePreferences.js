import { useSyncExternalStore } from "react";

// Per-viewer UI preferences stored on <html> (class "dark", data-sidebar="collapsed").
// The boot script in public/index.html applies saved values before first paint; these hooks
// treat <html> as the single source of truth, so every component using them stays in sync.
const root = document.documentElement;

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["class", "data-sidebar"] });
  return () => observer.disconnect();
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the choice just won't persist.
  }
}

const getTheme = () => (root.classList.contains("dark") ? "dark" : "light");
const getCollapsed = () => root.dataset.sidebar === "collapsed";

function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  root.classList.toggle("dark", next === "dark");
  save("theme", next);
}

function toggleCollapsed() {
  const next = !getCollapsed();
  if (next) root.dataset.sidebar = "collapsed";
  else delete root.dataset.sidebar;
  save("sidebar", next ? "collapsed" : "expanded");
}

export function useTheme() {
  return { theme: useSyncExternalStore(subscribe, getTheme), toggleTheme };
}

export function useSidebarCollapsed() {
  return { collapsed: useSyncExternalStore(subscribe, getCollapsed), toggleCollapsed };
}
