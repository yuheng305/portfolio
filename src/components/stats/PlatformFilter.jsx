import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PLATFORMS } from "./platforms";

// Segmented control: "All" or one platform. Platforms without data are disabled.
export default function PlatformFilter({ value, onChange, available }) {
  const options = [{ key: "all", label: "All platforms" }, ...PLATFORMS];
  return (
    <div role="radiogroup" aria-label="Platform" className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-card p-1">
      {options.map((o) => {
        const active = value === o.key;
        const disabled = o.key !== "all" && !available.includes(o.key);
        return (
          <button
            key={o.key}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(o.key)}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
              active ? "bg-inverse text-on-inverse" : "text-body hover:bg-subtle"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {o.icon && <FontAwesomeIcon icon={o.icon} />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
