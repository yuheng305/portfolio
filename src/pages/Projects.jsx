import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTiktok, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import SocialStats from "../components/ui/SocialStats";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Stats from "../components/ui/Stats";
import TagList from "../components/ui/TagList";
import Carousel from "../components/ui/Carousel";
import ButtonLink from "../components/ui/ButtonLink";
import { projects } from "../data/profile";

const LINK_ICONS = [
  ["github.com", faGithub],
  ["tiktok.com", faTiktok],
  ["youtube.com", faYoutube],
  ["facebook.com", faFacebook],
];
const linkIcon = (url) => LINK_ICONS.find(([host]) => url.includes(host))?.[1] ?? faGlobe;

export default function Projects() {
  return (
    <Section title="Projects">
      <div className="space-y-6">
        {projects.map((p) => (
          <Card key={p.name} title={p.name} extra={p.tag} meta={p.period}>
            <p className="text-body">{p.description}</p>
            {p.metrics && <Stats items={p.metrics} />}
            {p.liveStats && <SocialStats />}
            {p.highlights && (
              <ul className="list-disc space-y-1.5 pl-5 text-body marker:text-accent">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            <p className="text-sm text-body">
              <span className="font-semibold">Role:</span> {p.role}
            </p>
            <TagList items={p.stack} variant="accent" />
            <div className="flex flex-wrap gap-3">
              {p.links.map((l) => (
                <ButtonLink key={l.url} to={l.url}>
                  <FontAwesomeIcon icon={linkIcon(l.url)} />
                  {l.label}
                </ButtonLink>
              ))}
            </div>
            {p.images && <Carousel images={p.images} />}
          </Card>
        ))}
      </div>
    </Section>
  );
}
