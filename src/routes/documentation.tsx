import { createFileRoute } from "@tanstack/react-router";
import { Block, Page } from "@/components/site/Section";

const title = "AI Assistant Documentation — Zanele Zenani";
const description =
  "Problem statement, solution overview, AI tools used, prompt engineering approach, challenges and responsible-AI measures for the AI Workplace Productivity Assistant.";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Documentation,
});

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="eyebrow">{label}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function Documentation() {
  return (
    <Page
      eyebrow="Project documentation"
      title="AI Workplace Productivity Assistant"
      lead="A short write-up of the problem, the solution, the AI tools used, the prompt engineering behind it, and how it is kept responsible."
    >
      <Block heading="Problem statement">
        <p className="text-muted-foreground">
          Professionals lose hours every week to repetitive written work: composing the same
          kinds of emails, turning messy meeting notes into action items, re-planning a day
          that has too many tasks in it, and reading long documents just to find the few
          points that matter. This work is necessary but low-value, it is easy to do badly
          under time pressure, and it pushes real work into the evening.
        </p>
      </Block>

      <Block heading="Solution overview">
        <p className="text-muted-foreground">
          The AI Workplace Productivity Assistant is a web app with five focused tools
          instead of one open-ended chat box. Each tool has its own purpose-built prompt, so
          the user supplies context in plain language and gets a structured, usable draft
          back in seconds.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            <span className="text-ink-soft">Smart Email</span> — writes a professional email
            from a short brief, with tone and audience controls.
          </li>
          <li>
            <span className="text-ink-soft">Notes Summariser</span> — converts raw meeting
            notes into a summary, key points, decisions, action items and risks.
          </li>
          <li>
            <span className="text-ink-soft">Task Planner</span> — turns a task dump into a
            prioritised plan with durations and time-saving tips.
          </li>
          <li>
            <span className="text-ink-soft">Research Assistant</span> — explains a topic or
            article in plain English with insights and next steps.
          </li>
          <li>
            <span className="text-ink-soft">Chatbot</span> — a conversational assistant for
            follow-up questions and general workplace advice.
          </li>
        </ul>
      </Block>

      <Block heading="AI tools and technology used">
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            <span className="text-ink-soft">Google Gemini</span> (via the Lovable AI Gateway)
            — the language model behind all five tools.
          </li>
          <li>
            <span className="text-ink-soft">ChatGPT</span> — used during development to
            explore, test and refine prompt wording before it was coded in.
          </li>
          <li>
            <span className="text-ink-soft">Notion AI</span> — used to draft and organise
            this documentation and the project plan.
          </li>
          <li>
            <span className="text-ink-soft">Canva</span> — presentation and visual assets.
          </li>
          <li>
            <span className="text-ink-soft">React, TypeScript, TanStack Start, Tailwind CSS</span>{" "}
            — the app itself; model calls run server-side so the API key is never exposed to
            the browser.
          </li>
        </ul>
      </Block>

      <Block heading="Prompt engineering approach">
        <p className="text-muted-foreground">
          Each tool uses a system prompt that assigns a role, fixes the output format, and
          sets hard rules against invention. The user input is then wrapped with the chosen
          tone and audience. Sample prompts:
        </p>
        <Item label="Smart Email — system prompt">
          <p>
            "You are a professional workplace email writer. Return only the email: a
            'Subject:' line, then the body, then a sign-off. Use only the information the
            user provided. If a fact is missing, insert a clearly marked placeholder in
            square brackets instead of inventing it."
          </p>
        </Item>
        <Item label="Notes Summariser — system prompt">
          <p>
            "You are a meeting-notes summariser. Return plain text with these exact sections:
            SUMMARY, KEY POINTS, DECISIONS, ACTION ITEMS (owner — task — deadline), DEADLINES
            &amp; RISKS. Write 'None stated' where the notes contain nothing."
          </p>
        </Item>
        <Item label="Task Planner — user prompt example">
          <p>
            "I have 6 working hours tomorrow. Tasks: finish month-end report (due 17:00),
            reply to 20 emails, prepare Friday's presentation, book the workshop venue,
            one-hour stand-up at 09:00."
          </p>
        </Item>
        <p className="text-muted-foreground">
          Techniques applied: role assignment, explicit output schemas, constrained length,
          few-shot style examples in the UI, placeholder-instead-of-guess instructions, and a
          fixed review disclaimer appended to every output.
        </p>
      </Block>

      <Block heading="Challenges and solutions">
        <Item label="Challenge — the model invented details">
          <p>
            Early email drafts added names, dates and figures that were never given. Fixed by
            adding an anti-hallucination rule to every system prompt requiring
            [square-bracket placeholders] for anything missing.
          </p>
        </Item>
        <Item label="Challenge — inconsistent output shape">
          <p>
            Summaries came back in different formats each run, which made them hard to scan.
            Fixed by specifying exact section headings in the prompt and requiring "None
            stated" for empty sections.
          </p>
        </Item>
        <Item label="Challenge — keeping the API key safe">
          <p>
            The model must be called with a secret key. Fixed by making every AI call from a
            server function, so the key stays server-side and never reaches the browser.
          </p>
        </Item>
        <Item label="Challenge — rate limits and errors">
          <p>
            Failed requests originally showed nothing. Fixed by mapping gateway responses to
            clear, human messages for rate limiting, exhausted credits and general failures.
          </p>
        </Item>
      </Block>

      <Block heading="Responsible and ethical AI">
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Every output is labelled an AI draft that must be reviewed before use.</li>
          <li>The assistant works only from user-supplied context; gaps become placeholders.</li>
          <li>
            Users are warned not to paste confidential data, ID numbers or passwords, and
            inputs are not stored by the site.
          </li>
          <li>
            The chatbot declines legal, medical and financial advice and refers the user to a
            qualified professional.
          </li>
          <li>
            Users are reminded that AI can be wrong or biased, and that names, dates and
            figures must be verified by a human.
          </li>
        </ul>
      </Block>
    </Page>
  );
}
