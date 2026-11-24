import { useMemo, useState } from "react";
import Section from "../components/ui/Section";
import useSocialStats from "../hooks/useSocialStats";
import PlatformFilter from "../components/stats/PlatformFilter";
import Segmented from "../components/stats/Segmented";
import TrendChart from "../components/stats/TrendChart";
import ShareBar from "../components/stats/ShareBar";
import VideoTable from "../components/stats/VideoTable";
import Monetization from "../components/stats/Monetization";
import { PLATFORMS, METRICS, compact, exact, percent } from "../components/stats/platforms";

const RANGES = [
  { key: "7", label: "7d" },
  { key: "30", label: "30d" },
  { key: "90", label: "90d" },
  { key: "all", label: "All" },
];
const MODES = [
  { key: "total", label: "Total" },
  { key: "daily", label: "Per day" },
];
const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });

function Card({ title, actions, children }) {
  return (
    <div className="space-y-4 rounded-xl border border-line bg-card p-4 sm:p-5">
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold text-ink">{title}</h3>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

function Tile({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <p className="text-xl font-bold tabular-nums text-ink sm:text-2xl">{value}</p>
      <p className="text-sm text-muted">{label}</p>
      {hint && <p className="mt-1 text-xs text-faint">{hint}</p>}
    </div>
  );
}

export default function ChannelStats() {
  const stats = useSocialStats();
  const [filter, setFilter] = useState("all");
  const [metric, setMetric] = useState("views");
  const [mode, setMode] = useState("total");
  const [range, setRange] = useState("30");

  const available = useMemo(() => PLATFORMS.filter((p) => stats?.platforms[p.key]).map((p) => p.key), [stats]);
  const keys = filter === "all" ? available : [filter];

  const history = useMemo(() => {
    const all = stats?.history || [];
    return range === "all" ? all : all.slice(-Number(range) - (mode === "daily" ? 1 : 0));
  }, [stats, range, mode]);

  if (!stats) {
    return (
      <Section title="Channel stats">
        <p className="text-muted">Loading live numbers…</p>
      </Section>
    );
  }

  const selected = keys.map((k) => stats.platforms[k]);
  const sum = (m) => selected.reduce((t, p) => t + (p[m] || 0), 0);
  const views = sum("views");
  const engagements = sum("engagements");
  const videos = keys.flatMap((k) => (stats.platforms[k].items || []).map((v) => ({ ...v, platform: k })));

  return (
    <Section title="Channel stats">
      <p className="-mt-2 text-body">
        Live numbers for <span className="font-semibold">Giải Mã Toán Olympic</span>, animated math olympiad solutions on
        TikTok, YouTube and Facebook.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <PlatformFilter value={filter} onChange={setFilter} available={available} />
        <p className="text-xs text-faint">Live · updated {time.format(new Date(stats.updatedAt))}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="Views" value={compact(views)} hint={exact(views)} />
        <Tile label="Followers" value={exact(sum("followers"))} />
        <Tile label="Likes, comments & shares" value={exact(engagements)} />
        <Tile label="Engagement rate" value={views ? percent(engagements / views) : "–"} hint={`${exact(sum("videos"))} videos`} />
      </div>

      <Card
        title="Growth"
        actions={
          <>
            <Segmented label="Metric" options={METRICS} value={metric} onChange={setMetric} />
            <Segmented label="Mode" options={MODES} value={mode} onChange={setMode} />
            <Segmented label="Range" options={RANGES} value={range} onChange={setRange} />
          </>
        }
      >
        <TrendChart history={history} keys={keys} metric={metric} mode={mode} />
      </Card>

      {filter === "all" && available.length > 1 && (
        <Card title="Platform split">
          <div className="grid gap-5 sm:grid-cols-3">
            {METRICS.map((m) => (
              <ShareBar key={m.key} label={m.label} platforms={stats.platforms} metric={m.key} />
            ))}
          </div>
        </Card>
      )}

      <Card title="Monetization progress">
        <Monetization platforms={stats.platforms} filter={filter} />
      </Card>

      <Card title="Videos">
        <VideoTable videos={videos} showPlatform={filter === "all"} />
      </Card>
    </Section>
  );
}
