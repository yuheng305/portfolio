export default function Stats({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((s) => (
        <div key={s.label} className="rounded-xl border border-line bg-card p-4">
          <p className="text-xl font-bold text-accent sm:text-2xl">{s.value}</p>
          <p className="text-sm text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
