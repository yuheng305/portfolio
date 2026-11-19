import { ROLES } from "../../data/places";

export default function PlaceDetail({ place }) {
  const role = ROLES[place.role];
  const renamed = place.now && place.now !== place.name;

  return (
    <article className="space-y-4 rounded-2xl border border-line bg-card p-5 sm:p-6" aria-live="polite">
      <header className="space-y-2">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: role.color }}
        >
          {role.label}
        </span>
        <h3 className="text-2xl font-bold text-ink">{place.name}</h3>
        <p className="text-sm text-muted">
          {[place.period, renamed && `now part of ${place.now}`].filter(Boolean).join(" · ")}
        </p>
      </header>
      <p className="leading-relaxed text-body">{place.summary}</p>
      <ol className="space-y-3 border-l-2 border-line pl-4">
        {place.events.map((event) => (
          <li key={`${event.year}-${event.text}`} className="space-y-0.5">
            {event.year && <p className="text-sm font-semibold" style={{ color: role.color }}>{event.year}</p>}
            <p className="text-body">
              {event.text}
              {event.link && (
                <>
                  {" "}
                  <a href={event.link.url} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                    {event.link.label} ↗
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ol>
    </article>
  );
}
