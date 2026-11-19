const VARIANTS = {
  neutral: "rounded-md bg-subtle px-2.5 py-1 text-sm text-body",
  accent: "rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent",
  pill: "rounded-full bg-subtle px-3 py-1 text-sm text-body",
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
