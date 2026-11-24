import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPenToSquare,
  faMapLocationDot,
  faChartLine,
  faCube,
  faBars,
  faXmark,
  faMoon,
  faSun,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";
import { profile } from "../../data/profile";
import { PATHS } from "../../routes";
import { useSidebarCollapsed, useTheme } from "../../hooks/usePreferences";

const ROUTE_NAV = [
  { label: "About", icon: faUser, to: PATHS.about },
  { label: "Study Process", icon: faPenToSquare, to: PATHS.study },
  { label: "Places", icon: faMapLocationDot, to: PATHS.places },
  { label: "Channel Stats", icon: faChartLine, to: PATHS.channel },
];

const SOCIAL_ICONS = {
  LinkedIn: faLinkedin,
  GitHub: faGithub,
  Facebook: faFacebook,
  Instagram: faInstagram,
  YouTube: faYoutube,
  WCA: faCube,
};

const itemClass = "flex items-center gap-3 rounded-lg py-3 text-sm font-semibold uppercase tracking-wide transition";
const idleClass = "text-body hover:bg-subtle";
const iconButton = "flex items-center justify-center rounded-lg p-2 text-body transition hover:bg-subtle hover:text-ink";

// `compact` renders icons only (collapsed desktop sidebar); labels stay available to screen readers and as tooltips.
function NavItems({ compact = false, onNavigate }) {
  const pad = compact ? "justify-center px-0" : "px-4";
  const label = (text) => <span className={compact ? "sr-only" : undefined}>{text}</span>;

  return (
    <ul className="space-y-1">
      {ROUTE_NAV.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            onClick={onNavigate}
            title={compact ? item.label : undefined}
            className={({ isActive }) => `${itemClass} ${pad} ${isActive ? "bg-inverse text-on-inverse" : idleClass}`}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5" />
            {label(item.label)}
          </NavLink>
        </li>
      ))}
      {/* The contact footer is on every page, so this is an in-page anchor, not a route. */}
      <li>
        <a href="#contact" onClick={onNavigate} title={compact ? "Contact" : undefined} className={`${itemClass} ${pad} ${idleClass}`}>
          <FontAwesomeIcon icon={faEnvelope} className="w-5" />
          {label("Contact")}
        </a>
      </li>
    </ul>
  );
}

function Socials({ compact = false }) {
  return (
    <div className={compact ? "flex flex-col items-center gap-4" : "flex flex-wrap gap-4"}>
      {profile.socials.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className="text-muted transition hover:text-accent"
        >
          <FontAwesomeIcon icon={SOCIAL_ICONS[s.name]} className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" onClick={toggleTheme} aria-label={label} title={label} className={iconButton}>
      <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="h-5 w-5" />
    </button>
  );
}

function DesktopSidebar() {
  const { collapsed, toggleCollapsed } = useSidebarCollapsed();
  const toggleLabel = collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[var(--sidebar-w)] flex-col border-r border-line bg-card transition-[width] duration-200 md:flex">
      {collapsed ? (
        <img src={profile.avatar} alt={profile.name} className="mx-auto mt-4 h-11 w-11 rounded-full object-cover object-top" />
      ) : (
        <img src={profile.portrait} alt={profile.name} className="h-[38vh] w-full object-cover object-top" />
      )}
      <div className={`flex flex-1 flex-col gap-6 overflow-y-auto ${collapsed ? "px-3 py-5" : "p-5"}`}>
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">{profile.name}</h1>
            <p className="text-sm text-muted">{profile.headline}</p>
          </div>
        )}
        <NavItems compact={collapsed} />
        <div className={`mt-auto flex gap-4 ${collapsed ? "flex-col items-center" : "flex-col"}`}>
          <Socials compact={collapsed} />
          <div className={`flex gap-1 border-t border-line pt-3 ${collapsed ? "flex-col items-center" : "justify-between"}`}>
            <ThemeToggle />
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label={toggleLabel}
              aria-expanded={!collapsed}
              title={toggleLabel}
              className={iconButton}
            >
              <FontAwesomeIcon icon={collapsed ? faAnglesRight : faAnglesLeft} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MobileHeader() {
  // The menu is "open for a pathname": any route change (links, back/forward) closes it without an effect.
  const { pathname } = useLocation();
  const [openFor, setOpenFor] = useState(null);
  const open = openFor === pathname;
  const close = () => setOpenFor(null);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card md:hidden">
      <div className="flex h-[var(--mobile-header-h)] items-center gap-3 px-4">
        <img src={profile.avatar} alt="" className="h-10 w-10 rounded-full object-cover object-top" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold leading-tight text-ink">{profile.name}</p>
          <p className="truncate text-xs text-muted">{profile.headline}</p>
        </div>
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpenFor(open ? null : pathname)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={iconButton}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="space-y-4 border-t border-line px-4 pb-4 pt-2">
          <NavItems onNavigate={close} />
          <Socials />
        </div>
      )}
    </header>
  );
}

export default function SideBar() {
  return (
    <>
      <DesktopSidebar />
      <MobileHeader />
    </>
  );
}
