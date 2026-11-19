import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-slate-900 text-white hover:bg-slate-700",
  secondary: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100",
};

// Internal paths render a router <Link>; http(s) URLs open in a new tab.
export default function ButtonLink({ to, variant = "primary", children }) {
  const className = `inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${VARIANTS[variant]}`;

  if (/^https?:/i.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
