import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://engineeringblog.darzini.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prateek Chachra — Senior Software Engineer",
    template: "%s · Prateek Chachra",
  },
  description:
    "Senior software engineer with 10+ years in React Native, React and TypeScript. Performance, observability and mobile architecture for enterprise apps.",
  keywords: [
    "React Native",
    "React",
    "TypeScript",
    "Expo",
    "Node.js",
    "GraphQL",
    "Datadog",
    "mobile architecture",
    "Prateek Chachra",
  ],
  authors: [{ name: "Prateek Chachra", url: "https://github.com/prateekchachra" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Prateek Chachra — Engineering",
    title: "Prateek Chachra — Senior Software Engineer",
    description:
      "10+ years in React Native, React and TypeScript. Cut app startup from 608 ms to 127 ms; built Datadog tracing that pinpoints bugs to the exact line.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prateek Chachra — Senior Software Engineer",
    description:
      "10+ years in React Native, React and TypeScript. Performance, observability and mobile architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} grid-backdrop antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
