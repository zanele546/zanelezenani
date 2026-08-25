import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Section";
import { profile } from "@/data/portfolio";

const title = "Contact Zanele Zenani";
const description =
  "Get in touch with Zanele Zenani by email or LinkedIn about internship and entry-level opportunities in Soweto, South Africa.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:gap-6">
      <p className="eyebrow w-32 shrink-0">{label}</p>
      <div className="text-lg">{children}</div>
    </div>
  );
}

function Contact() {
  return (
    <Page
      eyebrow="Contact"
      title="Let's talk"
      lead="I'm open to internships, learnerships and entry-level opportunities."
    >
      <div>
        <Row label="Email">
          <a href={`mailto:${profile.email}`} className="text-ink hover:text-ink-soft">
            {profile.email}
          </a>
        </Row>
        <Row label="LinkedIn">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-ink hover:text-ink-soft"
          >
            {profile.linkedinLabel}
          </a>
        </Row>
        {profile.github ? (
          <Row label="GitHub">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:text-ink-soft"
            >
              {profile.github}
            </a>
          </Row>
        ) : null}
        <Row label="Location">
          <span className="text-muted-foreground">{profile.location}</span>
        </Row>
      </div>
      <p className="text-sm text-muted-foreground">
        The LinkedIn link currently points to a search for my name — send me the exact profile URL
        and it will be swapped in.
      </p>
    </Page>
  );
}
