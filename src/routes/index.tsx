import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, softSkills, technicalSkills } from "@/data/portfolio";

const title = "Zanele Zenani — Portfolio";
const description =
  "Ambitious matric graduate from Soweto, South Africa, building digital skills and seeking a first internship in tech.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <div className="shrink-0">
          <img
            src={profile.imageUrl}
            alt={profile.imageAlt}
            className="h-40 w-40 rounded-full border-2 border-ink object-cover shadow-lg sm:h-48 sm:w-48"
          />
        </div>
        <div className="flex-1">
          <p className="eyebrow">{profile.location}</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl text-ink-soft">{profile.headline}</p>
        </div>
      </div>

      <div className="rule-ink mt-8" />
      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
        >
          See my projects
        </Link>
        <Link
          to="/contact"
          className="rounded-md border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-secondary"
        >
          Get in touch
        </Link>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-ink-soft">What I bring</h2>
        <dl className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="eyebrow">Technical</dt>
            <dd className="mt-2 text-muted-foreground">{technicalSkills.join(" · ")}</dd>
          </div>
          <div>
            <dt className="eyebrow">Personal</dt>
            <dd className="mt-2 text-muted-foreground">{softSkills.join(" · ")}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
