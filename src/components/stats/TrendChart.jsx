import { useEffect, useMemo, useRef, useState } from "react";
import { platformByKey, compact, exact, shortDate } from "./platforms";

const HEIGHT = 240;
const M = { top: 12, right: 76, bottom: 28, left: 44 };

function useWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

// "Nice" ticks covering [lo, hi] (lo <= 0 <= hi): 1, 2, 2.5 or 5 × 10^k steps.
function niceTicks(lo, hi, count = 4) {
  const span = hi - lo || 1;
  const raw = span / count;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= raw);
  const ticks = [];
  for (let v = Math.floor(lo / step) * step; v <= hi + step * 0.999; v += step) ticks.push(v);
  return ticks;
}

// One line per platform over the daily snapshots. `mode` "total" plots the running total,
// "daily" plots the change since the previous snapshot.
export default function TrendChart({ history, keys, metric, mode }) {
  const boxRef = useRef(null);
  const width = useWidth(boxRef);
  const [hover, setHover] = useState(null);

  const series = useMemo(() => {
    return keys
      .map((key) => {
        const points = [];
        history.forEach((day, i) => {
          const v = day[key]?.[metric];
          if (v === undefined) return;
          const backfill = day[key].source === "analytics";
          if (mode === "daily") {
            // A daily change needs the previous calendar day from the same source:
            // analytics and the live counters count slightly differently.
            const prev = history[i - 1];
            const p = prev?.[key];
            const consecutive = prev && Date.parse(day.date) - Date.parse(prev.date) === 86_400_000;
            if (!consecutive || p?.[metric] === undefined || (p.source === "analytics") !== backfill) return;
            points.push({ date: day.date, value: v - p[metric], backfill });
          } else points.push({ date: day.date, value: v, backfill });
        });
        return { key, points };
      })
      .filter((s) => s.points.length > 0);
  }, [history, keys, metric, mode]);

  const dates = useMemo(() => [...new Set(series.flatMap((s) => s.points.map((p) => p.date)))].sort(), [series]);

  if (dates.length < 2) {
    return (
      <div ref={boxRef} className="flex h-40 items-center justify-center rounded-lg bg-subtle px-6 text-center text-sm text-muted">
        {history.length === 0
          ? "No daily history yet."
          : `Daily history started on ${shortDate(history[0].date)}. The chart adds one point per day, so the trend shows from the ${
              mode === "daily" ? "third" : "second"
            } day.`}
      </div>
    );
  }

  const innerW = Math.max(width - M.left - M.right, 10);
  const innerH = HEIGHT - M.top - M.bottom;
  const values = series.flatMap((s) => s.points.map((p) => p.value));
  const ticks = niceTicks(Math.min(0, ...values), Math.max(0, ...values));
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];
  // Time scale, so a missing day leaves a real gap instead of squeezing the axis.
  const t0 = Date.parse(dates[0]);
  const span = Date.parse(dates[dates.length - 1]) - t0;
  const x = (date) => M.left + ((Date.parse(date) - t0) / span) * innerW;
  const y = (v) => M.top + innerH - ((v - yMin) / (yMax - yMin || 1)) * innerH;

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left + M.left; // the overlay starts at M.left
    const nearest = dates.reduce((best, d) => (Math.abs(x(d) - px) < Math.abs(x(best) - px) ? d : best), dates[0]);
    setHover(nearest);
  };

  // Direct labels at the line ends, nudged apart so they never overlap.
  const ends = series
    .map((s) => ({ key: s.key, y: y(s.points[s.points.length - 1].value) }))
    .sort((a, b) => a.y - b.y);
  ends.forEach((e, i) => {
    if (i > 0 && e.y - ends[i - 1].y < 14) e.y = ends[i - 1].y + 14;
  });

  const xLabelEvery = Math.ceil(dates.length / Math.max(Math.floor(innerW / 70), 1));

  // Hover stores only the date; its position follows the current scale (metric/mode changes).
  const hoverDate = hover && dates.includes(hover) ? hover : null;
  const hoverX = hoverDate && x(hoverDate);

  const hasBackfill = series.some((s) => s.points.some((p) => p.backfill));

  return (
    <div ref={boxRef} className="relative">
      <svg width={width} height={HEIGHT} role="img" aria-label="Daily trend by platform" className="block">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={M.left} x2={M.left + innerW} y1={y(t)} y2={y(t)} className="stroke-line" strokeWidth="1" />
            <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-faint text-[11px]">
              {compact(t)}
            </text>
          </g>
        ))}
        {dates.map((d, i) =>
          (i % xLabelEvery === 0 && dates.length - 1 - i > xLabelEvery / 2) || i === dates.length - 1 ? (
            <text key={d} x={x(d)} y={HEIGHT - 8} textAnchor="middle" className="fill-faint text-[11px]">
              {shortDate(d)}
            </text>
          ) : null
        )}
        {series.map((s) => {
          const toPoints = (pts) => pts.map((p) => `${x(p.date)},${y(p.value)}`).join(" ");
          const live = s.points.filter((p) => !p.backfill);
          return (
            <g key={s.key} stroke={platformByKey[s.key].color} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
              {/* Backfilled days (and the join to the first live day) are dashed. */}
              {s.points.some((p) => p.backfill) && <polyline strokeDasharray="4 4" points={toPoints(s.points)} />}
              {live.length > 1 && <polyline points={toPoints(live)} />}
            </g>
          );
        })}
        {ends.map((e) => (
          <text key={e.key} x={M.left + innerW + 8} y={e.y} dy="0.32em" className="fill-body text-[11px] font-semibold">
            {platformByKey[e.key].label}
          </text>
        ))}
        {hoverDate && (
          <g>
            <line x1={hoverX} x2={hoverX} y1={M.top} y2={M.top + innerH} className="stroke-faint" strokeWidth="1" />
            {series.map((s) => {
              const p = s.points.find((pt) => pt.date === hoverDate);
              return p ? (
                <circle key={s.key} cx={hoverX} cy={y(p.value)} r="4" fill={platformByKey[s.key].color} className="stroke-card" strokeWidth="2" />
              ) : null;
            })}
          </g>
        )}
        <rect
          x={M.left}
          y={M.top}
          width={innerW}
          height={innerH}
          fill="transparent"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>
      {hasBackfill && (
        <p className="mt-2 text-xs text-faint">
          Dashed: daily figures from each platform's own analytics (TikTok Studio, YouTube Studio, Meta Business Suite),
          added before live tracking began on 24 Nov. Solid: the live counters. The two can differ slightly; YouTube
          Analytics, for example, counts more views than the public view counter.
        </p>
      )}
      {hoverDate && (
        <div
          className="pointer-events-none absolute top-2 z-10 min-w-[9rem] rounded-lg border border-line bg-card px-3 py-2 text-xs shadow-lg"
          style={hoverX > width / 2 ? { right: width - hoverX + 12 } : { left: hoverX + 12 }}
        >
          <p className="mb-1 text-muted">{shortDate(hoverDate)}</p>
          {series.map((s) => {
            const p = s.points.find((pt) => pt.date === hoverDate);
            return p ? (
              <p key={s.key} className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-3" style={{ background: platformByKey[s.key].color }} />
                <span className="font-semibold text-ink">{(mode === "daily" && p.value > 0 ? "+" : "") + exact(p.value)}</span>
                <span className="text-muted">
                  {platformByKey[s.key].label}
                  {p.backfill && " · analytics"}
                </span>
              </p>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
