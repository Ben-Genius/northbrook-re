---
name: North-Brook Limited
description: West Africa's premier oil & gas logistics operator — authoritative, precise, formidable.
colors:
  north-brook-red: "#940034"
  ink: "#1A1615"
  paper: "#FDFCFB"
  smoke: "#F2EDEC"
  steel: "#757070"
  wire: "#E8E3E3"
  warm-cream: "#F4EFE6"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 7rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.4em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.north-brook-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.north-brook-red}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
  button-cta-pill:
    backgroundColor: "{colors.north-brook-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-cta-outline-pill:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
---

# Design System: North-Brook Limited

## 1. Overview

**Creative North Star: "The Field Office"**

This is the design system of a company that does the actual job. Not a company pitching the job. Every surface is a workspace: purposeful materials, technical data surfaced where it earns attention, nothing placed for decoration. The Field Office runs two shifts. In the light sections (Process, Features, Stats), the mood is disciplined — a well-lit workspace with generous breathing room between items, precision typography, and no surface noise. In the dark sections (Hero, CTA, Footer), the mood shifts to the operations floor at dusk: Ink surfaces, warm cream text, a single emergency-red signal light on the primary call-to-action. The transition between these two registers is the site's core rhythm.

A 3.5% noise grain overlay runs across every surface at fixed position — not animated, not decorative. It is a paper texture. It prevents the dark Ink surfaces from reading as "tech dark mode" and keeps the light Paper surfaces from reading as "startup white." Together, they read as industrial document.

This system explicitly rejects: generic SaaS blue grids with rounded cards and feature icons; heavy industrial brutalism with all-caps orange-tinted layouts that look rugged but not credible to Eni procurement; slick agency minimalism with whisper-grey text and 1px photo rules that feels like a studio, not an operator; government/compliance drab with navy seals and serif-heavy layouts. If it looks like any of those four, rebuild.

**Key Characteristics:**
- Dual-register surfaces: Paper (light) and Ink (dark) alternate across the page
- Acute typographic scale: 7rem display headlines alongside 10px mono labels
- Red as emergency signal: one moment per section, maximum
- Flat elevation: depth through tonal contrast and noise grain, never shadows
- Motion like machinery: clipPath wipes, character cascades, no bounce

## 2. Colors: The Industrial Palette

Two surfaces, one signal, one warmth register. The palette has the restraint of a technical manual and the authority of a safety placard.

### Primary
- **North-Brook Red** (`#940034`): The emergency signal. Appears on primary CTA buttons, section eyebrow labels (`font-mono text-accent`), and one typographic moment per section (the italic accent in display headlines). Never on body text, never on dividers, never on decorative backgrounds. Its scarcity is the point.

### Neutral
- **Ink** (`#1A1615`): The dark surface — Hero overlays, CTA section, Footer. Slightly warm-tinted toward the brand hue so it reads as a physical material rather than a digital black hole. Text on Ink is always Warm Cream, never pure white.
- **Paper** (`#FDFCFB`): The light surface — content sections. Slightly warm-tinted. Clean, legible, document-like. Never pure `#FFFFFF`.
- **Smoke** (`#F2EDEC`): Secondary backgrounds within Paper sections: stat panel tints, alternate row fills. Warmer than Paper.
- **Steel** (`#757070`): Muted text — supporting descriptions, metadata, secondary labels. Passes 4.5:1 contrast on Paper and 3:1 on Ink at minimum.
- **Wire** (`#E8E3E3`): Borders, dividers, rule lines. Only on Paper surfaces. On Ink, use `rgba(255,255,255,0.06)` instead.
- **Warm Cream** (`#F4EFE6`): Body text and headings on all Ink surfaces. The color of aged technical documentation. Never pure white on dark backgrounds.

### Named Rules
**The Emergency Signal Rule.** North-Brook Red (`#940034`) appears on at most one element per visible screen area. It may appear on: the primary CTA button, one eyebrow label, or one italic typographic accent. Never two at once in the same viewport. If you're using it twice, one instance is wrong.

**The Two-Surface Rule.** Every section is either Paper or Ink. No hybrid backgrounds (grey-on-grey, dark-blue-on-ink). The contrast between sections IS the rhythm of the page.

## 3. Typography

**Display Font:** Inter (Bold/Black weights, `var(--font-display)`)
**Body Font:** Geist Sans (`var(--font-sans)`)
**Label/Mono Font:** Geist Mono (`var(--font-mono)`)

**Character:** Inter Black at compressed line heights reads as industrial stamping, not brand elegance. Geist Mono at 10px with 0.4em tracking is the classification system: it tells you what something IS before you read what it SAYS. The pairing of a massive sans-serif display with a tiny monospace label is the system's primary typographic move.

### Hierarchy
- **Display** (900 weight, `clamp(3.5rem, 8vw, 7rem)`, line-height 0.82, tracking `-0.04em`, uppercase): Hero headline, major section headlines. Compressed to the point of stacking — letters touching. One or two words per line at this scale. One italic accent word per headline in the brand red or warm cream.
- **Headline** (800 weight, `clamp(2.5rem, 5vw, 5rem)`, line-height 0.88, tracking `-0.03em`): Section subheadings, CTA heading. Still tight-tracked. Never more than 5-6 words per line.
- **Title** (700 weight, `clamp(1.5rem, 3vw, 2.5rem)`, line-height 1.1, tracking `-0.02em`): Process step titles, feature names. The working headline level.
- **Body** (400 weight, `0.875rem` / 14px, line-height 1.625): All descriptive paragraph text. Max line length 65ch. Leading generous relative to the compressed display levels — the contrast in line-height between Display and Body is as important as the size contrast.
- **Label** (700 weight, `0.625rem` / 10px, tracking `0.4em`, uppercase, Geist Mono): Section eyebrows, category labels, telemetry overlays, phase identifiers. The classification layer. Never used for content that requires comprehension — only for labeling and categorization.

### Named Rules
**The Label Layer Rule.** Every major section has exactly one Label above its heading. The label is Geist Mono, 10px, 0.4em tracking, uppercase, North-Brook Red on Paper surfaces, or `rgba(255,255,255,0.5)` on Ink surfaces. It is a cargo classification tag, not a decorative eyebrow.

**The Italic Exception Rule.** One word in each Display or Headline may be italic, set in a serif-fallback style when the display font supports it, or simply `font-style: italic` in Inter. This word always carries the emotional payload: "Precision In *Motion.*" Never italicize for decoration — only for the single most loaded word in a headline.

## 4. Elevation

This system is flat by default. No `box-shadow` on surfaces at rest. Depth is structural, not cosmetic.

Depth is created through three mechanisms: (1) tonal surface contrast between Paper and Ink sections; (2) a fixed-position noise grain overlay at 3.5% opacity across the entire page, which gives surfaces physical weight; (3) `drop-shadow` on text overlaid on imagery (Hero headlines use `drop-shadow(0 2px 20px rgba(0,0,0,0.5))` for legibility — this is a readability mechanism, not a design decision). Shadows appear nowhere else.

Interactive elements (buttons) on Ink surfaces may use `shadow-2xl` on the primary CTA for separation from the background. This is the only place the system permits a visible shadow, and only in that context.

### Named Rules
**The Flat-By-Default Rule.** If you are reaching for `box-shadow`, stop. The shadow you want is probably a tonal background shift, a Wire border, or a clipPath entrance. Shadows read as "software UI." This site is not software UI.

## 5. Components

### Buttons

Two physical contexts: on Paper, and on Ink. They behave differently.

**On Paper surfaces:**
- **Shape:** Slightly rounded (8px, `rounded-lg`). Not a pill, not a rectangle — a calibrated corner that says "designed, not default."
- **Primary:** North-Brook Red fill (`#940034`), Warm Cream text, bold weight, 10-11px uppercase, 0.25em tracking. Padding: `py-6 px-8` for hero/CTA scale. On hover: fill inverts to Paper white, text becomes North-Brook Red. Transition at 150ms.
- **Focus:** 2px North-Brook Red ring at 3px offset. Never hidden.

**On Ink surfaces:**
- **Ghost variant:** `border border-white/25`, `bg-white/5`, `backdrop-blur-sm`, Warm Cream text. On hover: `bg-white`, text inverts to Ink. Maintains the surface's physical character.
- **CTA pill variant (in CTA section):** `border-radius: 999px`, Red fill, Warm Cream text, 14px, 600 weight, 0.03em tracking, `padding: 14px 26px`. The pill shape signals a different register — less rigid, same authority.

**MagneticButton wrapper:** All hero and CTA buttons are wrapped in the MagneticButton component. Strength 0.2–0.4, radius 40–120px. The magnetic pull is the only "delight" in the system. Use it only on standalone CTA buttons, never on inline text links or nav items.

### Badge / Classification Tag
- Glass chip: `border border-white/25`, `bg-black/25`, `backdrop-blur-sm`, Geist Mono 9px, tracking `0.4em`, uppercase. Used to label section context above heroes. Never used in lists.

### Section Eyebrow (`.section-eyebrow`)
- Geist Mono, 10px, uppercase, tracking `0.4em`, North-Brook Red. Applied as a global utility class. Always appears immediately before a Display or Headline. Never indented, never centered unless the headline is also centered.

### Navigation
- Glassmorphism is permitted here as a functional exception (the hero image must show through). Backdrop blur `saturate(180%) blur(20px)`, `bg-background/80`. Never use glassmorphism elsewhere in the system — only the navbar. Its purpose is legibility, not aesthetics.

### SectionReveal
- `clipPath: inset(0 0 100% 0)` → `inset(0 0 0% 0)` over 1.5s at `power4.inOut`, scrubbed to scroll. Every page section uses this as its entrance. Never override with a fade-in or a translate — the wipe is the system's entrance signature.

### Stat Panel
- On Paper: image fills background with `inset(100% 0 0 0)` reveal, stat content overlaid with high contrast. No card border, no shadow. The contrast between image and paper surfaces is the elevation.

## 6. Do's and Don'ts

### Do:
- **Do** use North-Brook Red on at most one element per visible screen area. If you need emphasis and the red is already used, reach for weight, scale, or spacing — never a second red element.
- **Do** use Geist Mono in uppercase with 0.4em tracking for all classification labels, eyebrows, phase markers, and telemetry. This is the system's technical voice layer.
- **Do** run the dual-surface alternation (Paper → Ink → Paper) as the structural rhythm of the page. Each section change is a scene change.
- **Do** keep body text at 14px minimum, max-width 65ch, leading 1.625. The system's authority comes partly from its legibility.
- **Do** apply the SectionReveal clipPath wipe to every new section entrance. Consistent entrance signatures make the site feel like a single directed experience.
- **Do** use the noise grain overlay globally and at fixed position. It is always present. Never remove it from a section to make it feel "cleaner."
- **Do** apply WCAG 2.1 AAA contrast ratios everywhere: Warm Cream on Ink, Steel on Paper, North-Brook Red on Paper. Test all combinations before shipping.
- **Do** respect `prefers-reduced-motion`: set all GSAP animations to `duration: 0` or skip entirely when the media query matches.

### Don't:
- **Don't** use generic SaaS blue patterns: Stripe-era rounded cards, feature icon grids, gradient backgrounds. If it looks like a Series A landing page, it's wrong.
- **Don't** use heavy industrial brutalism: all-caps layouts with orange or construction-yellow accents, thick structural borders used decoratively, warehouse-floor aesthetics. Rugged is not credible at the Eni/Saipem level.
- **Don't** use slick agency minimalism: full-bleed photography with 1px rules, whisper-grey text, centered layouts with wide empty margins. This is an operator's presence, not a studio portfolio.
- **Don't** use government/compliance drab: navy + gold, Times New Roman energy, seal-like crests, formal serif-heavy body text. Safe is forgettable.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any list item, card, or callout. Rewrite with full borders, background tints, or leading numbers.
- **Don't** use `background-clip: text` with a gradient. Accent emphasis is achieved through North-Brook Red as a solid fill, weight, or scale. Never gradient text.
- **Don't** use glassmorphism decoratively. Permitted only on the Navbar (functional requirement: image legibility). Nowhere else.
- **Don't** add `box-shadow` to surfaces at rest. The system is flat. If you want depth, use tonal contrast or a border.
- **Don't** animate layout properties (width, height, padding, margin). GSAP transforms only: `x`, `y`, `scale`, `rotate`, `opacity`, `clipPath`.
- **Don't** use identical-size card grids. If you are placing 4 items in a grid with the same card structure, you have not designed the layout — you have deferred it. Vary sizes, break the grid, or find a different structure.
