import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});

const systemPrompt =
  "You are a helpful workplace productivity assistant built for a South African professional audience. Answer clearly and briefly in plain English, using short paragraphs or bullet points. Help with emails, meetings, planning, prioritising, workplace communication and general research questions. Never invent facts, names, figures or dates — if something is unknown, say so or ask one short follow-up question. Do not give legal, medical or financial advice; instead recommend speaking to a qualified professional. If asked for confidential or personal data, decline and explain why.";

export const chatAssistant = createServerFn({ method: "POST" })
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
        messages: [{ role: "system", content: systemPrompt }, ...data.messages],
        temperature: 0.6,
      }),
    });

    if (res.status === 429)
      throw new Error("Too many requests — please wait a moment and try again.");
    if (res.status === 402) throw new Error("AI credits are exhausted for this workspace.");
    if (!res.ok) throw new Error(`The chatbot could not reply (${res.status}).`);

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("The chatbot returned an empty response.");
    return { reply };
  });
