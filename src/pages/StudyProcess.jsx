import { Link } from "react-router-dom";
import Section from "../components/ui/Section";
import { timeline } from "../data/profile";
import { studyPath } from "../routes";

export default function StudyProcess() {
  return (
    <Section title="My Journey">
      <ol className="relative space-y-6 border-l-2 border-line pl-6">
        {timeline.map((item) => (
          <li key={item.title} className="relative">
            <span className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-4 border-page bg-accent" />
            <p className="text-sm font-medium text-accent">{item.period}</p>
            <Link to={studyPath(item.page)} className="text-lg font-semibold text-ink hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
