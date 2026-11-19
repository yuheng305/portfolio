import { memo, useMemo } from "react";
import { MAP, PROVINCES, ISLANDS } from "../../data/vietnamMap";
import { ROLES } from "../../data/places";
import { project, shade } from "./geo";

const DEPTH = 5; // extrusion layers, in px

// Provinces I haven't been to: flat, static, never re-rendered.
const BaseLayer = memo(function BaseLayer({ visitedIds }) {
  return (
    <g>
      {PROVINCES.filter((p) => !visitedIds.has(p.name)).map((p) => (
        <path key={p.name} d={p.d} className="fill-line stroke-card" strokeWidth={0.6} />
      ))}
      {ISLANDS.map((group) => (
        <g key={group.name}>
          {group.dots.map(([x, y]) => (
            <circle key={`${x},${y}`} cx={x} cy={y} r={2} className="fill-faint" />
          ))}
          <text
            x={group.dots[0][0]}
            y={group.dots[0][1] - 10}
            className="fill-muted text-[11px] italic"
          >
            {group.name}
          </text>
        </g>
      ))}
    </g>
  );
});

function RaisedProvince({ province, place, selected, onSelect }) {
  const color = ROLES[place.role].color;
  const lift = selected ? DEPTH + 4 : DEPTH;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${place.name}: ${ROLES[place.role].label}`}
      aria-pressed={selected}
      onClick={() => onSelect(place.id)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(place.id))}
      className="group cursor-pointer outline-none"
    >
      <title>{`${place.name} — ${ROLES[place.role].label}`}</title>
      {/* Side walls: the same outline stacked in a darker shade. */}
      {Array.from({ length: lift }, (_, i) => (
        <path key={i} d={province.d} fill={shade(color, -0.45)} transform={`translate(0 ${-i})`} />
      ))}
      <path
        d={province.d}
        fill={color}
        stroke={shade(color, 0.55)}
        strokeWidth={selected ? 1.4 : 0.7}
        transform={`translate(0 ${-lift})`}
        className="transition-[filter] duration-150 group-hover:brightness-110 group-focus-visible:brightness-125"
      />
    </g>
  );
}

// Text halo in the card colour keeps labels readable over provinces in both themes.
const HALO = "[paint-order:stroke] [stroke:rgb(var(--c-card))] [stroke-width:4px] [stroke-linejoin:round]";

function ProvinceLabel({ province, name }) {
  return (
    <text
      x={province.cx}
      y={province.cy - DEPTH - 8}
      textAnchor="middle"
      pointerEvents="none"
      className={`fill-ink text-[15px] font-bold ${HALO}`}
    >
      {name}
    </text>
  );
}

function Pins({ place }) {
  return place.pins?.map((pin) => {
    const [x, y] = project(pin.coords);
    return (
      <g key={pin.name} pointerEvents="none">
        <circle cx={x} cy={y - DEPTH - 4} r={4} className="fill-card stroke-ink" strokeWidth={1.5} />
        <text x={x + 7} y={y - DEPTH - 1} className={`fill-ink text-[11px] font-semibold ${HALO}`}>
          {pin.name}
        </text>
      </g>
    );
  });
}

export default function VietnamMap({ places, selectedId, onSelect }) {
  const { placeById, visited, ordered } = useMemo(() => {
    const byId = new Map(places.map((p) => [p.id, p]));
    const visitedProvinces = PROVINCES.filter((p) => byId.has(p.name));
    // Draw north to south so southern provinces' walls overlap the ones behind them.
    return { placeById: byId, visited: visitedProvinces, ordered: [...visitedProvinces].sort((a, b) => a.cy - b.cy) };
  }, [places]);
  const selected = placeById.get(selectedId);

  return (
    <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="h-auto w-full" role="img" aria-label="Map of Vietnam with the provinces I have lived in or visited">
      <BaseLayer visitedIds={placeById} />
      {ordered.map((province) => (
        <RaisedProvince
          key={province.name}
          province={province}
          place={placeById.get(province.name)}
          selected={province.name === selectedId}
          onSelect={onSelect}
        />
      ))}
      {/* Province label, unless pins already name the exact spots. */}
      {selected && !selected.pins && <ProvinceLabel province={visited.find((v) => v.name === selected.id)} name={selected.name} />}
      {selected && <Pins place={selected} />}
    </svg>
  );
}
