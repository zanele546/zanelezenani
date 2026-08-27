export type AssistantTool = "email" | "summary" | "planner" | "research";

export type AssistantRequest = {
  tool: AssistantTool;
  input: string;
  tone?: string;
  audience?: string;
};

export const toneOptions = ["Formal", "Friendly", "Persuasive", "Apologetic", "Concise"];
export const audienceOptions = ["Client", "Manager", "Team", "Recruiter", "Supplier"];

const guardrail =
  "Use only the information the user provided. If a fact is missing, insert a clearly marked placeholder in square brackets instead of inventing it. Never fabricate names, numbers, dates or quotes. Finish with one short line: 'AI draft — please review before sending or acting on it.'";

const systemPrompts: Record<AssistantTool, string> = {
  email:
    `You are a professional workplace email writer. Return only the email: a "Subject:" line, then the body, then a sign-off. ${guardrail}`,
  summary:
    `You are a meeting-notes summariser. Return markdown-free plain text with these exact sections: SUMMARY (3-5 sentences), KEY POINTS, DECISIONS, ACTION ITEMS (format: owner — task — deadline), DEADLINES & RISKS. Write "None stated" where the notes contain nothing. ${guardrail}`,
  planner:
    `You are a productivity planner. Return a prioritised plan grouped by time block or day. For each task give: priority (High/Medium/Low), an estimated duration, and a one-line reason for its placement. End with a short "TIME-SAVING TIPS" list of 3 items. ${guardrail}`,
  research:
    `You are a research assistant. Return these sections: PLAIN-ENGLISH OVERVIEW (max 5 sentences), KEY INSIGHTS (max 5 bullets), WHAT IT MEANS FOR THE READER, RECOMMENDED NEXT STEPS, WHAT TO VERIFY. Explain jargon in simple words. ${guardrail}`,
};

export function buildMessages(req: AssistantRequest) {
  const parts: string[] = [];

  if (req.tool === "email") {
    parts.push(`Tone: ${req.tone || "Formal"}`);
    parts.push(`Audience: ${req.audience || "Client"}`);
    parts.push(`Write an email based on this context:\n${req.input}`);
  } else if (req.tool === "summary") {
    parts.push(`Summarise these meeting notes:\n${req.input}`);
  } else if (req.tool === "planner") {
    parts.push(
      `Build a structured, prioritised plan from these tasks and constraints:\n${req.input}`,
    );
  } else {
    parts.push(`Research and simplify this topic or text:\n${req.input}`);
  }

  return [
    { role: "system" as const, content: systemPrompts[req.tool] },
    { role: "user" as const, content: parts.join("\n\n") },
  ];
}
