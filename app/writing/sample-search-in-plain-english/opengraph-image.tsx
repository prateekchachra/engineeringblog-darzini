import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "../../og";
import { getPost } from "../../data/posts";

const post = getPost("sample-search-in-plain-english")!;

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderCard({
    title: post.title,
    byline: "Prateek Chachra · Senior Software Engineer",
  });
}
