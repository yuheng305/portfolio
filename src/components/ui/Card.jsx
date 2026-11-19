// Bordered content card: optional media on top, a header (title / subtitle / extra
// on the left, meta / metaSub on the right) and free-form body content.
export default function Card({ media, title, subtitle, extra, meta, metaSub, size = "lg", children }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card">
      {media}
      <div className="space-y-4 p-5 sm:p-6">
        <header className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className={`font-bold text-ink ${size === "lg" ? "text-xl" : "text-base"}`}>{title}</h3>
            {subtitle && <p className="font-medium text-body">{subtitle}</p>}
            {extra && <p className="text-sm text-muted">{extra}</p>}
          </div>
          {(meta || metaSub) && (
            <div className="sm:text-right">
              {meta && <p className="text-sm font-semibold text-accent">{meta}</p>}
              {metaSub && <p className="text-sm text-muted">{metaSub}</p>}
            </div>
          )}
        </header>
        {children}
      </div>
    </article>
  );
}
