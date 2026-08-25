import type { ReactNode } from "react";

export function Page({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{title}</h1>
      {lead ? <p className="mt-4 text-lg text-muted-foreground">{lead}</p> : null}
      <div className="rule-ink mt-8" />
      <div className="mt-10 space-y-12">{children}</div>
    </div>
  );
}

export function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ink-soft">{heading}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function PlaceholderTag() {
  return (
    <span className="inline-block rounded border border-ink px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink">
      Placeholder — replace
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground">
      {children}
    </span>
  );
}
