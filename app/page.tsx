import Link from "next/link";
import AudioEffectsLogo from "./components/AudioEffectsLogo";
import { posts } from "./data/posts";
import {
  profile,
  metrics,
  roles,
  featuredProject,
  projects,
  skills,
  openSource,
  education,
  languages,
} from "./data/profile";

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-8">
      <span className="font-mono text-xs text-accent tracking-widest">{index}</span>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      <span className="flex-1 h-px bg-edge ml-2" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-edge bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <a href="#top" className="font-mono text-sm text-foreground hover:text-accent transition-colors">
            prateek<span className="text-accent">.</span>chachra
          </a>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <a href="#experience" className="hidden sm:inline text-muted hover:text-foreground transition-colors">
              Experience
            </a>
            <a href="#projects" className="hidden sm:inline text-muted hover:text-foreground transition-colors">
              Projects
            </a>
            <Link href="/writing" className="text-muted hover:text-foreground transition-colors">
              Writing
            </Link>
            <a href="#skills" className="hidden md:inline text-muted hover:text-foreground transition-colors">
              Skills
            </a>
            <a href="#open-source" className="hidden md:inline text-muted hover:text-foreground transition-colors">
              Open source
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
            >
              <GitHubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Hero */}
        <section className="pt-16 sm:pt-24 pb-14">
          <p className="font-mono text-xs text-accent tracking-widest mb-5">
            {profile.location.toUpperCase()} · OPEN TO WORK
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl text-muted mb-6">
            {profile.role} —{" "}
            <span className="accent-text font-semibold">{profile.stack.join(" · ")}</span>
          </p>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-4">
            Senior engineer with 10+ years in React Native, React and TypeScript. I cut app
            startup time by 79% — from 608 ms to 127 ms — and built Datadog tracing that
            pinpoints bugs to the exact line, on apps for enterprise clients including{" "}
            <strong className="text-foreground font-medium">Pfizer</strong> and{" "}
            <strong className="text-foreground font-medium">Moderna</strong>.
          </p>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-4">
            Right now I&apos;m building{" "}
            <a
              href={featuredProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
            >
              react-native-audio-effects
            </a>{" "}
            — a TurboModule bringing real-time DSP and plugin-style controls to React
            Native&apos;s New Architecture, with 17 effects and 7 generators running on
            AudioKit and Oboe.
          </p>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-9">
            I&apos;m also an independent artist —{" "}
            <a
              href={profile.links.music}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
            >
              Darzini
            </a>{" "}
            — releasing music independently, and a speaker at Primavera Pro 2026 on AI and
            music. Based in Madrid, relocating to Amsterdam; requires visa sponsorship.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent-2 text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <DownloadIcon />
              Download résumé (PDF)
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-edge text-foreground font-medium text-sm hover:bg-surface-2 transition-colors"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-edge text-foreground font-medium text-sm hover:bg-surface-2 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-edge text-foreground font-medium text-sm hover:bg-surface-2 transition-colors"
            >
              Email
            </a>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-edge border border-edge rounded-xl overflow-hidden mb-20">
          {metrics.map((m) => (
            <div key={m.label} className="bg-surface p-5">
              <p className="text-2xl sm:text-3xl font-bold accent-text">{m.value}</p>
              <p className="text-sm text-foreground mt-1">{m.label}</p>
              <p className="font-mono text-[11px] text-faint mt-1.5 leading-snug">{m.detail}</p>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-20 mb-20">
          <SectionHeading index="01" title="Experience" />
          <div className="space-y-10">
            {roles.map((role) => (
              <article key={role.company} className="relative pl-6 sm:pl-8">
                <span
                  className={`absolute left-0 top-2 w-2.5 h-2.5 rounded-full ${
                    role.current ? "bg-accent" : "bg-edge ring-2 ring-surface"
                  }`}
                />
                <span className="absolute left-[4.5px] top-6 bottom-[-2.5rem] w-px bg-edge last:hidden" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {role.company}
                    <span className="text-faint font-normal"> · {role.location}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint whitespace-nowrap">
                    {role.period}
                  </span>
                </div>
                <p className="text-sm text-accent mb-3">{role.title}</p>

                <ul className="space-y-2 mb-4">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                      <span className="text-accent/50 mt-[7px] shrink-0 w-1 h-1 rounded-full bg-current" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {role.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2 py-0.5 rounded border border-edge bg-surface text-faint"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 mb-20">
          <SectionHeading index="02" title="Personal projects" />

          {/* Featured — the one currently in active development. */}
          <article className="relative bg-gradient-to-br from-surface-2 to-surface border border-accent-3/40 rounded-2xl p-6 sm:p-8 mb-5 overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-3/15 blur-3xl"
            />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent text-xs font-medium">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
                  </span>
                  {featuredProject.status}
                </span>
                {featuredProject.version && (
                  <span className="font-mono text-[11px] text-faint">
                    {featuredProject.version}
                  </span>
                )}
              </div>

              <AudioEffectsLogo className="w-full max-w-[320px] h-auto text-foreground mb-6" />

              <p className="text-base sm:text-lg text-foreground font-medium mb-3">
                {featuredProject.tagline}
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed mb-6 max-w-2xl">
                {featuredProject.summary}
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                {featuredProject.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                    <span className="text-accent/60 mt-[7px] shrink-0 w-1 h-1 rounded-full bg-current" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {featuredProject.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-2 py-0.5 rounded border border-edge bg-surface-2 text-faint"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent-2 text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  <GitHubIcon />
                  View on GitHub
                </a>
                {featuredProject.docsUrl && (
                  <a
                    href={featuredProject.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-edge text-foreground font-medium text-sm hover:bg-surface-2 transition-colors"
                  >
                    API reference
                  </a>
                )}
                {featuredProject.npmUrl && (
                  <a
                    href={featuredProject.npmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-edge text-foreground font-medium text-sm hover:bg-surface-2 transition-colors"
                  >
                    npm
                  </a>
                )}
              </div>
            </div>
          </article>

          <div className="space-y-5">
            {projects.map((project) => (
              <article
                key={project.repo}
                className="bg-surface border border-edge rounded-xl p-6 hover:border-accent/40 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-mono text-base sm:text-lg text-foreground font-medium break-words">
                      {project.name}
                    </h3>
                    <p className="text-sm text-accent mt-1">{project.tagline}</p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border border-edge bg-surface-2 text-xs font-medium text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                  >
                    <GitHubIcon />
                    View source
                    <ArrowIcon />
                  </a>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4">{project.summary}</p>

                <ul className="space-y-2 mb-4">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                      <span className="text-accent/50 mt-[7px] shrink-0 w-1 h-1 rounded-full bg-current" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2 py-0.5 rounded border border-edge bg-surface-2 text-faint"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-20 mb-20">
          <SectionHeading index="03" title="Technical skills" />
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((group) => (
              <div
                key={group.group}
                className="bg-surface border border-edge rounded-xl p-5"
              >
                <h3 className="font-mono text-xs text-accent tracking-wider mb-3">
                  {group.group.toUpperCase()}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-2.5 py-1 rounded-md bg-surface-2 border border-edge text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open source */}
        <section id="open-source" className="scroll-mt-20 mb-20">
          <SectionHeading index="04" title="Open source" />
          <div className="space-y-3">
            {openSource.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 bg-surface border border-edge rounded-xl p-4 hover:border-accent/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-mono text-sm text-foreground group-hover:text-accent transition-colors truncate">
                    {item.repo}
                  </p>
                  <p className="text-sm text-faint mt-0.5">{item.contribution}</p>
                </div>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </section>

        {/* Writing */}
        <section id="writing" className="scroll-mt-20 mb-20">
          <SectionHeading index="05" title="Writing" />
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="group block bg-surface border border-edge rounded-xl p-5 hover:border-accent/40 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2 font-mono text-xs text-faint">
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-accent transition-colors leading-snug mb-1.5">
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted hover:text-accent transition-colors"
          >
            All writing
            <ArrowIcon />
          </Link>
        </section>

        {/* Education & languages */}
        <section className="mb-20">
          <SectionHeading index="06" title="Education & languages" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface border border-edge rounded-xl p-5">
              <h3 className="font-mono text-xs text-accent tracking-wider mb-3">EDUCATION</h3>
              <p className="text-foreground text-sm font-medium">{education.degree}</p>
              <p className="text-muted text-sm mt-1">{education.school}</p>
              <p className="font-mono text-xs text-faint mt-1.5">{education.period}</p>
            </div>
            <div className="bg-surface border border-edge rounded-xl p-5">
              <h3 className="font-mono text-xs text-accent tracking-wider mb-3">LANGUAGES</h3>
              <ul className="space-y-1.5">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between text-sm">
                    <span className="text-foreground">{l.name}</span>
                    <span className="text-faint font-mono text-xs">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-surface-2 to-surface border border-accent/25 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Let&apos;s build something</h2>
            <p className="text-muted mb-6 max-w-lg mx-auto text-sm sm:text-base">
              Open to senior and lead engineering roles. The full résumé has the detail —
              or just send me a note.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent-2 text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <DownloadIcon />
                Download résumé
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-edge text-foreground font-medium text-sm hover:bg-surface-2 transition-colors"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-edge">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-faint">
            © 2026 {profile.name}
          </p>
          <div className="flex gap-5 text-sm">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.music}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
            >
              Music
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-faint group-hover:text-accent transition-colors"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
