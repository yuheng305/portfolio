import { useState } from "react";
import Section from "../components/ui/Section";
import VietnamMap from "../components/places/VietnamMap";
import PlaceDetail from "../components/places/PlaceDetail";
import { sortYear } from "../components/places/geo";
import { places, ROLES } from "../data/places";

const placeById = new Map(places.map((p) => [p.id, p]));
const keyOf = (event) => event.sortYear ?? sortYear(event.year);

// Every dated event across all places, oldest first.
const journey = places
  .flatMap((place) => place.events.filter((e) => e.year).map((event) => ({ place, event })))
  .sort((a, b) => keyOf(a.event) - keyOf(b.event));

export default function Places() {
  const [selectedId, setSelectedId] = useState("Hồ Chí Minh city");
  const selected = placeById.get(selectedId);

  return (
    <>
      <Section title="Places">
        <p className="text-lg leading-relaxed text-body">
          Born in the Central Highlands, rooted in Nghệ An, schooled in Huế and now living in Ho Chi Minh City —
          here is my Vietnam. Tap a raised province to read its story.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-body">
          {Object.entries(ROLES).map(([key, role]) => (
            <li key={key} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: role.color }} />
              {role.label}
            </li>
          ))}
        </ul>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(20rem,1fr)]">
          <div className="rounded-2xl border border-line bg-gradient-to-b from-accent-soft to-card p-2">
            <VietnamMap places={places} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="lg:sticky lg:top-6">
            <PlaceDetail key={selected.id} place={selected} />
          </div>
        </div>
        <p className="text-xs text-faint">
          Province boundaries before the 2025 merger · map data: geoBoundaries (public domain)
        </p>
      </Section>

      <Section title="Journey">
        <ol className="relative space-y-4 border-l-2 border-line pl-6">
          {journey.map(({ place, event }) => (
            <li key={`${place.id}-${event.year}-${event.text}`} className="relative">
              <span
                className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-card"
                style={{ backgroundColor: ROLES[place.role].color }}
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedId(place.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-left"
              >
                <span className="text-sm font-semibold text-muted">{event.year}</span>{" "}
                <span className="font-semibold text-ink hover:underline">{place.name}</span>
                <span className="block text-body">{event.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
