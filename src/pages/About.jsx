import Section from "../components/ui/Section";
import Stats from "../components/ui/Stats";
import Carousel from "../components/ui/Carousel";
import ButtonLink from "../components/ui/ButtonLink";
import { profile } from "../data/profile";
import { studyPath } from "../routes";

export default function About() {
  const { currentJob } = profile;

  return (
    <>
      <Section title="About Me">
        {currentJob && (
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {currentJob.role} · {currentJob.company}
          </p>
        )}
        <div className="space-y-4 text-lg leading-relaxed text-slate-700">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Stats items={profile.highlights} />
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={studyPath("experience")}>View experience</ButtonLink>
          <ButtonLink to={studyPath("awards")} variant="secondary">
            Awards & scholarships
          </ButtonLink>
        </div>
      </Section>

      <Section title="Some Photos">
        <Carousel images={profile.photos} autoPlay />
      </Section>
    </>
  );
}
