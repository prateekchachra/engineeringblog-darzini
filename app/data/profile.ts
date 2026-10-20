export const profile = {
  name: "Prateek Chachra",
  role: "Senior Software Engineer",
  stack: ["React", "React Native / Expo", "TypeScript", "Node.js"],
  location: "Madrid, Spain",
  email: "prateekchachra@live.com",
  links: {
    github: "https://github.com/prateekchachra",
    linkedin: "https://www.linkedin.com/in/prateek-chachra-3a2030a7/",
    portfolio: "https://prateekchachra.github.io",
    music: "https://www.darzini.com/",
  },
  resume: "/Prateek-Chachra-Resume.pdf",
};

export const metrics = [
  {
    value: "79%",
    label: "faster cold start",
    detail: "608 ms → 127 ms at AILY Labs",
  },
  {
    value: "10+",
    label: "years in production",
    detail: "React Native, React, TypeScript",
  },
  {
    value: "~2,000",
    label: "enterprise users",
    detail: "Pfizer and Moderna apps",
  },
  {
    value: "80%",
    label: "faster feature work",
    detail: "Design system at Taxfix",
  },
];

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  stack: string[];
  highlights: string[];
};

export const roles: Role[] = [
  {
    company: "Melboss Music",
    title: "Performance Marketing",
    location: "Madrid",
    period: "Jul 2026 — Present",
    current: true,
    stack: ["Meta Ads", "Google Ads", "SEO", "GEO"],
    highlights: [
      "Ran Meta and Google performance ad campaigns for artists and for Melboss itself, and recommended product changes for SEO and GEO to attract more B2C and B2B clients.",
      "Grew my own artist project (Darzini) to 20k monthly listeners using Spotify and Meta marketing.",
    ],
  },
  {
    company: "AILY Labs",
    title: "Senior Software Engineer (Full Stack, React Native)",
    location: "Madrid",
    period: "Dec 2023 — Jun 2026",
    stack: ["React Native", "GraphQL", "TypeScript", "Datadog", "Highcharts"],
    highlights: [
      "Cut app startup time from 608 ms to 127 ms — about 79% — through feature-flag caching, state invalidation and a dimension-filter fix.",
      "Part of an 8-person senior mobile core team building 3 React Native apps for enterprise clients including Pfizer and Moderna (~2,000 users), shipping security fixes on a deadline.",
      "Led architectural decisions — GraphQL schema design, SOLID, screaming architecture — for inter-domain communication, and added app-wide caching and failure handling that improved resilience and supported key enterprise sales.",
      "Set up Datadog end to end (tracing, logging, source maps, Session Replay, source code integration) through GitHub Actions, so the team could trace a broken step to the exact line of code.",
      "Fixed a FlashList bug where sticky headers stopped responding to touch events because views were recycled. Shipped an internal patch in a day and raised it with the maintainers, who agreed and fixed it upstream.",
      "Built AI-driven Highcharts visualizations, including prediction sliders, to support end users' decision-making.",
      "Built Claude skills documenting the mobile core's contexts and what each provides (e.g. bookmarks), used by other teams so AI-assisted tasks start with exact context.",
    ],
  },
  {
    company: "Taxfix",
    title: "Full Stack Engineer",
    location: "Madrid",
    period: "Mar 2022 — Aug 2023",
    stack: ["React Native", "Next.js", "Native Modules", "Storybook", "Auth0"],
    highlights: [
      "Part of the team that migrated support from Intercom to Zendesk across 4 apps and tens of thousands of users in 4 months, integrating chat and subscription services.",
      "Owned the end-to-end native chat integration with Zendesk using Native Modules.",
      "Bootstrapped and led the Taxfix Support Center in Next.js, with Auth0 authentication and Framer Motion.",
      "Contributed to the Design System by adding new components and tests (Atomic Design, Jest, Storybook), speeding up development by 80%.",
    ],
  },
  {
    company: "Guru.com",
    title: "Senior React Native Engineer",
    location: "Pittsburgh",
    period: "Apr 2021 — Oct 2021",
    stack: ["React Native", "Expo", "RN Profiler"],
    highlights: [
      "Cut screen load times by 21% via SVG optimization and lazy loading, measured with the React Native Profiler flame graph.",
      "Upgraded Expo 39 to 42 with native module support.",
    ],
  },
  {
    company: "Ayu Health",
    title: "Lead Mobile Engineer",
    location: "Bangalore",
    period: "Apr 2020 — Dec 2020",
    stack: ["React Native", "Twilio", "Firebase"],
    highlights: [
      "Led 2 developers to launch the AyuMitra iOS and Android app, with Twilio video calling and Firebase real-time messaging.",
    ],
  },
  {
    company: "Earlier experience",
    title: "MyScoot · Nucleus Software",
    location: "India",
    period: "2016 — 2020",
    stack: ["Django", "React", "Firebase", "SPNEGO / SSO"],
    highlights: [
      "MyScoot (Full Stack, 2019–20): Django/React website plus a mobile app with Firebase notifications and deep linking.",
      "Nucleus Software (Senior Engineer, 2016–18): 3x faster enterprise login via SPNEGO and REST-based SSO.",
    ],
  },
];

export const skills = [
  {
    group: "Mobile & Frontend",
    items: [
      "React Native (Expo)",
      "Swift / Kotlin (Native Modules)",
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
    ],
  },
  {
    group: "Backend & Data",
    items: [
      "Node.js (Express / Fastify)",
      "GraphQL",
      "PostgreSQL",
      "Python / Django",
    ],
  },
  {
    group: "Tooling",
    items: [
      "Datadog",
      "GitHub Actions",
      "Jest",
      "Playwright",
      "Cypress",
      "Detox",
      "Storybook",
      "Docker",
      "GCP",
    ],
  },
  {
    group: "AI tooling",
    items: ["Claude", "Claude Code", "MCP servers", "Claude skills"],
  },
];

export type Project = {
  name: string;
  repo: string;
  url: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "react-native-audio-effects",
    repo: "prateekchachra/react-native-audio-effects",
    url: "https://github.com/prateekchachra/react-native-audio-effects",
    tagline: "Real-time DSP and plugin-style controls for React Native",
    summary:
      "A native audio library for React Native's New Architecture: load a sound, build an effect chain, and tweak it while it plays. The UI controls are generated from the same parameter definitions the DSP reads, so a knob can never disagree with the effect behind it.",
    highlights: [
      "17 real-time effects — delay, reverb, chorus, flanger, phaser, tremolo, compressor, limiter, noise gate, 4-band parametric EQ, low/high/band-pass filters, gain, pan, distortion and bit crusher.",
      "7 generators — sine, square, saw, triangle and white/pink/brown noise, each with an ADSR envelope and a playable keyboard.",
      "A control kit built for audio: rotary knobs, taper-aware sliders, XY pads, level meters, a waveform view with scrub-to-seek, a MIDI keyboard, A/B preset compare, and an effect rack that builds itself from the schema.",
      "Implemented as a TurboModule on RN 0.88 — Swift and AudioKit on iOS, Kotlin and Klarinet (Oboe) on Android — including working around AudioKit's SPM-only distribution and a Kotlin version clash on the Android side.",
    ],
    stack: ["TurboModule", "Swift / AudioKit", "Kotlin / Oboe", "C++", "TypeScript"],
  },
  {
    name: "CueSync",
    repo: "prateekchachra/CueSync",
    url: "https://github.com/prateekchachra/CueSync",
    tagline: "Two-sided sync licensing app with an AI music supervisor",
    summary:
      "A sync licensing marketplace connecting musicians with music supervisors. Musicians keep a catalog with posters, platform links and sync-rights metadata; supervisors post briefs and review submissions anonymously. Built with Expo and Supabase.",
    highlights: [
      "Agentic sync search: a supervisor describes a scene and the agent returns a ranked, playable shortlist, running a tool loop over search_catalog, get_track, check_clearance and draft_license_request.",
      "The agent runs server-side in a Supabase Edge Function that rejects non-supervisors, so no model API key ever ships inside the app bundle.",
      "Provider-agnostic model layer — Gemini, Claude, or any OpenAI-compatible endpoint — behind one interface, with a CLI, an eval set and tests sharing a single copy of the agent code with the app.",
      "Anonymous submissions (each musician appears as e.g. Artist 877C), role-locked auth, clearance checks on every pick, and silent blocking so supervisors can stop accepting without signalling it.",
    ],
    stack: ["React Native (Expo)", "Supabase", "PostgreSQL", "Edge Functions", "TypeScript"],
  },
];

export const openSource = [
  {
    repo: "callstack/react-native-bottom-tabs",
    contribution: "Android tab badge colours",
    url: "https://github.com/callstack/react-native-bottom-tabs/pull/473",
  },
  {
    repo: "doublesymmetry/react-native-track-player",
    contribution: "Bug fixes",
    url: "https://github.com/doublesymmetry/react-native-track-player/pull/2376",
  },
];

export const education = {
  degree: "B.Tech, Electronics & Communications Engineering",
  school: "Delhi Technological University",
  period: "2012 — 2016",
};

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "B2" },
  { name: "Hindi", level: "Native" },
];
