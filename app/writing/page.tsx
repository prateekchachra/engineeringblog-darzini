import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "../data/posts";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering posts on React Native, audio, performance and observability by Prateek Chachra.",
};

export default function WritingIndex() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-edge bg-background/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm text-foreground hover:text-accent transition-colors"
          >
            prateek<span className="text-accent">.</span>chachra
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
              ← Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 pb-20">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Writing</h1>
        <p className="text-muted mb-12">
          Notes on React Native, audio engineering, performance and observability.
        </p>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group block bg-surface border border-edge rounded-xl p-6 hover:border-accent/40 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3 font-mono text-xs text-faint">
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors leading-snug mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 rounded border border-edge bg-surface-2 text-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
