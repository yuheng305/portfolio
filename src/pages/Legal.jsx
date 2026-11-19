import Section from "../components/ui/Section";
import { profile } from "../data/profile";

const UPDATED = "November 19, 2026";

const PAGES = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "This website is the personal portfolio of Nguyen Quang Huy. It does not use cookies, analytics or advertising, and it does not ask visitors for any personal information.",
      "The project section shows public statistics (followers, views, likes, comments and shares) of the creator's own channels on TikTok, YouTube and Facebook. These numbers are read through the platforms' official APIs using access granted by the channel owner, and are shown only in aggregate.",
      "Access tokens for those APIs are stored server-side and are never sent to visitors' browsers. No data about other TikTok, YouTube or Facebook users is collected or stored.",
      "The channel owner can revoke this access at any time from the platform's app settings.",
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      "This website is a personal portfolio provided as-is for informational purposes. Content and images belong to Nguyen Quang Huy unless stated otherwise.",
      "Channel statistics are fetched from TikTok, YouTube and Facebook through their official APIs and may be delayed by a few minutes. Use of those platforms is governed by their own terms.",
      "The integrations are used only to display the creator's own channel statistics; they do not post, modify or delete any content.",
    ],
  },
};

export default function Legal({ page }) {
  const { title, body } = PAGES[page];
  return (
    <Section title={title}>
      <p className="text-sm text-muted">Last updated: {UPDATED}</p>
      <div className="space-y-4 leading-relaxed text-body">
        {body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          Contact: <a className="text-accent hover:underline" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        </p>
      </div>
    </Section>
  );
}
