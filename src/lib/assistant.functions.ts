import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildMessages, type AssistantRequest } from "./assistant-prompts";

const schema = z.object({
  tool: z.enum(["email", "summary", "planner", "research"]),
  input: z.string().min(10).max(8000),
  tone: z.string().max(40).optional(),
  audience: z.string().max(40).optional(),
});

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this project.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: buildMessages(data as AssistantRequest),
        temperature: 0.5,
      }),
    });

    if (res.status === 429) throw new Error("Too many requests — please wait a moment and try again.");
    if (res.status === 402) throw new Error("AI credits are exhausted for this workspace.");
    if (!res.ok) throw new Error(`The assistant could not complete that request (${res.status}).`);

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const output = json.choices?.[0]?.message?.content?.trim();
    if (!output) throw new Error("The assistant returned an empty response.");
    return { output };
  });
