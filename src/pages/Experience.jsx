import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Carousel from "../components/ui/Carousel";
import { experience } from "../data/profile";

export default function Experience() {
  return (
    <Section title="Experience">
      <div className="space-y-6">
        {experience.map((job) => (
          <Card
            key={`${job.company}-${job.period}`}
            title={job.role}
            subtitle={job.company}
            extra={job.type}
            meta={job.period}
            metaSub={job.location}
          >
            {job.images && <Carousel images={job.images} />}
          </Card>
        ))}
      </div>
    </Section>
  );
}
