import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { platformByKey, exact, percent, shortDate } from "./platforms";
import { PROGRAMS, CHECKED_ON, evaluate } from "../../data/monetization";

function Meter({ condition }) {
  const { label, target, current, progress, asOf } = condition;
  const met = progress === 1;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="text-body">
          {label}
          {asOf && <span className="text-faint"> · as of {shortDate(asOf)}</span>}
        </span>
        <span className="whitespace-nowrap tabular-nums text-muted">
          <span className="font-semibold text-ink">{current === undefined ? "–" : exact(current)}</span> / {exact(target)}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-subtle">
        <div
          className={`h-1.5 rounded-full ${met ? "bg-success" : "bg-accent"}`}
          style={{ width: `${Math.max((progress ?? 0) * 100, progress ? 1 : 0)}%` }}
        />
      </div>
    </div>
  );
}

function ProgramCard({ program }) {
  const p = platformByKey[program.platform];
  const { progress, requires, status, platformSaysMet } = program;
  const pending = platformSaysMet === false;
  const met = progress === 1 && !pending;
  return (
    <div className="space-y-3 rounded-xl border border-line bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <FontAwesomeIcon icon={p.icon} style={{ color: p.color }} aria-label={p.label} />
            {program.name}
          </p>
          <p className="text-xs text-muted">{program.detail}</p>
        </div>
        {pending ? (
          <p className="shrink-0 rounded-full bg-subtle px-2.5 py-1 text-xs font-semibold text-muted">Not met yet</p>
        ) : (
          progress !== null && (
            <p className={`shrink-0 text-2xl font-bold tabular-nums ${met ? "text-success" : "text-ink"}`}>
              {percent(Math.floor(progress * 1000) / 1000)}
            </p>
          )
        )}
      </div>
      {requires.map((r, i) =>
        r.anyOf ? (
          <div key={i} className="space-y-2 rounded-lg border border-dashed border-line p-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">One of</p>
            {r.anyOf.map((o) => (
              <Meter key={o.label} condition={o} />
            ))}
          </div>
        ) : (
          <Meter key={r.label} condition={r} />
        )
      )}
      {status && (
        <p className="flex gap-2 text-xs text-muted">
          <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 shrink-0" />
          {status}
        </p>
      )}
      {met && (
        <p className="flex gap-2 text-xs font-semibold text-success">
          <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" /> All thresholds met
        </p>
      )}
    </div>
  );
}

// Progress toward each monetization program: the weakest required condition sets the percentage.
export default function Monetization({ platforms, filter }) {
  const programs = PROGRAMS.filter((p) => filter === "all" || p.platform === filter).map((p) => evaluate(p, platforms));
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        {programs.map((p) => (
          <ProgramCard key={`${p.platform}-${p.name}`} program={p} />
        ))}
      </div>
      <p className="text-xs text-faint">
        Thresholds as each platform shows them for this account (checked {shortDate(CHECKED_ON)}). The percentage is the
        weakest requirement; for “one of” it takes the closest option. Subscriber, follower and upload counts are live; the
        others exist only inside YouTube Studio and are dated.
      </p>
    </div>
  );
}
