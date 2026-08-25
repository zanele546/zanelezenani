import { createFileRoute } from "@tanstack/react-router";
import { Block, Chip, Page } from "@/components/site/Section";
import { profile, softSkills, technicalSkills, involvement } from "@/data/portfolio";

const title = "About Zanele Zenani — Matric graduate from Soweto";
const description =
  "Zanele Zenani matriculated in 2023, led a matric peer study group, and is building digital skills toward a career in technology.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <Page eyebrow="About me" title="A self-driven start" lead={profile.headline}>
      <div className="flex justify-start">
        <img
          src={profile.imageUrl}
          alt={profile.imageAlt}
          className="h-40 w-40 rounded-full border-2 border-ink object-cover shadow-lg"
        />
      </div>

      <Block heading="My story">
        {profile.about.map((p) => (
          <p key={p} className="leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
      </Block>

      <Block heading="Technical skills">
        <div className="flex flex-wrap gap-2">
          {technicalSkills.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          This list grows as I complete more courses — I only list what I can actually do today.
        </p>
      </Block>

      <Block heading="Soft skills">
        <div className="flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
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
          I have no formal work experience yet — this is where I've led and delivered so far.
        </p>
      </Block>
    </Page>
  );
}
