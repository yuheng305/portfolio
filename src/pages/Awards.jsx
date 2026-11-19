import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Carousel from "../components/ui/Carousel";
import { awards } from "../data/profile";

export default function Awards() {
  return (
    <Section title="Honors & Awards">
      <div className="space-y-6">
        {awards.map((a) => (
          <Card key={a.title} title={a.title} extra={a.issuer} meta={a.date}>
            {a.description && <p className="text-body">{a.description}</p>}
            {a.images && <Carousel images={a.images} />}
          </Card>
        ))}
      </div>
    </Section>
  );
}
