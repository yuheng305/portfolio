import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Stats from "./Stats";
import useSocialStats from "../../hooks/useSocialStats";

const PLATFORMS = [
  { key: "tiktok", label: "TikTok", icon: faTiktok },
  { key: "youtube", label: "YouTube", icon: faYoutube },
  { key: "facebook", label: "Facebook", icon: faFacebook },
];

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });

// Renders nothing until live numbers arrive, so the card never shows stale or fake figures.
export default function SocialStats() {
  const stats = useSocialStats();
  if (!stats) return null;

  const { totals, platforms, updatedAt } = stats;
  const available = PLATFORMS.filter((p) => platforms[p.key]);

  return (
    <div className="space-y-3">
      <Stats
        items={[
          { value: compact.format(totals.views), label: "Total views" },
          { value: compact.format(totals.followers), label: "Followers" },
          { value: compact.format(totals.engagements), label: "Likes, comments & shares" },
        ]}
      />
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-body">
        {available.map(({ key, label, icon }) => (
          <li key={key} className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={icon} aria-label={label} />
            {compact.format(platforms[key].followers)} followers · {compact.format(platforms[key].views)} views
          </li>
        ))}
      </ul>
      <p className="text-xs text-faint">Live · updated {time.format(new Date(updatedAt))}</p>
    </div>
  );
}
