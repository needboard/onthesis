# OnThesis — Waitlist Landing Page Build Spec

## Context

OnThesis is a B2B SaaS product for solo GPs and angel investors. It connects to a partner's Gmail or Outlook inbox and automatically triages cold founder pitches against their specific investment thesis — parsing stage, sector, check size, and traction from raw emails, attached decks, and DocSend/Notion links — then sorts, summarizes, or drafts polite passes before the partner has to read the noise.

**This build is a single-page waitlist landing site only.** No auth, no dashboard, no live product functionality. Its one job is converting visiting VCs/angels into email signups.

The audience is investors, not developers or generalist consumers. Copy, visual metaphor, and interaction design should assume fluency in VC vocabulary (thesis, deal flow, pass, check size, cold inbound, warm intro, sourcing) without over-explaining it. This should read like it was written by someone who has sat in an investment committee meeting, not a marketing agency producing a generic SaaS template.

## Before writing any code

1. **Check for and load relevant Anthropic skills** (via the skills system available in this environment/npm) — specifically for frontend design guidance. Follow whatever design-token, layout, spacing, and styling conventions those skills define rather than defaulting to generic Tailwind patterns picked from memory. This step is mandatory even though the task looks simple — skills encode constraints that materially change output quality.
2. **Load `ui.watermelon.sh`'s component catalog** and identify the best-fit component for each section below before building it. Don't build custom components where a suitable Watermelon UI component exists. Prioritize components that read as serious and fintech-adjacent — avoid anything playful, consumer-social, or SaaS-generic in visual tone (no bubbly illustrations, no isometric people, no floating gradient blobs).
3. **Load `motion-primitives.com`'s primitives** for text animation. This is for headline/section-header animation specifically — not indiscriminate motion across every paragraph.
4. Read `landingpage_copy.ts` (provided separately, place at project root or `/lib`) before building any section — every visible string must be imported from this file. No hardcoded copy in component files.

## Design direction

Follow the frontend-design skill's process explicitly: brainstorm a compact design token system (4-6 named hex colors, 2+ typefaces with defined roles, a layout concept, one signature element) before writing code, critique it against the "AI-generated default" patterns the skill warns about (cream background + terracotta accent, near-black + single acid accent, broadsheet hairline-rule layout), and revise anything that reads as a default rather than a deliberate choice for this specific product.

**Ground the design in the actual subject matter**: this is about screening, filtering, signal-vs-noise, precision. The visual language should evoke instruments of judgment — a clean sorting mechanism, not a generic "AI product" aesthetic (no glowing orbs, no neural-network line art, no purple-to-blue gradients). Think: the visual restraint of institutional finance crossed with the confidence of a tool built by someone who's actually done this job. Serif or high-contrast display type is worth considering for the headline treatment to signal seriousness and permanence, paired with a clean, functional sans for body and UI text.

**Motion should be restrained and premium** — subtle fade/slide/blur-in on scroll or load via motion-primitives, never bouncy or attention-seeking. This audience associates excessive animation with low-credibility products.

**No hero illustration** unless Watermelon UI offers something abstract/data-driven that fits — skip generic SaaS stock-illustration styles entirely.

## Global structure

- **No navbar.** This is a single-page, pre-launch site. Flow top to bottom as one scroll experience.
- **Full footer**, even without a multi-page site — treat it as a trust signal (detail below), not a navigation utility.
- Fully responsive down to mobile. Visible keyboard focus states. Respect `prefers-reduced-motion`.

## Section specs

### 1. Hero
- Eyebrow, animated multi-line headline, subheadline, email input + CTA button, helper text — pull all copy from `hero` in the copy file.
- Headline lines animate in via motion-primitives on load — restrained entrance only (e.g. staggered blur/slide-in), not a flashy sequence.
- CTA button copy should stay terse and non-hype (already reflected in copy file — do not swap in generic "Get Started" style copy).

### 2. Problem
- Use `problem` copy. Include the stat (`~100:1`) as a visually distinct callout — a Watermelon UI stat/callout component if one fits, otherwise a clean custom treatment consistent with the type system.
- This section should feel like it's describing something the reader already lives, not explaining a problem to them — layout should give this room to breathe, not feel like a wall of marketing text.

### 3. How it works
- Use `howItWorks` copy — 4 steps.
- Select a steps/process component from Watermelon UI. Numbered markers (01-04) are justified here since this genuinely is a sequential process — keep them.
- Copy is intentionally terse per step; don't let component padding/spacing make this feel sparse — use whitespace deliberately.

### 4. Features
- Use `features` copy — 6 feature items.
- Select a feature grid or card component from Watermelon UI that fits the serious/fintech tone. 2-3 column grid depending on viewport.

### 5. Audience ("Who this is for")
- Use `audience` copy — 2 segments (Solo GPs, Angel investors).
- This section should make the right reader feel unmistakably seen — give it a distinct visual treatment from the feature grid so it doesn't blend in, e.g. two larger side-by-side panels rather than small cards.

### 6. FAQ
- Use `faq` copy — 7 items.
- Build with an accordion component from Watermelon UI.
- Keep answers exactly as terse as written in the copy file — this audience trusts specificity over reassurance language, don't pad them.

### 7. Final CTA
- Use `finalCta` copy. Shorter, punchier repeat of the email capture from the hero — last conversion point before the footer.

### 8. Footer
- Use `footer` copy: product name, tagline, links (Privacy/Terms/Contact — placeholder hrefs are fine for now), social link, copyright line.
- Should read as "a real company," not a placeholder block — this is a credibility signal for an audience about to consider granting inbox access. Give it real visual weight, not an afterthought strip.

## Data flow / email capture

- Email form (hero + final CTA, can share one component) submits via a Next.js API route (e.g. `/app/api/waitlist/route.ts`).
- The API route forwards the submitted email to **Resend Audiences** via their API.
- Structure the provider call behind a single function (e.g. `lib/waitlist.ts`) so the provider can be swapped later by editing one file, not scattered across components.
- Client-side: basic email format validation (native HTML `type="email"` + simple regex fallback is sufficient, no validation library needed).
- Show success/error state using `form.successMessage`, `form.errorMessage`, `form.invalidEmailMessage` from the copy file.
- Do not hardcode API keys in client code — use a server-only environment variable (e.g. `RESEND_API_KEY`) referenced only inside the API route.

## File structure expectations

```
/lib/landingpage_copy.ts       (provided — copy source of truth)
/lib/waitlist.ts               (provider-agnostic email submission function)
/app/api/waitlist/route.ts     (API route, calls lib/waitlist.ts)
/app/page.tsx                  (assembles all sections)
/components/sections/          (one component per section: Hero, Problem, HowItWorks, Features, Audience, Faq, FinalCta, Footer)
/components/ui/                (any Watermelon UI components pulled in, or thin wrappers around them)
```

## Quality bar before considering this done

- Every visible string traced back to `landingpage.ts` — grep the component files for hardcoded text as a final check.
- Design plan was critiqued against generic AI-design defaults before implementation, per the frontend-design skill's process.
- Motion is present but restrained — nothing bounces, nothing distracts from copy legibility.
- Mobile layout tested, not just assumed from responsive classes.
- Footer and FAQ both feel like intentional, complete sections — not the least-effort parts of the page.