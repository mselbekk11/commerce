I am through to the next round of interviews with Vercel - its for a sales engineer role. its a technical take home assignment. here is the brief:

Hi Morgan,

Thank you for your interest in the Sales Engineer role! We're excited to connect you with more of the team in this next round of interviews. Please see the expected calls below and the attached prompt:
Technical Skills Assessment: Please develop an application and deploy it on Vercel. This app will be used to demo your knowledge of the Vercel platform, so use as many Vercel/Next features as needed to aid your demo. Put particular focus on front-end performance, using appropriate Next.js rendering strategies, while also demonstrating your technical strengths. This should typically be a new project specifically built for this stage of the interview, but if you’ve built something suitable within the past 1-2 months, please let us know and we can consider using that as well. If you’re looking for a good starting point, feel free to use our Vercel Commerce 2.0 template.
Time Allotment: Please submit this in 3-7 days, or let us know if you need more time. Include Cassidy Nguyen (cassidy.nguyen@vercel.com), Caitlin Gilly (caitlin.gilly@vercel.com), and Jason Wiker (jason.wiker@vercel.com) if you are emailing your submission.
Technical Deep Dive (30min): In this interview, you’ll have a one-on-one conversation with a team member to walk us through your project. We’re interested in how you built and deployed your application, why you chose your tech stack, how you applied Next.js rendering strategies for performance, the Vercel-specific differentiators you included, and how your experience compares to other platforms.
Please let us know when you are available by selecting some availability blocks at this calendar link.

We look forward to seeing your technical skills in action. If you have any questions, feel free to reach out!

Kind Regards,
Cassidy

We strive to provide a great experience for every candidate at Vercel, and offer accommodations to our applicants with disabilities to allow them to participate fully in the process. If you need an accommodation to participate in our interview process, please let your recruiting coordinator know so we can best meet your needs.

they have provided me the option of using one of their ecommerce boilerplates to work from. Do you think i should use that? Can you 

1. write me a list of all the things you think i need to include in regards to this part of the brief: This app will be used to demo your knowledge of the Vercel platform, so use as many Vercel/Next features as needed to aid your demo. Put particular focus on front-end performance, using appropriate Next.js rendering strategies, while also demonstrating your technical strengths.

2. Do you think i should use the ecommerce boilerplate - and if so what are some ideas of how i can build out features that cover the topiccs they want me display mentioned in point 1? Also what are some cool AI features i could build to impress

3. if you dont think i should use that template - what are some good project ideas that display evrything i need to show from point 1

4. overall thoughts and strategy you think i should take 
ChatGPT said:
Thought for 9s

Congrats on making it to the next round! For a Sales Engineer take-home, you want a tight, polished demo that (a) showcases Next.js rendering strategies for performance and (b) highlights Vercel-native differentiators you’d actually talk through live.

Below is a battle-tested plan you can execute quickly, plus concrete ideas whether you start from Vercel Commerce 2.0 or build something custom.

1) What to include (feature checklist for the brief)
Rendering strategies & performance

Hybrid rendering across routes

Static (SSG) for marketing/PLP pages with per-route revalidate.

ISR + revalidateTag/revalidatePath to incrementally update product/news data.

SSR (RSC) for highly dynamic PDP/cart/pricing pages.

Streaming SSR + Suspense with partial hydration for fast TTFB and progressive data.

Edge + Node placement

Edge Runtime (route handlers) for personalization, geo, A/B, and low-latency reads.

Node (serverless) for heavier operations (e.g., 3rd-party SDKs not edge-compatible).

Server Actions for form mutations (cart, checkout, wishlist) with optimistic UI.

Caching

Proper Cache-Control on static assets, data cache w/ tags, router prefetch.

SWr or React cache where appropriate; no-store for sensitive responses.

Resource loading

next/image with responsive sizes; next/font (self-hosted) for CLS control.

next/script with strategy="lazyOnload" for non-critical third-party scripts.

Preload critical routes/assets; avoid waterfall (audit with Lighthouse).

Routing features

Parallel/Intercepted routes (e.g., quick-view modal over list).

Route groups to keep layouts clean; loading/error UI states per route.

Meta & SEO

generateMetadata, sitemap/robots route handlers.

Dynamic OG image generation for products/articles.

Quality gates

Lighthouse targets (90+), Web Vitals monitoring, Core Web Vitals friendly UX.

Vercel platform differentiators to show

Edge Middleware: geo/IP-based personalization, A/B tests, bot blocking, i18n routing.

Vercel Analytics + Speed Insights: show RUM & CWV improvements + deploy comparisons.

Vercel Storage: pick at least one (KV for session/cart; Postgres for catalog/orders; Blob for images/user uploads).

Vercel AI SDK: AI product expert / semantic search / image captioning.

Webhooks + Revalidation: content or inventory update triggers ISR via route handlers.

Previews & Envs: use Preview Deployments, env separation, and protect preview.

Edge Config: feature flags, country-specific toggles without redeploys.

Cron & Queues (optional): nightly feeds, email digests, or background jobs.

Observability: logs, function regions, cold start avoidance via Edge, bundle analysis.

2) Should you use the e-commerce boilerplate? (Yes—here’s how to extend it)

Short answer: Yes. It gives you a credible, familiar domain and frees time to demonstrate rendering strategies + Vercel features rather than scaffolding.

Feature ideas to add on top of Commerce 2.0

Rendering strategy matrix

Home & category (SSG + ISR) with revalidate=60 and tagged revalidation when inventory changes.

Product page (streaming SSR): hero + key facts render immediately; reviews/specs stream in via Suspense.

Search page (Edge): instant search suggestions via Edge runtime + KV cache.

Edge Middleware

Geo-aware banners (e.g., “Free 1-day shipping in SF”) and currency selection.

A/B test a hero layout or checkout CTA via Edge Config flags.

Performance polish

Replace any non-critical scripts with next/script (lazy).

next/image everywhere with sizes, correct priority only on LCP image.

Self-hosted next/font to improve CLS; preload above-the-fold font.

Data & invalidation

When a webhook (mock CMS or admin page) fires → revalidateTag('products') to refresh PLPs/PDPs.

AI features (impressive but scoped)

AI Product Expert (Vercel AI SDK): ask natural questions on any PDP; grounding via product specs in Postgres/Blob. Show streaming responses.

Semantic search: embed product descriptions at build time or on first request; vector search (pgvector or approximate search in KV) to power “find similar”.

Image captioner for UGC: upload to Blob → generate alt text → improves accessibility/SEO.

DX & platform

Preview URLs auto-posted in PRs; demo how reviewers see perf diffs in Speed Insights.

Regions: run search suggestions at the Edge, admin heavy routes on Node.

Feature flags via Edge Config (toggle AI assistant on/off per country).

3) If not the template, strong alternative project ideas

Pick one concept where rendering mode choices are obvious and Edge adds value:

“Global Deals Finder”

Home (SSG+ISR), City page (Edge-personalized), Deal page (streaming SSR).

Edge Middleware: geolocation → local currency & language.

AI: “Explain this deal’s value” or “Help me plan a weekend around this deal”.

Storage: KV (session), Postgres (deals), Blob (images). Webhooks to revalidate.

“Docs + Playground” (Headless CMS)

Docs (SSG+ISR) with on-demand revalidation via CMS webhook.

Interactive examples (Edge) that run low-latency code samples.

AI: semantic doc Q&A grounded to your pages; dynamic OG for each doc.

“Personalized Content Hub”

News/PLP (ISG), Article/PDP (streaming SSR).

Edge A/B and geo banners; feature flags via Edge Config.

AI summarizer; semantic related-content; Blob for user uploads.

All three naturally hit rendering strategy, Edge, caching, revalidation, analytics, AI, and storage.

4) Overall strategy & how to present it
Scope & narrative

Choose one narrative: “We’re building a high-performance storefront with global personalization.”

Limit to 5–7 marquee features you can demo crisply; depth beats breadth.

Build plan (3–4 days of focused work)

Day 1 – Scaffold + data model

Start with Commerce template (or minimal custom). Set Vercel KV/Postgres/Blob.

Ship Home/Category (SSG+ISR) and PDP (streaming SSR).

Day 2 – Edge + AI

Add Edge Middleware (geo banner, currency, A/B).

Wire AI Product Expert (Vercel AI SDK) with streaming & grounding.

Day 3 – Revalidation + polish

Webhook to revalidateTag on inventory/content change.

next/image, next/font, next/script optimizations, Lighthouse 90+.

Dynamic OG per product. Add Speed Insights and Analytics.

Bonus (if time) – Edge Config flags, Cron/Queues, admin micro-page.

Demo checklist (30-minute deep dive)

Architecture slide: which routes are SSG/ISR/SSR/Edge and why.

Live perf: show Speed Insights and Web Vitals deltas; explain LCP/CLS/TTFB improvements.

Edge Middleware: toggle locale or run a quick A/B.

Revalidation: trigger a webhook; show PLP/PDP refreshing via revalidateTag.

AI: ask a complex product question; show streamed answer with cited data.

Code tour: app/ layouts with parallel routes, route handlers, server actions, cache tags, runtime configs.

Vercel value: Previews, regions, storage, logs, zero-config image/font/edge optimizations.

Common pitfalls to avoid

Over-clientifying components; keep RSC first with minimal use client islands.

Long blocking SSR without streaming.

Missing cache headers / tag strategy.

Huge images, unoptimized fonts, or 3rd-party scripts loading eagerly.

Shipping unscoped AI (slow, ungrounded). Keep it fast and helpful.

TL;DR recommendation

Use the Commerce template and layer in:

SSG/ISR on PLPs, streaming SSR on PDPs

Edge Middleware for geo & A/B + Edge Config flags

Vercel Storage (KV/Postgres/Blob)

AI Product Expert (Vercel AI SDK) with streaming + grounding

Webhooks → revalidateTag

next/image, next/font, next/script for perf

Analytics + Speed Insights for proof

Prepare a tight demo script that maps each feature back to performance and Vercel’s Edge advantage.

If you want, I can draft the exact file tree, the routes to mark Edge vs Node, code snippets for Middleware/AI Server Actions/revalidation webhooks, and a demo run-of-show you can read verbatim.