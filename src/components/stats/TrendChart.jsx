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
          if (mode === "daily") {
            const prev = history[i - 1]?.[key]?.[metric];
            if (prev === undefined) return;
            points.push({ date: day.date, value: v - prev });
          } else points.push({ date: day.date, value: v });
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
  const x = (date) => M.left + (dates.indexOf(date) / (dates.length - 1)) * innerW;
  const y = (v) => M.top + innerH - ((v - yMin) / (yMax - yMin || 1)) * innerH;

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left - M.left) / innerW;
    const idx = Math.round(Math.min(Math.max(rel, 0), 1) * (dates.length - 1));
    setHover({ date: dates[idx], left: x(dates[idx]) });
  };

  // Direct labels at the line ends, nudged apart so they never overlap.
  const ends = series
    .map((s) => ({ key: s.key, y: y(s.points[s.points.length - 1].value) }))
    .sort((a, b) => a.y - b.y);
  ends.forEach((e, i) => {
    if (i > 0 && e.y - ends[i - 1].y < 14) e.y = ends[i - 1].y + 14;
  });

  const xLabelEvery = Math.ceil(dates.length / Math.max(Math.floor(innerW / 70), 1));

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
        {series.map((s) => (
          <polyline
            key={s.key}
            fill="none"
            stroke={platformByKey[s.key].color}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={s.points.map((p) => `${x(p.date)},${y(p.value)}`).join(" ")}
          />
        ))}
        {ends.map((e) => (
          <text key={e.key} x={M.left + innerW + 8} y={e.y} dy="0.32em" className="fill-body text-[11px] font-semibold">
            {platformByKey[e.key].label}
          </text>
        ))}
        {hover && (
          <g>
            <line x1={hover.left} x2={hover.left} y1={M.top} y2={M.top + innerH} className="stroke-faint" strokeWidth="1" />
            {series.map((s) => {
              const p = s.points.find((pt) => pt.date === hover.date);
              return p ? (
                <circle key={s.key} cx={hover.left} cy={y(p.value)} r="4" fill={platformByKey[s.key].color} className="stroke-card" strokeWidth="2" />
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
      {hover && (
        <div
          className="pointer-events-none absolute top-2 z-10 min-w-[9rem] rounded-lg border border-line bg-card px-3 py-2 text-xs shadow-lg"
          style={hover.left > width / 2 ? { right: width - hover.left + 12 } : { left: hover.left + 12 }}
        >
          <p className="mb-1 text-muted">{shortDate(hover.date)}</p>
          {series.map((s) => {
            const p = s.points.find((pt) => pt.date === hover.date);
            return p ? (
              <p key={s.key} className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-3" style={{ background: platformByKey[s.key].color }} />
                <span className="font-semibold text-ink">{(mode === "daily" && p.value > 0 ? "+" : "") + exact(p.value)}</span>
                <span className="text-muted">{platformByKey[s.key].label}</span>
              </p>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
