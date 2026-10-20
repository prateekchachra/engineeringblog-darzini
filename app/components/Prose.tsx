import type { ReactNode } from "react";

/**
 * Typography primitives for long-form posts.
 *
 * Deliberately plain components rather than MDX: posts are written as JSX,
 * so there is no extra toolchain to install and a post can drop a bespoke
 * element (a comparison table, a measured-numbers callout) inline without
 * a plugin.
 */

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-14 mb-4 scroll-mt-20">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-10 mb-3">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] sm:text-base text-muted leading-[1.75] mb-5">{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed mb-8">{children}</p>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="space-y-2.5 mb-6">{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] sm:text-base text-muted leading-[1.7]">
      <span className="text-accent/60 mt-[9px] shrink-0 w-1 h-1 rounded-full bg-current" />
      <span>{children}</span>
    </li>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
    >
      {children}
    </a>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-surface-2 border border-edge text-foreground/90">
      {children}
    </code>
  );
}

/** A fenced code block. Scrolls horizontally rather than widening the page. */
export function Pre({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-edge bg-surface overflow-hidden">
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono text-foreground/85">
        {children}
      </pre>
    </div>
  );
}

/** Pulled-out measurement or claim worth not burying in a paragraph. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border-l-2 border-accent bg-surface/60 px-5 py-4">
      <div className="text-[15px] text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}

export function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mb-8">
      {children}
      <figcaption className="mt-2.5 font-mono text-[11px] text-faint text-center">
        {caption}
      </figcaption>
    </figure>
  );
}
