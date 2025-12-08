# Stage 2: Mock Customer Intro Call - Preparation Guide

**Interview:** Thursday at 12:30 (48 hours away)
**Panelists:** Matt Jared (SE Manager) + Miguel Caballero (Senior SE)
**Format:** 60-minute mock customer intro call with discovery + demo
**Prospect Role:** Frontend engineers & product managers at selected company

---

## RECOMMENDATION: Choose Nike.com

**Why Nike over the others:**
- **Your ecommerce background:** Strong credibility discussing ecommerce at scale
- **Complex use case:** Nike has performance challenges you can address (large catalog, global traffic, personalization)
- **Better storytelling:** "Nike needs to serve millions globally during product drops with zero downtime"
- **Familiar brand:** Easier to research pain points and business goals
- **Technical depth:** You can discuss inventory sync, real-time updates, variant handling (sizes/colors)

**Alternative:** Your property rental site (Airbnb-style) if it's truly production-ready and visually impressive

---

## Meeting Structure (60 minutes)

### Phase 1: Opening & Rapport (3 minutes)

**Script:**
> "Thanks for taking the time today. I'm Morgan, a Solutions Engineer at Vercel. Before we dive in, I want to make sure we make the best use of your time. I've done some research on Nike's digital presence, but I'd love to hear directly from you about your priorities and challenges. Does that sound good?"

**Why this works:**
- Establishes you as consultative, not salesy
- Shows you've prepared (researched them)
- Immediately shifts to discovery mode

---

### Phase 2: Discovery Questions (12-15 minutes)

**Critical:** This makes or breaks the call. Ask open-ended questions, actively listen, take visible notes.

#### Section A: Current State & Tech Stack (4-5 min)

**Q1:** "Can you walk me through your current frontend architecture? What framework and hosting are you using?"
- **Listen for:** React/Angular/Vue, AWS/Azure/custom servers, monolith vs. microservices
- **Follow-up:** "How long have you been on that stack? Any pain points you've encountered?"

**Q2:** "How does your deployment process work today? From code commit to production?"
- **Listen for:** Manual deploys, long build times, DevOps bottlenecks, lack of preview environments
- **Follow-up:** "How long does a typical deployment take? Any recent incidents?"

**Q3:** "Can you tell me about your development team structure? How many frontend engineers, and how do they collaborate?"
- **Listen for:** Team size, seniority mix, cross-functional vs. siloed, remote vs. co-located
- **Follow-up:** "What's the biggest blocker to their velocity right now?"

#### Section B: Pain Points & Challenges (4-5 min)

**Q4:** "What are the top 3 technical challenges you're facing with your current website?"
- **Listen for:** Performance issues, SEO problems, slow time-to-market, infrastructure costs, scalability
- **Probe deeper:** "Can you give me a specific example? How is this impacting the business?"

**Q5:** "How is your site's performance today? Have you measured Core Web Vitals or conversion impact?"
- **Listen for:** Slow load times, high bounce rates, failed Google PageSpeed scores
- **Follow-up:** "Do you have data on how performance affects conversion rates for Nike?"

**Q6:** "When you launch a new product or run a major campaign (like a shoe drop), what happens to your infrastructure? Any issues with traffic spikes?"
- **Listen for:** Crashes, slow loads during peak traffic, over-provisioning costs
- **Follow-up:** "How do you currently handle scaling? Manual or auto-scaling?"

#### Section C: Business Goals & Priorities (4-5 min)

**Q7:** "What are your top business priorities for the next 6-12 months? What does success look like?"
- **Listen for:** Revenue growth, international expansion, mobile conversion, faster feature launches
- **Follow-up:** "How do you measure success? What KPIs matter most?"

**Q8:** "Are there any new features or experiences you want to build but can't with your current stack?"
- **Listen for:** Personalization, AI features, A/B testing, real-time inventory, internationalization
- **Follow-up:** "What's blocking you from building that today?"

**Q9:** "From a developer experience perspective, what would make your team more productive?"
- **Listen for:** Faster builds, better local dev, easier testing, less infrastructure management
- **Follow-up:** "If you could wave a magic wand and fix one thing about your workflow, what would it be?"

#### Discovery Notes Template (Write these down during the call)

**Current State:**
- Tech stack: [framework, hosting, CMS]
- Team size: [number of FE engineers]
- Deploy process: [manual/automated, duration]

**Pain Points:**
- Performance: [specific metrics or complaints]
- Scalability: [traffic spikes, infrastructure issues]
- Developer velocity: [build times, deployment friction]

**Goals:**
- Business: [revenue, conversion, global expansion]
- Technical: [new features, modernization]
- Team: [productivity improvements]

---

### Phase 3: Vercel Introduction & Value Prop (8-10 minutes)

**Transition statement:**
> "Thanks for sharing all that context. Based on what you've told me about [their #1 pain point] and your goals around [their #1 goal], I think Vercel could be a great fit. Let me give you a quick overview of what we do, and then I'll show you how it specifically addresses what you mentioned."

#### 3A: What is Vercel? (2-3 min)

**Script:**
> "Vercel is a frontend cloud platform purpose-built for modern web applications. We're the creators of Next.js, which powers some of the world's fastest websites like Nike, Target, TikTok, and Notion.
>
> At a high level, Vercel gives you three things:
>
> **1. Best-in-class Developer Experience**
> Your team connects a Git repo, and deployments happen automatically on every push. Every pull request gets a unique preview URL that your PMs and designers can review before merging. No Docker, no Kubernetes, no infrastructure headaches.
>
> **2. Global Edge Network for Performance**
> Your site is deployed to 100+ edge locations globally. Users in Tokyo, London, and New York all get sub-second load times. We handle caching, CDN, image optimization, and scaling automatically.
>
> **3. Advanced Frontend Features**
> Features like Incremental Static Regeneration, Edge Middleware, and Server Components give you the performance of a static site with the flexibility of dynamic content. You can build personalized experiences without sacrificing speed.
>
> The result? Faster page loads, happier developers, and higher conversion rates."

#### 3B: Map to Their Pain Points (3-4 min)

**Now connect YOUR research to THEIR pain points. Example:**

**If they said:** "Our builds take 45 minutes and block deployments"
**You say:**
> "You mentioned build times are a major bottleneck. Vercel's approach is different. Instead of rebuilding your entire site on every deploy, we use Incremental Static Regeneration. Pages are generated on-demand and cached globally. When Nike updates a product, only that page revalidates - the rest stay cached. This means deploys finish in seconds, not 45 minutes."

**If they said:** "We crash during product drops with high traffic"
**You say:**
> "The traffic spike issue you mentioned is exactly what our edge network solves. When Nike drops a new shoe, Vercel automatically scales across our global CDN. There's no manual provisioning or over-provisioning costs. We've handled customers going from 10K to 10M concurrent users without any intervention."

**If they said:** "We want to add personalization but it kills performance"
**You say:**
> "The personalization challenge is a perfect use case for Next.js Server Components. You can personalize content server-side - no client-side JavaScript, no layout shift, instant rendering. I'll show you an example in the demo."

#### 3C: Social Proof (1-2 min)

**Script:**
> "You're not alone in these challenges. We work with companies like Target, Sonos, and Under Armour who faced similar issues:
> - **Target** reduced page load times by 40% and saw a measurable conversion lift
> - **Sonos** cut their infrastructure team's time on DevOps by 50%
> - **Under Armour** ships features 3x faster with preview deployments
>
> For ecommerce specifically, we've seen customers increase conversion by 1-3% just from performance improvements alone."

**Key:** Always tie it back to THEIR business. "For Nike's scale, a 1% conversion lift could mean $X million in additional revenue."

---

### Phase 4: Live Demo (20-25 minutes)

**Transition:**
> "Let me show you how this works in practice. I'm going to demo with an ecommerce store I built using Vercel and Next.js. I'll focus on the areas you mentioned: [performance/deployment/developer experience]."

#### Demo Flow

**Demo Website Options:**
1. **Your Next.js Commerce project** (recommended if production-ready)
2. **Your property rental site** (if similar quality)
3. **Modified Vercel template** (fallback - customize a [Vercel template](https://vercel.com/templates) quickly)

**IMPORTANT:** Don't build something complex from scratch. Use what you have or lightly modify an existing project to highlight key points.

#### Demo Section 1: Developer Experience (5-7 min)

**What to show:**

**A. Git Integration & Instant Deploys**
- Show your GitHub repo connected to Vercel dashboard
- Point out automatic deployments on every commit
- Show deployment history with timestamps (deploy in <1 minute)

**Script:**
> "Here's the Nike team's workflow with Vercel. Engineer pushes code to GitHub, Vercel detects the change and deploys automatically. The entire build and deploy finishes in under 90 seconds - no manual steps, no waiting for DevOps."

**B. Preview Deployments**
- Show a pull request with a unique preview URL
- Click the URL to show the preview site
- Explain how PMs/designers can review before merge

**Script:**
> "Every pull request gets a unique URL like `nike-redesign-pr-42.vercel.app`. Your product managers can review the exact changes in production-like environment before merging. This eliminates 'works on my machine' issues and speeds up feedback loops."

**C. Environment Variables & Integrations**
- Show environment variable management in dashboard
- Mention integrations (Shopify, Contentful, etc.)

**Script:**
> "API keys, secrets, and configuration are managed here. We support integrations with Shopify, Stripe, Contentful - anything Nike uses. Your team doesn't need to manage infrastructure configs."

#### Demo Section 2: Performance Features (8-10 min)

**A. Show the Live Site - Fast Load Times**
- Navigate to your demo site homepage
- Point out instant load (open DevTools Network tab to show timing)
- Highlight: "Notice the page loaded in under 1 second. That's with images, fonts, and dynamic content."

**B. Image Optimization**
- Show a product page with large images
- Open DevTools ý Network ý Img filter
- Point out: "Vercel automatically converts images to AVIF/WebP format, generates responsive sizes, and serves from our CDN. This product image was 2MB in the original - Vercel serves it as 200KB AVIF."

**Script:**
> "For Nike with thousands of product images, this automatic optimization can reduce bandwidth costs by 60% and improve Largest Contentful Paint significantly."

**C. Incremental Static Regeneration (ISR)**
- Explain conceptually (no need to show code unless they ask)

**Script:**
> "Here's how Nike would handle product updates. When you update a product in your CMS or backend, Vercel revalidates just that page - not the entire site. The page regenerates in the background and is cached globally. Users always see fresh data, but it loads as fast as a static page."

**D. Edge Middleware (if relevant to their pain points)**
- Show an example of geolocation-based redirects or A/B testing
- Explain: "This code runs on our edge network before the page renders. You can do personalization, A/B testing, or feature flags without slowing down the page."

#### Demo Section 3: Advanced Features (5-7 min)

**Pick 1-2 features based on their goals. Examples:**

**If they mentioned AI/personalization:**

**A. Show your AI Product Assistant (from Stage 1)**
- Navigate to product page, open AI assistant
- Ask a question, show streaming response
- Explain: "This uses Vercel AI SDK with OpenAI. The chatbot has product context and answers customer questions in real-time."

**Script:**
> "For Nike, you could use this for sizing recommendations, product comparisons, or outfit suggestions. It reduces support burden and increases conversion by helping customers make confident purchase decisions."

**If they mentioned A/B testing:**

**B. Show A/B Testing Concept**
- Use Vercel Toolbar or explain Edge Middleware approach
- Show how you'd test different hero images or CTAs

**Script:**
> "You can run A/B tests at the edge without impacting performance. Test different product layouts, CTAs, or promotional banners. Results are instant because experiments run on our global network."

**If they mentioned developer productivity:**

**C. Show Local Development**
- Open terminal, run `vercel dev` or `npm run dev`
- Show hot module replacement (edit code, instant update in browser)
- Explain: "Local dev matches production exactly. No 'it worked locally but broke in prod' surprises."

#### Demo Section 4: Vercel Dashboard & Monitoring (2-3 min)

**Show (briefly):**
- **Analytics:** Real user metrics (if you have data)
- **Speed Insights:** Core Web Vitals scores
- **Logs:** Real-time function logs for debugging

**Script:**
> "Vercel gives you real user monitoring out of the box. No need to integrate Google Analytics or third-party tools. You see Core Web Vitals, page load times, and conversion funnels directly in the dashboard."

---

### Phase 5: Objection Handling & Next Steps (8-10 minutes)

#### Common Objections & Responses

**Objection 1:** "We're already on AWS/Azure. Why would we migrate?"

**Response:**
> "Great question. Many of our customers were on AWS before switching to Vercel. The key difference is Vercel is purpose-built for frontend applications, whereas AWS is a general cloud platform.
>
> With AWS, your team spends time managing CloudFront distributions, Lambda@Edge functions, S3 buckets, and CodePipeline. With Vercel, all of that is automated. Your team deploys to Vercel, and we handle the rest.
>
> The ROI we see is typically:
> - **50% reduction in DevOps overhead** (your team focuses on features, not infrastructure)
> - **3x faster deployment cycles** (preview URLs + instant deploys)
> - **20-40% better performance** (measured Core Web Vitals)
>
> You don't have to migrate everything at once. Most customers start with a new project or a single subdomain (e.g., shop.nike.com) and expand from there."

---

**Objection 2:** "How much does Vercel cost compared to our current setup?"

**Response:**
> "Pricing depends on your traffic and team size, but here's the typical comparison:
>
> **AWS approach:** You pay for CloudFront bandwidth, Lambda invocations, S3 storage, CodePipeline runs, and DevOps engineering time. For a high-traffic ecommerce site, this can be $5K-20K/month plus significant engineering overhead.
>
> **Vercel approach:** Predictable pricing based on usage. For a mid-size ecommerce site (1M monthly visitors), you'd be on our Pro or Enterprise plan ($150-$5K/month depending on features). Enterprise includes dedicated support, SLA, and advanced security.
>
> **The hidden cost savings:**
> - **DevOps time:** If we save your engineers 20 hours/month on infrastructure, that's $5K-10K/month in recovered productivity
> - **Faster time-to-market:** Shipping features 3x faster = more revenue opportunities
> - **Performance = revenue:** If we improve conversion by 1%, that's [$calculate based on Nike's revenue]
>
> I'd love to do a detailed cost analysis for Nike specifically. Can I connect with your finance or infrastructure lead after this call?"

---

**Objection 3:** "We already use Next.js. Why do we need Vercel?"

**Response:**
> "You absolutely can self-host Next.js on AWS, Kubernetes, or elsewhere. Many teams do. The question is: do you want your engineers managing infrastructure, or building features?
>
> **Self-hosting Next.js:**
> - You handle scaling, CDN, image optimization, caching, security patches
> - No preview deployments (you'd build this yourself)
> - No edge middleware (need to use CloudFront Functions)
> - No automatic ISR revalidation (custom webhook setup)
>
> **Vercel-hosted Next.js:**
> - Zero infrastructure management
> - Preview deployments on every PR out of the box
> - Global edge network with 100+ locations
> - ISR, image optimization, middleware - all automatic
> - Direct support from the team that builds Next.js
>
> The analogy I use: You can build a data center yourself, or use AWS. You can self-host Next.js, or use Vercel. It depends on whether infrastructure is your competitive advantage. For Nike, I'd argue your competitive advantage is product innovation and customer experience - not managing servers."

---

**Objection 4:** "What about vendor lock-in? If we build on Vercel, are we stuck?"

**Response:**
> "That's a valid concern. The good news: Next.js is open source and framework-agnostic. You're building with React and Next.js, not proprietary Vercel tech.
>
> **You can export and self-host anytime:**
> - Your codebase is standard Next.js - works anywhere
> - No Vercel-specific APIs required (though our SDK adds convenience)
> - Many customers self-host in dev and deploy to Vercel in production
>
> **What you'd lose if you left Vercel:**
> - Automatic preview deployments (you'd build this yourself)
> - Global edge network (you'd use CloudFront or similar)
> - Image optimization (you'd use Cloudinary or custom)
> - Our support team and SLA
>
> But the core application? Fully portable. We've had customers migrate in both directions (AWS ý Vercel, and vice versa) without rewriting code."

---

#### Transition to Next Steps

**Script:**
> "Based on our conversation, it sounds like Vercel could address [their #1 pain point] and help you achieve [their #1 goal]. Here's what I'd recommend as next steps:
>
> **Option 1: Proof of Concept (Recommended)**
> - We work with your team to build a pilot - maybe one section of Nike.com (e.g., product pages or a landing page)
> - Deploy to Vercel on a subdomain like `preview.nike.com`
> - Run for 2-4 weeks, measure performance and developer experience
> - Compare metrics side-by-side with current setup
>
> **Option 2: Architecture Review**
> - I bring in our solutions architects to review Nike's current stack
> - We map out a phased migration plan with milestones and timelines
> - You get a detailed proposal with cost estimates and ROI projections
>
> **Option 3: Hands-On Workshop**
> - We run a 2-hour workshop with your engineering team
> - Build a small Next.js app together and deploy to Vercel
> - Your team gets hands-on experience with preview deployments, ISR, etc.
>
> Which of these sounds most valuable for Nike?"

---

### Phase 6: Closing (2-3 minutes)

**Script:**
> "Thanks for the time today. This was really helpful for me to understand Nike's priorities. I'm excited about the potential here - especially around [specific pain point they mentioned].
>
> **My key takeaways:**
> - [Their pain point #1] - Vercel solves this with [feature]
> - [Their pain point #2] - We've seen customers reduce this by [X%]
> - [Their goal] - This aligns perfectly with [Vercel capability]
>
> I'll follow up with:
> - Case studies from similar ecommerce brands
> - Technical deep-dive docs on [feature they were interested in]
> - Proposed next steps and timeline
>
> Do you have any final questions for me before we wrap up?"

**End with warmth:**
> "Thanks again. I'm looking forward to partnering with Nike on this."

---

## Pre-Call Research: Nike.com Due Diligence

**Do this BEFORE the call (1-2 hours of prep):**

### 1. Tech Stack Analysis

**Tools to use:**
- **Wappalyzer** (browser extension) - Identifies frameworks, CMS, analytics
- **BuiltWith** - Detailed tech stack report
- **Chrome DevTools** - Inspect source code, network requests, performance

**What to look for:**
- Frontend framework (React? Vue? Angular?)
- Hosting (AWS? Azure? Cloudflare?)
- CDN provider
- Analytics/tracking tools
- Headless CMS or monolithic backend?

**Example findings:**
> "I noticed Nike.com uses React with a custom webpack setup, hosted on AWS CloudFront. Your Time to Interactive is around 3.2 seconds on mobile - there's opportunity for improvement."

### 2. Performance Analysis

**Tools:**
- **Google PageSpeed Insights** - Core Web Vitals scores
- **WebPageTest** - Detailed waterfall analysis
- **Lighthouse** (Chrome DevTools) - Performance audit

**What to measure:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Total Blocking Time (TBT)

**Talking point:**
> "I ran Nike.com through PageSpeed Insights. Your mobile LCP is 2.8 seconds, which is in the 'needs improvement' range. Vercel customers typically achieve 1.2-1.5s LCP for similar ecommerce sites."

### 3. Business Context

**Research:**
- Recent Nike news (Google News, TechCrunch)
- Product launches (Nike SNKRS app, major shoe drops)
- Competitive landscape (Adidas, Under Armour, Lululemon - who's winning on digital?)

**Talking point:**
> "I saw Nike's Q3 earnings highlighted digital growth as a priority. With Vercel, brands like yours typically see 10-30% improvement in conversion when moving from AWS to our platform."

### 4. Prepare Your Demo Site

**If using your Next.js Commerce project:**
- Ensure it's deployed to Vercel (live URL)
- Test all features work (AI assistant, cart, product pages)
- Have a backup plan if something breaks during demo

**If building a quick demo:**
- Use a [Vercel template](https://vercel.com/templates) (ecommerce or portfolio)
- Customize branding/content slightly (swap placeholder images, change text)
- Deploy to Vercel with a custom domain (e.g., `nike-demo.vercel.app`)

**Demo must showcase:**
1. Fast load times (sub 1-second)
2. Preview deployments (show a PR with preview URL)
3. One advanced feature (AI assistant, A/B testing, or personalization)

---

## Role-Playing Practice (Highly Recommended)

**Before the call, practice with a friend or record yourself:**

1. **Practice your opening** (3-minute intro + first discovery question)
2. **Practice objection handling** (pick 2-3 common objections, rehearse responses)
3. **Practice the demo** (walk through your site in 5 minutes without rambling)
4. **Time yourself** - Ensure you can fit all sections into 60 minutes

**Timing allocation:**
- Discovery: 12-15 min (don't rush this!)
- Intro/Value Prop: 8-10 min
- Demo: 20-25 min
- Q&A/Objections: 8-10 min
- Closing: 2-3 min

---

## What Success Looks Like

**The panel is evaluating:**

1. **Discovery Skills** - Do you ask insightful questions and listen actively?
2. **Technical Credibility** - Can you explain complex concepts simply?
3. **Consultative Approach** - Are you solving their problems, or just pitching features?
4. **Demo Quality** - Is it polished, relevant, and tied to their pain points?
5. **Business Acumen** - Do you connect technical features to business outcomes?
6. **Objection Handling** - Can you address concerns confidently without being defensive?

**Green flags:**
- You spend MORE time asking questions than presenting
- You tie every Vercel feature back to something they mentioned
- You pause and let them talk (don't fill every silence)
- You admit when you don't know something and offer to follow up
- You stay on time and respect their schedule

**Red flags:**
- You talk more than they do
- You demo features they don't care about
- You bad-mouth competitors aggressively
- You oversell or make unrealistic promises
- You go over 60 minutes

---

## Final Checklist (Day Before Interview)

**24 hours before:**
- [ ] Confirm interview time (Thursday 12:30)
- [ ] Test video/audio setup (Zoom/Google Meet/Teams)
- [ ] Run Nike.com through PageSpeed Insights, note scores
- [ ] Check Nike tech stack with Wappalyzer/BuiltWith
- [ ] Deploy your demo site to Vercel, test everything works
- [ ] Prepare 8-10 discovery questions (printed or on second screen)
- [ ] Have Vercel dashboard open (your project, analytics, deployment logs)
- [ ] Review Stage 1 project so you can reference your work
- [ ] Prepare notepad for taking notes during discovery
- [ ] Water nearby, phone on silent, good lighting

**30 minutes before:**
- [ ] Open tabs: Demo site, Vercel dashboard, Nike.com (for reference)
- [ ] Clear browser cache (so demo loads fresh)
- [ ] Test screen sharing in the video platform
- [ ] Review your opening script one more time
- [ ] Deep breath - you've got this!

---

## Emergency Backup Plans

**If demo site crashes during call:**
- Pivot to showing code in your IDE (walk through implementation)
- Show Vercel dashboard (deployment history, analytics)
- Screenshare Vercel's public demo sites (https://vercel.com/templates)

**If you blank on a question:**
- "That's a great question. Let me think about the best way to answer that." (Take 5 seconds to collect thoughts)
- Ask a clarifying question: "To make sure I answer this well, are you asking about [X] or [Y]?"

**If they challenge you on something technical:**
- Don't get defensive: "That's a fair point. Let me explain how we handle that."
- If you genuinely don't know: "I don't have the exact details on that, but I can connect you with our solutions architect who specializes in [topic] right after this call."

---

## Post-Call Follow-Up (Within 24 Hours)

**Send an email to Matt & Miguel:**

Subject: Nike Discovery Call - Next Steps

> Matt and Miguel,
>
> Thanks for the time today. I really enjoyed learning about Nike's priorities around [pain point they mentioned] and your goals for [their goal].
>
> **Key Takeaways from Our Discussion:**
> - [Pain point #1] - Vercel's [feature] addresses this by [explanation]
> - [Pain point #2] - We've seen ecommerce brands reduce this by [X%]
> - [Their goal] - Our [capability] aligns perfectly with this objective
>
> **As promised, here are the resources I mentioned:**
> - Case study: [Similar company] achieved [result] with Vercel
> - Technical doc: [Deep dive on feature they asked about]
> - Pricing guide: [Link to Vercel pricing or custom quote]
>
> **Proposed Next Steps:**
> - [Option you discussed: POC / Architecture Review / Workshop]
> - Timeline: [Suggested dates]
> - Team involvement: [Who from Nike should join]
>
> I'm excited about the potential to partner with Nike on this. Let me know if you need anything else from my side.
>
> Best,
> Morgan

---

## Key Mantras

**Remember these during the call:**

1. **"Discovery before demo"** - Understand their problems before showing solutions
2. **"Listen more than you talk"** - If you're talking 80% of the time, you're doing it wrong
3. **"Tie features to their pain points"** - Don't demo features they don't care about
4. **"Business outcomes > Technical jargon"** - Talk about revenue, conversion, productivity - not just React and edge networks
5. **"Confidence, not arrogance"** - Be knowledgeable, but humble and consultative

---

## You're Going to Crush This

You already passed the technical deep dive (Stage 1), which means they KNOW you have the technical chops. This round is about:

- Can you have a consultative conversation?
- Can you uncover customer needs?
- Can you position Vercel as the solution to their problems?
- Can you represent Vercel to real customers?

You've built an impressive demo, you understand the product deeply, and you have real ecommerce experience. Trust your preparation, be yourself, and remember: they want you to succeed.

**Good luck! =€**
