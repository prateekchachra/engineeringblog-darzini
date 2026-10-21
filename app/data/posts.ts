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
