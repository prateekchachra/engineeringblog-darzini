export type Post = {
  slug: string;
  title: string;
  /** Shown under the title on the post, and as the card summary on the index. */
  excerpt: string;
  /** ISO date, used for sorting and the <time> element. */
  date: string;
  /** Human-readable date. Kept explicit so no Date() runs during prerender. */
  dateLabel: string;
  readingTime: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "which-oscillator-to-reach-for",
    title: "Which oscillator to reach for, and the records that made each one famous",
    excerpt:
      "Sine, triangle, square, saw, noise. The difference between them is only which harmonics they contain, and that one fact decides which to pick. Plus the iconic sounds each one built, from the DX7 to the NES to acid house, and why a perfect sawtooth is impossible on a computer.",
    date: "2026-11-01",
    dateLabel: "1 November 2026",
    readingTime: "12 min read",
    tags: ["Audio", "Synthesis", "DSP", "Sound design"],
  },
  {
    slug: "what-audio-effects-actually-do",
    title: "What audio effects actually do, and what you could build with them",
    excerpt:
      "Reverb, delay, chorus, compression. You have heard all of them thousands of times without knowing the names. Here is what each one is really doing, explained without the studio jargon, plus five things you could build on a phone with them.",
    date: "2026-10-25",
    dateLabel: "25 October 2026",
    readingTime: "11 min read",
    tags: ["Audio", "DSP", "React Native", "App ideas"],
  },
  {
    slug: "sample-search-in-plain-english",
    title: "Finding samples in plain English, and why the model is the easy part",
    excerpt:
      "Splice just shipped an MCP server that lets Claude search their catalog. I was building the same idea into a React Native audio library at the same time, without an API key. The language model turned out to be the least interesting part of it.",
    date: "2026-10-20",
    dateLabel: "20 October 2026",
    readingTime: "9 min read",
    tags: ["React Native", "Audio", "Agents", "Retrieval"],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
