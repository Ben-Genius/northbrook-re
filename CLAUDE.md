# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server with Turbopack
pnpm build        # production build
pnpm lint         # ESLint
pnpm format       # Prettier (ts/tsx)
pnpm typecheck    # tsc --noEmit
```

## Architecture

**Next.js 16 app router** single-page site for North-Brook Ltd., a Ghanaian oil & gas logistics company.

### Animation system
All GSAP plugins (ScrollTrigger, ScrollSmoother, SplitText, Flip, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin) are registered once in `lib/gsap.ts` and re-exported from there — always import GSAP from `@/lib/gsap`, never directly from `gsap`.

`GSAPProvider` (`components/providers/GSAPProvider.tsx`) wraps the app body in `#smooth-wrapper` / `#smooth-content` divs required by ScrollSmoother. It exposes `useGSAPContext()` to access the smoother instance. Respect `prefers-reduced-motion` — the provider skips ScrollSmoother when the media query matches.

`SectionReveal` (`components/ui/SectionReveal.tsx`) is the standard wrapper for scroll-triggered entrance animations on each page section.

### Page structure
`app/page.tsx` composes all sections in order: Hero → LogoMarquee → Stats → Process → MorphTransition → Features → Showcase → WorkMapSection → CTA → Footer. Most sections are wrapped in `<SectionReveal>`.

Layout (`app/layout.tsx`) mounts global UI — `Preloader`, `Navbar`, `ScrollProgress`, `CustomCursor` — outside of section content.

### Design tokens
Colors, typography variables, and border-radius are centralized in `lib/design-tokens.ts`. Primary accent is North-Brook Red (`#E31E24`). Backgrounds are white/charcoal. Tailwind CSS v4 via PostCSS.

### Shadcn/ui
Components live in `components/ui/`. Add new shadcn primitives with `npx shadcn@latest add <component>`. Custom animated UI (`AnimatedCounter`, `MagneticButton`, `ImageSequencePlayer`, `CustomCursor`, etc.) also lives here.

### Brand & content context
See `AGENTS.md` for the full brand voice, design principles, certified partners, and key statistics. Use the scraped site content in `.firecrawl/` for reference copy.
