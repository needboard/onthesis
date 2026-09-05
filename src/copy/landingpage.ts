// landingpage_copy.ts
// Single source of truth for all visible copy on the OnThesis waitlist landing page.
// Import from this file in every section component — no hardcoded strings in components.
//
// TONE NOTE FOR IMPLEMENTATION:
// This copy is written for solo GPs and angel investors — people who chose to work
// alone and carry the full weight of that choice. The register throughout is quiet,
// specific, and respectful of their intelligence — no exclamation points, no forced
// enthusiasm, no "supercharge your dealflow" energy. Confidence reads as competence
// to this audience; enthusiasm reads as inexperience. Let the specificity of the
// language do the emotional work, not adjectives.
//
// ILLUSTRATION NOTES (for designer/agent, not rendered copy):
// - Hero: a single, dignified illustration — solitary figure motif (in the spirit of
//   Watermelon UI's solo-skier/single-path imagery). Should read as calm and earned,
//   not lonely or sad. This sets emotional tone before any copy is read.
// - Problem section: an illustration conveying volume/weight of an inbox — should
//   feel architectural and quiet, NOT chaotic or panicked. Same illustration style
//   and mood as the hero image — consistency here is what keeps the emotional
//   register coherent across the page.
// - No illustrations in How It Works, Features, Audience, or FAQ — those sections
//   do informational work in clean type/layout; adding imagery there dilutes the
//   two emotional beats above.
// - Final CTA: optional small visual echo of the hero motif, smaller/quieter, to
//   close the loop. Not required.

export interface HeroCopy {
  eyebrow: string;
  headlineLines: string[]; // rendered as separate animated lines/words
  subheadline: string;
  ctaPlaceholder: string;
  ctaButton: string;
  ctaHelperText: string;
  illustrationAlt: string;
}

export interface ProblemStat {
  value: string;
  label: string;
}

export interface ProblemCopy {
  eyebrow: string;
  headline: string;
  body: string[];
  stat: ProblemStat;
  supportingStats: ProblemStat[];
  illustrationAlt: string;
}

export interface WeSeeYouCopy {
  eyebrow: string;
  headline: string;
  body: string[];
}

export interface HowItWorksStep {
  index: string;
  title: string;
  description: string;
}

export interface HowItWorksCopy {
  eyebrow: string;
  headline: string;
  steps: HowItWorksStep[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface FeaturesCopy {
  eyebrow: string;
  headline: string;
  subheadline: string;
  features: Feature[];
}

export interface Integration {
  title: string;
  description: string;
  status: "coming-first" | "coming-later";
  priority?: string;
  logo: { src: string; alt: string };
}

export interface IntegrationsCopy {
  eyebrow: string;
  headline: string;
  subheadline: string;
  integrations: Integration[];
  ctaText: string;
  ctaHref: string;
}

export interface AudienceCopy {
  eyebrow: string;
  headline: string;
  segments: {
    title: string;
    description: string;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCopy {
  eyebrow: string;
  headline: string;
  items: FaqItem[];
}

export interface FounderNoteCopy {
  eyebrow: string;
  paragraphs: string[];
  signOff: string;
}

export interface FinalCtaCopy {
  headline: string;
  subheadline: string;
  ctaPlaceholder: string;
  ctaButton: string;
  crmPlaceholder: string;
  crmOtherPlaceholder: string;
  crmLabel: string;
}

export interface FooterCopy {
  productName: string;
  tagline: string;
  links: { label: string; href: string }[];
  socialLabel: string;
  socialHref: string;
  copyright: string;
}

export interface LandingPageCopy {
  meta: {
    title: string;
    description: string;
  };
  hero: HeroCopy;
  problem: ProblemCopy;
  weSeeYou: WeSeeYouCopy;
  howItWorks: HowItWorksCopy;
  features: FeaturesCopy;
  integrations: IntegrationsCopy;
  audience: AudienceCopy;
  faq: FaqCopy;
  founderNote: FounderNoteCopy;
  finalCta: FinalCtaCopy;
  footer: FooterCopy;
  form: {
    successMessage: string;
    errorMessage: string;
    invalidEmailMessage: string;
    crmHelperText: string;
  };
}

export const landingPageCopy: LandingPageCopy = {
  meta: {
    title: "OnThesis — You built this alone. Your inbox shouldn't make that harder.",
    description:
      "OnThesis reads inbound cold pitches against your actual investment thesis and sorts, summarizes, or drafts the pass — before it costs you a scan.",
  },

  hero: {
    eyebrow: "Now onboarding solo GPs and angels",
    headlineLines: ["You built this alone.", "Your inbox shouldn't make that harder."],
    subheadline:
      "No associate to take the first pass. No partner to split the judgment call with. OnThesis reads every cold pitch against your actual thesis and only hands you what's worth your time.",
    ctaPlaceholder: "partner@yourfund.com",
    ctaButton: "Join the waitlist",
    ctaHelperText: "No spam. One email when we're ready for you.",
    illustrationAlt:
      "A single figure on a quiet path, evoking the deliberate solitude of running a fund alone",
  },

  problem: {
    eyebrow: "The part nobody puts in the pitch deck",
    headline: "Somewhere between the portfolio call and the diligence doc, the inbox is still sitting there.",
    body: [
      "You know most of what's in it before you open it — wrong stage, wrong check size, a sector you don't touch. Roughly 70 out of every 100 pitches die in that first look, before anyone takes a meeting. Never a judgment call about the company. A mismatch you could've caught in a sentence.",
      "There's no associate doing that first pass, no principal filtering before it reaches you. A solo GP fielding even a modest run of cold pitches a week is looking at somewhere north of two thousand a year — thirty honest seconds each, several hundred hours spent finding the two or three that were ever going anywhere. Triaged at 11pm, between calls, or not at all for three days. You just don't know which one was worth it until you've already spent the time.",
    ],
    stat: {
      value: "~70%",
      label: "of pitches die in the first look, before any meeting — a mismatch, not a rejection",
    },
    supportingStats: [
      {
        value: "~2%",
        label: "median close rate across a full year of deal flow at a typical fund",
      },
      {
        value: "3-5x",
        label: "better conversion for a warm intro than a cold pitch, meeting for meeting",
      },
    ],
    illustrationAlt:
      "A quiet, architectural rendering of an inbox holding more than one person can carry",
  },

  weSeeYou: {
    eyebrow: "Before anything else",
    headline: "Running this alone was the point.",
    body: [
      "Nobody made you build a fund of one. You did it because you didn't want a committee between you and a decision. You wanted the calls to be yours — the good ones and the wrong ones both.",
      "That's not a gap in the model. It's the model. But it means every hour spent scanning something that was never going to be a fit is an hour that came out of the part of the job you actually chose this for.",
      "This isn't about needing help running a fund. It's about one specific, repetitive task that doesn't deserve the same hours as everything else you're doing alone.",
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    headline: "Four steps, none of which require you to open the email first",
    steps: [
      {
        index: "01",
        title: "Pitch lands",
        description:
          "A cold email hits your existing inbox — Gmail or Outlook. Nothing changes about how founders reach you.",
      },
      {
        index: "02",
        title: "Read against your thesis",
        description:
          "OnThesis parses the email body, attached decks, and DocSend links — stage, sector, check size, traction — and checks it against your actual criteria.",
      },
      {
        index: "03",
        title: "Sorted, not just tagged",
        description:
          "Clear mismatches get a drafted pass, queued for your one-click approval. Borderline cases get flagged, not buried. Nothing sends without you.",
      },
      {
        index: "04",
        title: "You see what's on-thesis",
        description:
          "What clears the bar shows up with a one-line summary pinned in your inbox. That's the only thing you actually have to read.",
      },
    ],
  },

  features: {
    eyebrow: "Built for how you actually screen",
    headline: "The judgment call you already make, automated at the inbox",
    subheadline:
      "Not a CRM. Not a form founders have to find. It reads what's already landing in your inbox and applies the same fit check you'd apply yourself.",
    features: [
      {
        title: "Thesis-aware triage",
        description:
          "Set your stage, sector, geography, check size, and ownership targets once. Every pitch gets checked against the real thing, not a generic spam filter.",
      },
      {
        title: "Reads decks, not just emails",
        description:
          "Pulls metrics straight out of attached PDFs and linked DocSend or Notion decks — pre-seed, $500k raise, $10k MRR — without you opening a single attachment.",
      },
      {
        title: "Drafted passes, your approval",
        description:
          "Off-thesis pitches get a polite, specific, auto-tailored pass drafted and queued. You approve or edit before anything sends. Never fully autonomous by default.",
      },
      {
        title: "Warm intro detection",
        description:
          "If the sender shares a mutual connection or was referred in, triage backs off. Warm intros don't get auto-passed just because the metrics look off.",
      },
      {
        title: "Portfolio conflict check",
        description:
          "Cross-references inbound against your existing portfolio, so direct competitors get flagged before you accidentally take the meeting.",
      },
      {
        title: "A digest, not a black box",
        description:
          "A standing rollup of what got auto-passed and why, so you can spot-check the system's calls instead of trusting it blind.",
      },
    ],
  },

  integrations: {
    eyebrow: "Works with the tools you already use",
    headline: "Sits upstream of your CRM. Hands off only what's worth logging.",
    subheadline:
      "OnThesis doesn't replace Affinity, Attio, Decile Hub, or Streak. It sits in front of them, sending only the thesis-matched deals that clear the bar — so your CRM stays clean and your workflow stays yours.",
    integrations: [
      {
        title: "Decile Hub",
        description: "Push deals straight into your existing pipeline. The best match for emerging managers and solo GPs.",
        status: "coming-first",
        priority: "Priority 1",
        logo: { src: "/logos/decile-hub.png", alt: "Decile Hub logo" },
      },
      {
        title: "Attio",
        description: "Works seamlessly with modern deal workflows. Built for tech-forward fund managers.",
        status: "coming-first",
        priority: "Priority 2",
        logo: { src: "/logos/attio.svg", alt: "Attio logo" },
      },
      {
        title: "Streak",
        description: "For teams living in Gmail. OnThesis hands off clean deals straight to your Streak pipeline.",
        status: "coming-first",
        priority: "Priority 3",
        logo: { src: "/logos/streak.png", alt: "Streak logo" },
      },
      {
        title: "Affinity",
        description: "Enterprise-grade portfolio tracking. We're building this to meet demand from larger GPs.",
        status: "coming-later",
        logo: { src: "/logos/affinity.png", alt: "Affinity logo" },
      },
    ],
    ctaText: "Don't see your CRM? Let us know",
    ctaHref: "#final-cta",
  },

  audience: {
    eyebrow: "Who this is for",
    headline: "Built for the fund of one",
    segments: [
      {
        title: "Solo GPs",
        description:
          "You're running LP capital with no associate to take the first pass. You already know warm intros close several times better than cold ones — that instinct is correct, and it's exactly what a bigger fund's screening layer protects at scale. OnThesis gives you that same protection without giving up the autonomy you built this to have.",
      },
      {
        title: "Angel investors",
        description:
          "It's your own capital and your own time — nobody else is losing sleep over a wasted scan. But you still know the next great cold pitch might be sitting three emails deep in a pile you haven't opened yet, and that not opening it isn't a small thing to you either.",
      },
    ],
  },

  faq: {
    eyebrow: "Questions",
    headline: "Before you connect an inbox",
    items: [
      {
        question: "What does 'on-thesis' actually mean here?",
        answer:
          "It's the same judgment call you already make on every pitch — does this match my stage, sector, geography, check size, and the things I actually care about. OnThesis just applies that check before you have to read the email to make it.",
      },
      {
        question: "What access does this need to my inbox?",
        answer:
          "OnThesis connects via the Gmail or Outlook API to read inbound mail matching your public contact address and take the actions you've approved — sorting, summarizing, drafting passes. It's scoped access, not a full mailbox export, and nothing sends without your review unless you explicitly turn on auto-send for a given confidence tier.",
      },
      {
        question: "Does this replace my CRM?",
        answer:
          "No. OnThesis sits upstream of Affinity, Attio, Streak, or whatever you already use. It filters before a deal is worth logging, then hands off what's on-thesis so you're not manually filing noise into a system built for tracking real relationships.",
      },
      {
        question: "Will it send emails on my behalf without me seeing them first?",
        answer:
          "Not by default. Drafted passes queue for your one-click approval. Full auto-send is something you can opt into later, per confidence tier, once you trust the calls it's making — not a v1 default.",
      },
      {
        question: "Does it work with both Gmail and Outlook?",
        answer:
          "Yes, both are supported through their respective APIs. Setup is the same regardless of which you use.",
      },
      {
        question: "When can I actually use this?",
        answer:
          "We're onboarding solo GPs and angels in small batches. Join the waitlist and you'll hear from us directly when a spot opens — no mass launch, no waiting in a generic queue.",
      },
      {
        question: "What does it cost?",
        answer:
          "Pricing isn't final while we're still in early access. Waitlist members get first access and founding pricing before any public rate is set.",
      },
      {
        question: "Why not just ignore cold email entirely?",
        answer:
          "Because the odds are long, not zero. Warm intros convert several times better and should stay your primary channel — but real deals still start cold, often enough that the most successful investors keep reading them anyway. OnThesis isn't built to close the channel. It's built so scanning it doesn't cost you the hours it currently does.",
      },
    ],
  },

  founderNote: {
    eyebrow: "Why this exists",
    paragraphs: [
      "This started as a way to fix my own inbox, not a market I set out to build for.",
      "Every solo GP and angel I talked to described the same thing, in almost the same words — not the pitches themselves, but the quiet, ongoing tax of having to personally open every single one to find out it wasn't for them. Nobody complained about the work of investing. Everybody was tired of the work before the work.",
      "OnThesis doesn't touch the part of this job you built a fund alone to do. It just takes the one part that was never really a judgment call to begin with — is this even in scope — off your plate before it costs you the scan.",
    ],
    signOff: "— Built for the fund of one, by someone tired of scanning their own inbox at midnight.",
  },

  finalCta: {
    headline: "You don't have to carry this part alone.",
    subheadline: "Let something else take the first pass.",
    ctaPlaceholder: "partner@yourfund.com",
    ctaButton: "Join the waitlist",
    crmPlaceholder: "What CRM do you use? (optional)",
    crmOtherPlaceholder: "Your CRM — e.g. Notion, Copper, HubSpot",
    crmLabel: "What CRM do you use?",
  },

  footer: {
    productName: "OnThesis",
    tagline: "Inbox-native triage for the fund of one.",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "mailto:agblion9@gmail.com" },
    ],
    socialLabel: "Follow on X",
    socialHref: "https://x.com/manyfacess14",
    copyright: `© ${new Date().getFullYear()} OnThesis. All rights reserved.`,
  },

  form: {
    successMessage: "You're on the list. We'll reach out when a spot opens.",
    errorMessage: "Something went wrong — try again in a moment.",
    invalidEmailMessage: "That doesn't look like a valid email.",
    crmHelperText: "Optional — helps us prioritize your stack.",
  },
};

export default landingPageCopy;