# Vertex EV Hub

Website for Vertex EV Hub Limited (ACOB Group) — EV charging for Nigeria: public charging, fleet & business
charging, and hosted chargers. Sister site: Vertex Electric Solutions (EVs and home chargers).

Next.js 16 (App Router, Cache Components) · React 19 · Tailwind v4 · Motion · shadcn/ui · Resend.
The design system in `src/ui` is shared with the Vertex Electric site, retinted orange in `src/ui/tokens.css`.

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local`. Contact channels left blank are hidden; forms show an honest
"not set up yet" message until the Resend variables are set.

**Placeholders:** `src/ui/brand/logo.tsx` and `src/app/icon.svg` are a redrawn stand-in until the official
EV Hub logo file is supplied.
