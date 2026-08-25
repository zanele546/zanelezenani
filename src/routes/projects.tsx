import { createFileRoute } from "@tanstack/react-router";
import { Chip, Page, PlaceholderTag } from "@/components/site/Section";
import { projects } from "@/data/portfolio";

const title = "Projects — Zanele Zenani";
const description =
  "Projects by Zanele Zenani, including the Matric Peer Study Group she organised and led in 2023 using WhatsApp and Google Docs.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects;
});

function Projects() {
  return (
    <Page
      eyebrow="Projects"
      title="What I've built and led"
      lead="Real work is listed first. Anything not yet finished is clearly marked as a placeholder."
    >
      {projects.map((project, i) => (
        <article key={`${project.title}-${i}`} className="rounded-lg border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            {project.placeholder ? <PlaceholderTag /> : null}
          </div>
          <p className="mt-1 text-sm text-ink">{project.year}</p>
          <p className="mt-3 text-muted-foreground">{project.summary}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
            {project.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </article>
      ))}
    </Page>
  );
}
