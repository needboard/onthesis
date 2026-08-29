'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface Footer31Props {
  heading?: string;
  subtitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  columns?: FooterColumn[];
  brandDescription?: string;
  bigText?: string;
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const shapeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

function LeftShape({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={cn(className, 'h-auto w-[500px] opacity-70 sm:w-[600px] md:w-[700px]')}
      width="477"
      height="382"
      viewBox="0 0 477 382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shape-gradient-left-1" x1="74.8832" y1="-147.597" x2="337.115" y2="176.709" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-left-2" x1="-31.9263" y1="-147.597" x2="230.305" y2="176.708" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-left-3" x1="-79.2896" y1="-51.6842" x2="182.942" y2="272.622" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-left-4" x1="-106.526" y1="52.7226" x2="155.706" y2="377.028" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-left-5" x1="-67.9878" y1="-108.8" x2="194.244" y2="215.505" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <filter id="shape-blur" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="8.44244" result="effect1_foregroundBlur" />
        </filter>
      </defs>
      <g opacity="0.4" filter="url(#shape-blur)">
        <path d="M128.348 -190.828L21.4092 -104.358L353.062 163.814L460 77.3442L128.348 -190.828Z" fill="url(#shape-gradient-left-1)" />
        <path d="M21.538 -190.828L-85.4003 -104.359L246.252 163.814L353.191 77.3442L21.538 -190.828Z" fill="url(#shape-gradient-left-2)" />
        <path d="M-25.8253 -94.915L-132.764 -8.44537L198.889 259.727L305.827 173.257L-25.8253 -94.915Z" fill="url(#shape-gradient-left-3)" />
        <path d="M-53.0616 9.4917L-160 95.9614L171.653 364.134L278.591 277.664L-53.0616 9.4917Z" fill="url(#shape-gradient-left-4)" />
        <path d="M-14.5236 -152.031L-121.462 -65.5616L210.191 202.611L317.129 116.141L-14.5236 -152.031Z" fill="url(#shape-gradient-left-5)" />
      </g>
    </svg>
  );
}

function RightShape({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={cn(className, 'h-auto w-[500px] opacity-70 sm:w-[600px] md:w-[700px]')}
      width="477"
      height="382"
      viewBox="0 0 477 382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shape-gradient-right-1" x1="402.113" y1="-147.597" x2="139.881" y2="176.709" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-right-2" x1="508.921" y1="-147.597" x2="246.689" y2="176.709" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-right-3" x1="556.285" y1="-51.6841" x2="294.053" y2="272.622" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-right-4" x1="583.521" y1="52.7226" x2="321.289" y2="377.029" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shape-gradient-right-5" x1="544.984" y1="-108.802" x2="282.752" y2="215.504" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="0.65" stopColor="var(--color-accent)" stopOpacity="0.57" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.28" />
        </linearGradient>
        <filter id="shape-blur-right" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="8.49789" result="effect1_foregroundBlur" />
        </filter>
      </defs>
      <g opacity="0.4" filter="url(#shape-blur-right)">
        <path d="M348.649 -190.828L455.587 -104.358L123.934 163.814L16.9957 77.3444L348.649 -190.828Z" fill="url(#shape-gradient-right-1)" />
        <path d="M455.456 -190.828L562.395 -104.358L230.742 163.814L123.803 77.3444L455.456 -190.828Z" fill="url(#shape-gradient-right-2)" />
        <path d="M502.821 -94.915L609.759 -8.44531L278.106 259.727L171.168 173.257L502.821 -94.915Z" fill="url(#shape-gradient-right-3)" />
        <path d="M530.057 9.4917L636.995 95.9614L305.342 364.134L198.404 277.664L530.057 9.4917Z" fill="url(#shape-gradient-right-4)" />
        <path d="M491.52 -152.033L598.458 -65.5635L266.805 202.609L159.867 116.139L491.52 -152.033Z" fill="url(#shape-gradient-right-5)" />
      </g>
    </svg>
  );
}

export function Footer31({
  heading = "You don't have to carry this part alone.",
  subtitle = "Inbox-native triage for the fund of one.",
  newsletterPlaceholder = "partner@yourfund.com",
  newsletterButtonText = "Join the waitlist",
  columns = [
    {
      title: 'LEGAL',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Contact', href: 'mailto:hello@onthesis.com' },
      ],
    },
  ],
  brandDescription = "Inbox-native triage for the fund of one.",
  bigText = "OnThesis",
}: Footer31Props) {
  return (
    <footer className="relative w-full bg-background pt-20 pb-10 font-sans text-foreground antialiased">
      {/* Abstract Background Shapes - wrapped in overflow-hidden container */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <motion.div
          variants={shapeVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="absolute top-[-100px] left-[-150px] z-0 sm:left-[-100px]"
        >
          <LeftShape />
        </motion.div>
        <motion.div
          variants={shapeVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="absolute top-[-100px] right-[-150px] z-0 sm:right-[-100px]"
        >
          <RightShape />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-10 lg:px-12"
      >
        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          {/* RIGHT COLUMN - First on mobile (order-1), second on desktop (order-2) */}
          <motion.div
            variants={fadeUpVariant}
            className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-6 text-center lg:text-right"
          >
            <div className="max-w-sm lg:max-w-xs">
              <h2 className="text-xl leading-[1.15] tracking-tight text-balance text-foreground md:text-2xl lg:text-3xl font-display font-medium">
                {heading}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed font-medium text-pretty text-muted-foreground md:text-base">
                {subtitle}
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-sm flex items-center rounded-full border border-border bg-card p-1 shadow-sm"
            >
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-none"
                required
              />
              <button
                type="submit"
                className="h-9 rounded-full bg-accent px-5 font-medium text-accent-foreground shadow-sm hover:bg-accent-hover transition-colors"
              >
                {newsletterButtonText}
              </button>
            </form>
          </motion.div>

          {/* LEFT COLUMN - Second on mobile (order-2), first on desktop (order-1) */}
          <motion.div
            variants={fadeUpVariant}
            className="order-2 lg:order-1 flex flex-col items-center gap-8 text-center"
          >
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/onthesis"
                className="transition-colors hover:text-foreground"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="h-6 w-6 fill-current" />
              </a>
              <a
                href="https://linkedin.com/company/onthesis"
                className="transition-colors hover:text-foreground"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="h-6 w-6 fill-current" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-foreground">
                {bigText}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base font-display">
                {brandDescription}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Legal Links + Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 border-t border-border">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            {columns[0]?.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} {bigText}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}