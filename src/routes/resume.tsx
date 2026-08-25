import { createFileRoute } from "@tanstack/react-router";
import { Block, Chip, Page, PlaceholderTag } from "@/components/site/Section";
import {
  certifications,
  education,
  involvement,
  profile,
  softSkills,
  technicalSkills,
} from "@/data/portfolio";

const title = "Résumé — Zanele Zenani";
const description =
  "Education, skills, leadership and certifications in progress for Zanele Zenani, matric graduate from Soweto. Downloadable CV included.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: Resume,
});

function Resume() {
  return (
    <Page
      eyebrow="Résumé"
      title="Education & experience"
      lead={`${profile.name} · ${profile.location}`}
    >
      <div className="flex flex-col gap-2">
        <a
          href={profile.cvUrl}
          download
          className="inline-flex w-fit items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
        >
          Download CV (PDF)
        </a>
        <p className="text-sm text-muted-foreground">
          Note: this links to a placeholder file — replace it with your real CV.
        </p>
      </div>

      <Block heading="Education">
        {education.map((e) => (
          <div key={e.qualification}>
            <p className="font-semibold">{e.qualification}</p>
            <p className="text-sm text-ink">
              {e.institution} · {e.year}
            </p>
            <p className="mt-1 text-muted-foreground">{e.note}</p>
          </div>
        ))}
      </Block>

      <Block heading="Leadership & involvement">
        {involvement.map((item) => (
          <div key={item.org}>
            <p className="font-semibold">
              {item.role} · <span className="text-ink">{item.org}</span>
            </p>
            <p className="text-sm text-muted-foreground">{item.year}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              {item.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-sm text-muted-foreground">
          No formal work experience yet — actively seeking a first internship.
        </p>
      </Block>

      <Block heading="Certifications — in progress / planned">
        {certifications.placeholder ? <PlaceholderTag /> : null}
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          {certifications.items.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Block>

      <Block heading="Skills">
        <div>
          <p className="eyebrow">Technical</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {technicalSkills.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Soft skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </Block>
    </Page>
  );
}
