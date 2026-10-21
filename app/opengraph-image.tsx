import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "./og";

export const alt = "Prateek Chachra, Senior Software Engineer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderCard({
    title: "Prateek Chachra",
    byline: "Senior Software Engineer · React Native · TypeScript · Audio",
  });
}
