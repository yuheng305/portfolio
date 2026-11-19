import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import TagList from "../components/ui/TagList";
import { skills } from "../data/profile";

export default function Skills() {
  return (
    <Section title="Skills">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g) => (
          <Card key={g.group} size="sm" title={g.group}>
            <TagList items={g.items} />
          </Card>
        ))}
      </div>
    </Section>
  );
}
