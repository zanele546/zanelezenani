import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { chatAssistant } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const starters = [
  "How do I politely chase an unanswered email?",
  "Help me prepare questions for a job interview.",
  "How should I prioritise a day with too many tasks?",
];

export function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const call = useServerFn(chatAssistant);

  const mutation = useMutation({
    mutationFn: (next: Msg[]) => call({ data: { messages: next } }),
    onSuccess: (res) =>
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]),
  });

  function send(text: string) {
    const clean = text.trim();
    if (!clean || mutation.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setDraft("");
    mutation.mutate(next);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div>
            <p className="text-sm text-muted-foreground">
              Ask the assistant anything about your workday. Try one of these:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:border-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            {m.role === "user" ? (
              <p className="max-w-[85%] whitespace-pre-wrap rounded-lg bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                {m.content}
              </p>
            ) : (
              <div className="chat-markdown max-w-[90%] rounded-lg border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-secondary-foreground">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        {mutation.isPending ? (
          <p className="text-sm text-muted-foreground">Assistant is typing…</p>
        ) : null}

        {mutation.isError ? (
          <p className="rounded-md border border-destructive px-4 py-3 text-sm text-destructive">
            {(mutation.error as Error).message}
          </p>
        ) : null}
      </div>

      <form
        className="mt-5 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type your question…"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ink focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={mutation.isPending || draft.trim().length === 0}
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
          >
            Send
          </button>
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                mutation.reset();
              }}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-ink hover:text-ink"
            >
              Clear
            </button>
          ) : null}
        </div>
      </form>

      <p className="mt-3 text-xs text-muted-foreground">
        The chatbot remembers this conversation only while the page is open. Nothing is stored.
      </p>
    </div>
  );
}
