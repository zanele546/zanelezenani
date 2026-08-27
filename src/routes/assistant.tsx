import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { runAssistant } from "@/lib/assistant.functions";
import {
  audienceOptions,
  toneOptions,
  type AssistantTool,
} from "@/lib/assistant-prompts";

const title = "AI Workplace Productivity Assistant — Zanele Zenani";
const description =
  "An AI assistant that drafts professional emails, summarises meeting notes, plans prioritised task lists and simplifies research — built by Zanele Zenani.";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/assistant" },
    ],
    links: [{ rel: "canonical", href: "/assistant" }],
  }),
  component: Assistant,
});

type ToolDef = {
  id: AssistantTool;
  label: string;
  blurb: string;
  placeholder: string;
  example: string;
};

const tools: ToolDef[] = [
  {
    id: "email",
    label: "Smart Email",
    blurb: "Context-based professional emails with tone and audience control.",
    placeholder:
      "What is the email about? e.g. Ask a client to reschedule Thursday's review to Monday and apologise for the short notice.",
    example:
      "Ask a client to reschedule Thursday's project review to Monday 10:00 because our lead developer is on sick leave. Apologise for the short notice and offer to send an update pack beforehand.",
  },
  {
    id: "summary",
    label: "Notes Summariser",
    blurb: "Turns long meeting notes into key points, decisions and action items.",
    placeholder: "Paste your meeting notes here…",
    example:
      "Team meeting 12 March. Sipho said the site launch slipped because copy is late. Nomsa will finish the copy by Friday. Thabo raised that the contact form is not sending emails; he will test it Wednesday. We agreed to launch on 22 March instead of 15 March. Budget is fine. Ayanda must brief the client about the new date by tomorrow.",
  },
  {
    id: "planner",
    label: "Task Planner",
    blurb: "Prioritised daily or weekly plans with time-saving suggestions.",
    placeholder: "List your tasks, deadlines and how much time you have…",
    example:
      "I have 6 working hours tomorrow. Tasks: finish month-end report (due 17:00), reply to 20 emails, prepare Friday's presentation, book venue for the workshop, one-hour team stand-up at 09:00.",
  },
  {
    id: "research",
    label: "Research Assistant",
    blurb: "Summarises topics or articles into insights and next steps.",
    placeholder: "Paste an article or type a topic to research…",
    example:
      "Explain what an applicant tracking system is and how a first-time job seeker in South Africa should format a CV for it.",
  },
];

function Assistant() {
  const [active, setActive] = useState<AssistantTool>("email");
  const [input, setInput] = useState("");
  const [tone, setTone] = useState(toneOptions[0]);
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const call = useServerFn(runAssistant);
  const tool = tools.find((t) => t.id === active)!;

  const mutation = useMutation({
    mutationFn: () =>
      call({ data: { tool: active, input, tone, audience } }),
    onSuccess: (res) => setOutput(res.output),
    onError: () => setOutput(""),
  });

  function switchTool(id: AssistantTool) {
    setActive(id);
    setInput("");
    setOutput("");
    mutation.reset();
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <p className="eyebrow">CAPACITI AI Skill Accelerator project</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
        AI Workplace Productivity Assistant
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Four AI tools for the repetitive work that eats a professional's day: writing
        emails, summarising meetings, planning tasks and digesting research.
      </p>
      <div className="rule-ink mt-8" />

      <div className="mt-8 flex flex-wrap gap-2">
        {tools.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => switchTool(t.id)}
            className={
              t.id === active
                ? "rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                : "rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:border-ink"
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{tool.blurb}</p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim().length < 10) return;
          mutation.mutate();
        }}
      >
        {active === "email" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow">Tone</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground"
              >
                {toneOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="eyebrow">Audience</span>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground"
              >
                {audienceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        <label className="block">
          <span className="eyebrow">Your input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder={tool.placeholder}
            className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-ink focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={mutation.isPending || input.trim().length < 10}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
          >
            {mutation.isPending ? "Generating…" : "Generate with AI"}
          </button>
          <button
            type="button"
            onClick={() => setInput(tool.example)}
            className="rounded-md border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-secondary"
          >
            Use example
          </button>
        </div>
      </form>

      {mutation.isError ? (
        <p className="mt-6 rounded-md border border-destructive px-4 py-3 text-sm text-destructive">
          {(mutation.error as Error).message}
        </p>
      ) : null}

      {output ? (
        <section className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-ink-soft">AI output</h2>
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:border-ink"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-border bg-card p-5 font-sans text-sm leading-relaxed text-foreground">
            {output}
          </pre>
        </section>
      ) : null}

      <section className="mt-14 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-ink-soft">Responsible AI notice</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Every output is a draft. Read it and correct it before you send or act on it.</li>
          <li>
            The assistant only works from what you type in. Missing facts appear as
            [placeholders] rather than invented details.
          </li>
          <li>
            AI can still be wrong or biased. Verify names, dates, figures and any legal or
            financial wording yourself.
          </li>
          <li>
            Do not paste confidential client data, ID numbers or passwords. Your input is
            sent to an AI model for processing and is not stored by this site.
          </li>
        </ul>
      </section>
    </div>
  );
}
