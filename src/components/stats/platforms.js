import { faTiktok, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";

// Fixed order and colour per platform: a filter never repaints a platform.
export const PLATFORMS = [
  { key: "tiktok", label: "TikTok", icon: faTiktok, color: "rgb(var(--c-tiktok))", bg: "bg-tiktok" },
  { key: "youtube", label: "YouTube", icon: faYoutube, color: "rgb(var(--c-youtube))", bg: "bg-youtube" },
  { key: "facebook", label: "Facebook", icon: faFacebook, color: "rgb(var(--c-facebook))", bg: "bg-facebook" },
];
export const platformByKey = Object.fromEntries(PLATFORMS.map((p) => [p.key, p]));

export const METRICS = [
  { key: "views", label: "Views" },
  { key: "followers", label: "Followers" },
  { key: "engagements", label: "Engagements" },
];

const compactFmt = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const exactFmt = new Intl.NumberFormat("en");
const pctFmt = new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 });
export const compact = (n) => compactFmt.format(n);
export const exact = (n) => exactFmt.format(n);
export const percent = (r) => pctFmt.format(r);
export const shortDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "Asia/Ho_Chi_Minh" });
