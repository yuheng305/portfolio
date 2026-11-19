import Section from "../components/ui/Section";
import Stats from "../components/ui/Stats";
import TagList from "../components/ui/TagList";
import Carousel from "../components/ui/Carousel";

// Shared template for the Middle School / High School / University pages.
export default function SchoolPage({ school }) {
  return (
    <>
      <Section title="Introduction">
        <p className="text-sm font-medium text-accent">{school.period}</p>
        <p className="text-lg leading-relaxed text-body">{school.intro}</p>
        {school.stats && <Stats items={school.stats} />}
        {school.thesis && <p className="text-body">{school.thesis}</p>}
        {school.coursework && <TagList items={school.coursework} variant="pill" />}
        {/* Above the fold: load eagerly. */}
        <div className="grid gap-4 sm:grid-cols-2">
          {school.campus.map((src) => (
            <img key={src} src={src} alt={school.name} className="aspect-video w-full rounded-xl object-cover" />
          ))}
        </div>
      </Section>

      <Section title="Achievements">
        <Carousel images={school.achievements} />
      </Section>
    </>
  );
}
