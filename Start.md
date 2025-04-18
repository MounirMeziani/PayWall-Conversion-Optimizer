
```cursor
You are an elite full‑stack AI engineer.  
Generate a turnkey GitHub repo called **Paywall‑Conversion‑In‑A‑Box** that lets any SaaS founder drop‑in a dynamic, A/B‑tested paywall and track the $$$ roll in.

────────────────────────────────────────
🔥 Core Spec
────────────────────────────────────────
1. Two responsive Tailwind paywall templates  
   • Layout A: “Starter vs Pro” toggles  
   • Layout B: Content‑gate overlay with blur

2. Copy Variants  
   • JSON‑driven headline / sub‑copy permutations  
   • 1‑click hot‑swap for live tests

3. Traffic Split Snippet  
   • Tiny <2 KB JS tag (`/paywall-split.js`) powered by Split.js  
   • Cookie‑based bucketing (A/B/C/…N) with 7% performance overhead max

4. Stripe Revenue Dashboard  
   • Serverless (Next.js API routes) pulling `stripe.events`  
   • Metrics: Paywall ✔‑Rate, AOV, MRR delta  
   • Plotly charts + a looping GIF waterfall “+$6.3 k/mo”

5. Revenue Waterfall  
   • Stacked bar showing MRR adds, churn & expansion  
   • Auto‑generates GIF every 24 h via a GitHub Action

6. Extras (make it pop)  
   • Dark 🌒 / Light ☀️ toggle  
   • Slack + Discord webhooks for “💸 New conversion” pings  
   • `.env.example` with all keys stubbed  
   • Vercel + Netlify one‑click deploy badges  
   • 7k‑11k RPS load‑test report in `/bench/README.md`  
   • Storybook for paywall components  
   • MIT license, CODEOWNERS & Contributing guide

────────────────────────────────────────
🗂️ Desired Folder Layout
────────────────────────────────────────
/
├─ apps/
│  ├─ paywall-site/         # Next.js 13 (app‑router, TS, Tailwind)
│  └─ api/                  # Stand‑alone Express server for Stripe webhooks
├─ packages/
│  ├─ split‑engine/         # Tiny A/B allocator (TS)
│  └─ ui/                   # Re‑export Tailwind components
├─ scripts/
│  ├─ create‑gif.js         # Node CLI to render Plotly → GIF
│  └─ seed‑variants.ts
├─ .github/
│  ├─ workflows/ci.yml
│  └─ ISSUE_TEMPLATE.md
└─ README.md                # Badges, GIF demo & quick‑start

────────────────────────────────────────
💡 Implementation Notes
────────────────────────────────────────
• TypeScript everywhere (strict).  
• Prisma + SQLite dev → Postgres prod.  
• Zod runtime schemas for API safety.  
• Write unit tests with Vitest; 90% + coverage gate.  
• Keep all dependencies under 2024‑04 stable versions.

────────────────────────────────────────
✅ Deliverables
────────────────────────────────────────
1. All source code + lockfiles ready to `pnpm i && pnpm dev`.  
2. GIF under `public/demo-waterfall.gif`.  
3. Rich README: screens, code‑snippets, badges, emoji section headers.  
4. A `docs/00‑pitch.md` elevator pitch (<200 words) for investors.  

Generate the entire repository now.
```
