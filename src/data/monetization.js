// Monetization thresholds as each platform shows them for this account, read from
// YouTube Studio → Earn, TikTok Studio → Monetization and Meta Business Suite → Monetization.
// `live` conditions are computed from /api/social-stats; the others are values the platforms
// only show in their dashboards (no public API), so they carry the date they were read.
// Update CHECKED_ON and the `value`s when re-reading the dashboards.

export const CHECKED_ON = "2026-11-24";

// `platformSaysMet: false` marks a program the platform still reports as not met even though the
// counts we can see are past the threshold (e.g. a "30 days in a row" rule we cannot check).
// A condition is { label, target, live?: (stats) => number, value?, asOf?, note? }.
// A group with `anyOf` is met when any one of its conditions is met.
export const PROGRAMS = [
  {
    platform: "youtube",
    name: "Fan funding & Shopping",
    detail: "Memberships, Supers, Shopping",
    requires: [
      { label: "Subscribers", target: 500, live: (s) => s.youtube?.followers },
      { label: "Uploads in the last 90 days", target: 3, live: (s) => s.youtube?.uploads90d },
      {
        anyOf: [
          { label: "Qualified Shorts views, last 90 days", target: 3_000_000, value: 11_000, asOf: "2026-11-18" },
          { label: "Qualified watch hours, last 365 days", target: 3_000, value: 3, asOf: "2026-11-18" },
        ],
      },
    ],
  },
  {
    platform: "youtube",
    name: "Ad revenue",
    detail: "Watch Page ads, Shorts Feed ads, YouTube Premium",
    requires: [
      { label: "Subscribers", target: 1_000, live: (s) => s.youtube?.followers },
      {
        anyOf: [
          { label: "Qualified Shorts views, last 90 days", target: 10_000_000, value: 11_000, asOf: "2026-11-18" },
          { label: "Qualified watch hours, last 365 days", target: 4_000, value: 3, asOf: "2026-11-18" },
        ],
      },
    ],
  },
  {
    platform: "facebook",
    name: "Stars",
    detail: "Meta pays US$0.01 per Star",
    requires: [{ label: "Followers (held for 30 days in a row)", target: 500, live: (s) => s.facebook?.followers }],
    platformSaysMet: false,
    status: "Meta still lists this as not met: the follower count must stay above 500 for 30 days in a row.",
  },
  {
    platform: "facebook",
    name: "Subscriptions",
    detail: "Monthly paid subscriptions",
    requires: [{ label: "Followers", target: 5_000, live: (s) => s.facebook?.followers }],
  },
  {
    platform: "facebook",
    name: "Content monetization",
    detail: "Ads on Reels, videos and posts",
    requires: [],
    status: "Meta shows “Policy issue” for this program and publishes no follower threshold.",
  },
  {
    platform: "tiktok",
    name: "Creator Rewards",
    detail: "Pay per view for videos over 1 minute",
    requires: [],
    status: "Not offered to this account: TikTok Studio does not list the program.",
  },
  {
    platform: "tiktok",
    name: "Video Gifts, Subscription, Creator Marketplace",
    detail: "Viewer gifts, paid subscribers, brand deals",
    requires: [],
    status: "TikTok Studio shows “Ineligible” for all three and does not show the thresholds.",
  },
];

const ratio = (value, target) => (Number.isFinite(value) ? Math.min(value / target, 1) : null);

// Resolves every condition to { ...condition, current, progress } and the program to an overall
// progress: AND-conditions take the weakest, an anyOf group takes its strongest option.
export function evaluate(program, platforms) {
  const resolve = (c) => {
    const current = c.live ? c.live(platforms) : c.value;
    return { ...c, current, progress: ratio(current, c.target) };
  };
  const requires = program.requires.map((r) => {
    if (!r.anyOf) return resolve(r);
    const options = r.anyOf.map(resolve);
    return { anyOf: options, progress: Math.max(...options.map((o) => o.progress ?? 0)) };
  });
  const known = requires.map((r) => r.progress).filter((p) => p !== null);
  const progress = known.length ? Math.min(...known) : null;
  return { ...program, requires, progress };
}
