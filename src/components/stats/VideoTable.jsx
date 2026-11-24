import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { platformByKey, exact, percent, shortDate } from "./platforms";

const COLUMNS = [
  { key: "views", label: "Views" },
  { key: "engagements", label: "Engagements" },
  { key: "rate", label: "Rate" },
  { key: "date", label: "Posted" },
];

// Facebook returns the whole description as the title; keep the first sentence.
const headline = (title) => {
  const first = title.split(/(?<=[.:?!])\s|\s[–-]\s/)[0].replace(/[:,;]$/, "");
  return first.length > 110 ? `${first.slice(0, 107)}…` : first;
};

export default function VideoTable({ videos, showPlatform }) {
  const [sort, setSort] = useState("views");
  const [expanded, setExpanded] = useState(false);
  const rows = [...videos]
    .map((v) => ({ ...v, rate: v.views ? v.engagements / v.views : 0 }))
    .sort((a, b) => (sort === "date" ? b.date.localeCompare(a.date) : b[sort] - a[sort]));
  const shown = expanded ? rows : rows.slice(0, 10);
  const maxViews = Math.max(...rows.map((r) => r.views), 1);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="py-2 pr-3 font-semibold">Video</th>
              {COLUMNS.map((c) => (
                <th key={c.key} className="px-2 py-2 text-right font-semibold" aria-sort={sort === c.key ? "descending" : "none"}>
                  <button type="button" onClick={() => setSort(c.key)} className={sort === c.key ? "text-ink" : "hover:text-ink"}>
                    {c.label}
                    {sort === c.key && " ↓"}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((v) => {
              const p = platformByKey[v.platform];
              return (
                <tr key={`${v.platform}-${v.id}`} className="border-b border-line/60">
                  <td className="py-2 pr-3">
                    <a href={v.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-body hover:text-accent">
                      {showPlatform && <FontAwesomeIcon icon={p.icon} className="mt-1 shrink-0" style={{ color: p.color }} aria-label={p.label} />}
                      <span className="line-clamp-2">{headline(v.title) || "(untitled)"}</span>
                    </a>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <span className="font-semibold tabular-nums text-ink">{exact(v.views)}</span>
                    <span className="mt-1 block h-1 rounded-full bg-subtle">
                      <span className={`block h-1 rounded-full ${p.bg}`} style={{ width: `${(v.views / maxViews) * 100}%` }} />
                    </span>
                  </td>
                  <td className="px-2 py-2 text-right tabular-nums text-body">{exact(v.engagements)}</td>
                  <td className="px-2 py-2 text-right tabular-nums text-body">{percent(v.rate)}</td>
                  <td className="whitespace-nowrap px-2 py-2 text-right text-muted">{shortDate(v.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length > 10 && (
        <button type="button" onClick={() => setExpanded(!expanded)} className="text-sm font-semibold text-accent hover:underline">
          {expanded ? "Show top 10" : `Show all ${rows.length} videos`}
        </button>
      )}
    </div>
  );
}
