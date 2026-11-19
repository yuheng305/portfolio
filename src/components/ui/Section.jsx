export default function Section({ title, children }) {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}
