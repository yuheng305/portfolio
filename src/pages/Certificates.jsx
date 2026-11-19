import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import { certificates } from "../data/profile";

export default function Certificates() {
  return (
    <Section title="Licenses & Certifications">
      <div className="grid gap-6 lg:grid-cols-2">
        {certificates.map((c) => (
          <Card
            key={c.title}
            size="sm"
            title={c.title}
            extra={[c.issuer, c.date, c.note].filter(Boolean).join(" · ")}
            media={
              <a href={c.image} target="_blank" rel="noopener noreferrer" className="block bg-subtle">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-contain p-3"
                />
              </a>
            }
          />
        ))}
      </div>
    </Section>
  );
}
