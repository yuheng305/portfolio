import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { profile } from "../../data/profile";

const { email, phone, phoneIntl, location } = profile.contact;
const ITEMS = [
  { icon: faEnvelope, label: email, href: `mailto:${email}` },
  { icon: faPhone, label: phone, href: `tel:${phoneIntl}` },
  { icon: faLocationDot, label: location },
];
const YEAR = new Date().getFullYear();

export default function BottomBar() {
  return (
    <footer id="contact" className="bg-slate-900 px-6 py-10 text-white">
      {/* Legacy anchor: old links pointed to /about#bottom. */}
      <span id="bottom" />
      <h2 className="mb-6 text-center text-xl font-semibold">Get in touch</h2>
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
        {ITEMS.map(({ icon, label, href }) => {
          const Tag = href ? "a" : "div";
          return (
            <Tag
              key={label}
              href={href}
              className="flex flex-col items-center rounded-xl bg-white/5 p-5 text-center transition hover:bg-white/10"
            >
              <FontAwesomeIcon icon={icon} className="mb-2 text-2xl text-blue-400" />
              <span className="break-all text-sm">{label}</span>
            </Tag>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs text-slate-400">
        © {YEAR} {profile.name} ·{" "}
        <Link to="/privacy" className="hover:text-white">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link to="/terms" className="hover:text-white">
          Terms
        </Link>
      </p>
    </footer>
  );
}
