# engineeringblog.darzini.com

Engineering profile and blog for Prateek Chachra — a standalone [Next.js](https://nextjs.org) app,
deployed separately from the main [darzini.com](https://www.darzini.com) site.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Profile content lives in one place — [`app/data/profile.ts`](app/data/profile.ts). Edit that file to
update roles, metrics, skills, open-source links, education and languages. `app/page.tsx` only
handles layout.

The downloadable résumé is [`public/Prateek-Chachra-Resume.pdf`](public/Prateek-Chachra-Resume.pdf).
Replace that file to publish a new version; the download button picks it up automatically.

## Deployment

Deploy as its own Vercel project, then point the subdomain at it:

1. Import this repo into Vercel as a new project.
2. In **Project → Settings → Domains**, add `engineeringblog.darzini.com`.
3. At the registrar holding `darzini.com` DNS, add the `CNAME` record Vercel shows
   (host `engineeringblog`, value `cname.vercel-dns.com`).
4. Wait for DNS to propagate and for Vercel to issue the TLS certificate.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4
