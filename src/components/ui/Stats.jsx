export default function Stats({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((s) => (
        <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xl font-bold text-blue-600 sm:text-2xl">{s.value}</p>
          <p className="text-sm text-slate-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
