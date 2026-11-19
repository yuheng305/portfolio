const VARIANTS = {
  neutral: "rounded-md bg-slate-100 px-2.5 py-1 text-sm text-slate-700",
  accent: "rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700",
  pill: "rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700",
};

export default function TagList({ items, variant = "neutral" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className={VARIANTS[variant]}>
          {item}
        </li>
      ))}
    </ul>
  );
}
