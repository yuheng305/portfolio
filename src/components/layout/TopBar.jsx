import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STUDY_PAGES } from "../../routes";

export default function TopBar() {
  return (
    <nav className="sticky top-[var(--mobile-header-h)] z-20 overflow-x-auto border-b border-slate-200 bg-white/95 backdrop-blur md:top-0">
      <ul className="flex min-w-max md:min-w-0">
        {STUDY_PAGES.map((tab) => (
          <li key={tab.slug} className="md:flex-1">
            <NavLink
              to={tab.slug}
              className={({ isActive }) =>
                `flex h-[var(--tabbar-h)] items-center justify-center gap-2 whitespace-nowrap border-b-2 px-4 text-sm font-semibold transition ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
