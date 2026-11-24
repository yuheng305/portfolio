import { PLATFORMS, compact, percent } from "./platforms";

// One whole split by platform: a single segmented bar, legend with values below.
export default function ShareBar({ label, platforms, metric }) {
  const parts = PLATFORMS.filter((p) => platforms[p.key]).map((p) => ({ ...p, value: platforms[p.key][metric] || 0 }));
  const total = parts.reduce((t, p) => t + p.value, 0);
  if (!total) return null;
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="flex h-3 gap-0.5 overflow-hidden rounded-full">
        {parts.map((p) => (
          <div
            key={p.key}
            className={p.bg}
            style={{ width: `${(p.value / total) * 100}%` }}
            title={`${p.label}: ${compact(p.value)} (${percent(p.value / total)})`}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {parts.map((p) => (
          <li key={p.key} className="flex items-center gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-sm ${p.bg}`} />
            {p.label} <span className="font-semibold text-body">{percent(p.value / total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
