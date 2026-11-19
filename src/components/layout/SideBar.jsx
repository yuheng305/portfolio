import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPenToSquare, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";
import { profile } from "../../data/profile";
import { PATHS } from "../../routes";

const ROUTE_NAV = [
  { label: "About", icon: faUser, to: PATHS.about },
  { label: "Study Process", icon: faPenToSquare, to: PATHS.study },
];

const SOCIAL_ICONS = {
  LinkedIn: faLinkedin,
  GitHub: faGithub,
  Facebook: faFacebook,
  Instagram: faInstagram,
  YouTube: faYoutube,
};

const itemClass = "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide transition";
const idleClass = "text-slate-700 hover:bg-slate-100";

function NavItems({ onNavigate }) {
  return (
    <ul className="space-y-1">
      {ROUTE_NAV.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) => `${itemClass} ${isActive ? "bg-slate-900 text-white" : idleClass}`}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5" />
            {item.label}
          </NavLink>
        </li>
      ))}
      {/* The contact footer is on every page, so this is an in-page anchor, not a route. */}
      <li>
        <a href="#contact" onClick={onNavigate} className={`${itemClass} ${idleClass}`}>
          <FontAwesomeIcon icon={faEnvelope} className="w-5" />
          Contact
        </a>
      </li>
    </ul>
  );
}

function Socials() {
  return (
    <div className="flex flex-wrap gap-4">
      {profile.socials.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="text-slate-500 transition hover:text-blue-600"
        >
          <FontAwesomeIcon icon={SOCIAL_ICONS[s.name]} className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

export default function SideBar() {
  // The mobile menu is "open for a pathname": any route change (links, back/forward)
  // closes it without an effect.
  const { pathname } = useLocation();
  const [openFor, setOpenFor] = useState(null);
  const open = openFor === pathname;
  const close = () => setOpenFor(null);

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-[var(--sidebar-w)] flex-col border-r border-slate-200 bg-white md:flex">
        <img src={profile.portrait} alt={profile.name} className="h-[38vh] w-full object-cover object-top" />
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{profile.name}</h1>
            <p className="text-sm text-slate-500">{profile.headline}</p>
          </div>
          <NavItems />
          <div className="mt-auto">
            <Socials />
          </div>
        </div>
      </aside>

      {/* Mobile: sticky top header with toggle menu */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white md:hidden">
        <div className="flex h-[var(--mobile-header-h)] items-center gap-3 px-4">
          <img src={profile.avatar} alt="" className="h-10 w-10 rounded-full object-cover object-top" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold leading-tight text-slate-900">{profile.name}</p>
            <p className="truncate text-xs text-slate-500">{profile.headline}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpenFor(open ? null : pathname)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-5 w-5" />
          </button>
        </div>
        {open && (
          <div className="space-y-4 border-t border-slate-100 px-4 pb-4 pt-2">
            <NavItems onNavigate={close} />
            <Socials />
          </div>
        )}
      </header>
    </>
  );
}
