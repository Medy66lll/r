---
name: Fidelix Algérie
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#5a4136'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#8e7164'
  outline-variant: '#e3bfb1'
  surface-tint: '#a33e00'
  primary: '#a33e00'
  on-primary: '#ffffff'
  primary-container: '#ff6600'
  on-primary-container: '#561d00'
  inverse-primary: '#ffb596'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#006c4a'
  on-tertiary: '#ffffff'
  tertiary-container: '#4aa77e'
  on-tertiary-container: '#003723'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcd'
  primary-fixed-dim: '#ffb596'
  on-primary-fixed: '#360f00'
  on-primary-fixed-variant: '#7c2e00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#98f5c7'
  tertiary-fixed-dim: '#7cd9ac'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005237'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
  brand-orange-vivid: '#FF6600'
  brand-orange-hover: '#E65C00'
  brand-orange-soft: '#FFF4ED'
  brand-noir: '#111111'
  brand-noir-surface: '#1A1A1A'
  brand-emerald: '#2F8F68'
  brand-emerald-soft: '#EBF6F1'
  surface-card: '#FFFFFF'
  surface-border: '#EFECE6'
  text-muted: '#6E6D6A'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

The design system embodies a modern, frictionless B2B SaaS platform specifically crafted for digital wallet loyalty (Apple Wallet & Google Wallet) in the Algerian market. The design style combines crisp Swiss minimalism with high-energy digital utility: warm off-white canvas surfaces, assertive typographic scale, vivid warm-orange energetic accents, and deliberate deep-noir contrast blocks for high-retention sections (such as FAQs, proof panels, and global footers).

The emotional tone balances commercial confidence and high-tech simplicity. For Algerian retailers, cafes, and restaurants, the visual identity conveys immediate reliability, zero-friction POS adoption, and local market relevance (Dinar pricing, bilingual French/Arabic compatibility, rapid QR integration) while maintaining international product standards.

## Colors

The palette establishes sharp hierarchy through tonal zoning:
- **Primary (`#FF6600` / `#FF7A1A`):** Applied systematically to primary action triggers, status alerts, active badges, and conversion focal points.
- **Secondary (`#111111`):** Grounds primary headlines, inverted contextual blocks (impact sections, FAQ containers, and bottom navigational anchors), giving structural weight.
- **Tertiary (`#2F8F68`):** Serves functional confirmations, live activity status indicators (e.g. active stores, validated scans), and positive metric deltas.
- **Neutral Canvas (`#FAF9F7`):** Warm, premium matte backdrop that mitigates harsh glare compared to pure white, allowing pure white (`#FFFFFF`) card surfaces to elevate cleanly with soft micro-borders.

## Typography

The type scale relies entirely on **Plus Jakarta Sans**, utilizing its geometric clarity, tight apertures, and modern horizontal proportions. 

Headings command strong presence with negative letter-spacing and tight line-heights, punctuated occasionally by dynamic colored keyword accents (`#FF6600`). Micro-labels (category trackers, step counters, and pre-headers) are styled in uppercase `label-sm` with deliberate tracking (`0.08em`) to guarantee legible parsing on handheld screens in retail environments.

## Layout & Spacing

The layout is constructed on a max-width container of `1160px` with a 12-column fluid grid on desktop and tablet, collapsing to a single-column stacked layout on mobile viewports (< 768px). 

Key rhythm rules:
- Sections alternate between light (`#FAF9F7`) airy expanses and high-impact dark (`#111111`) blocks.
- Vertical section spacing scales strictly with `space-2xl` on mobile devices and `space-3xl` on desktop.
- Structural cards maintain uniform internal padding: `space-lg` for standard feature cells and `space-xl` for hero pricing or wallet presentation cards.

## Elevation & Depth

This system avoids heavy drop shadows, adopting modern structural depth through layered neutral surfaces, crisp borders, and subtle ambient groundings:
- **Surface Layering:** The base page sits at `#FAF9F7`. Cards rest on top as `#FFFFFF`, bordered by a subtle 1px stroke of `#EFECE6`.
- **Card Ambient Lift:** Raised cards (e.g., interactive feature cards and pricing tiers) employ an ultra-diffused, tinted shadow: `0 12px 32px -8px rgba(17, 17, 17, 0.04), 0 2px 6px 0 rgba(17, 17, 17, 0.02)`.
- **Dark Mode Elevation:** Within dark sections (`#111111`), secondary interactive containers (accordion panels, code blocks) step up to `#1A1A1A` with a 1px border of `rgba(255, 255, 255, 0.08)`.
- **Physical Metaphor (Wallet Pass):** The digital loyalty pass UI utilizes realistic hardware presentation with edge-radii matching Apple & Google Wallet specifications, accented by subtle rim-lighting and ambient glow corresponding to the store's primary brand accent.

## Shapes

The design system establishes a unified corner radius scale:
- **Standard UI Elements & Buttons:** `0.5rem` (`roundedness: 2`) for crisp, approachable tactility.
- **Cards, Panels & Containers:** `1rem` (`rounded-lg`) ensuring a friendly, polished aesthetic that matches smartphone hardware.
- **Pills & Status Badges:** `9999px` (full pill radius) for badges, metric tags, and floating pill navigations.
- **Digital Loyalty Passes:** `1.25rem` strictly replicating the native iOS Wallet pass silhouette.

## Components

### Buttons
- **Primary CTA:** Background `#FF6600`, text `#FFFFFF`, font `label-md`, radius `0.5rem`, padding `0.875rem 1.5rem`. Accompanied by a right-aligned directional arrow icon. Hover state transitions smoothly to `#E65C00`.
- **Secondary CTA:** Background `#FFFFFF`, text `#111111`, border `1px solid #EFECE6`. Hover shifts to `#F5F3ED`.
- **Inverted Dark CTA:** For dark-theme sections, background `#FFFFFF`, text `#111111`, with instant visual punch.

### Badges & Category Trackers
- Pill shape (`rounded-full`), padding `0.25rem 0.75rem`.
- Font `label-sm`, uppercase tracking.
- Pre-header banners feature an orange bullet dot (`●`), background `#FFF4ED`, text `#FF6600`, and border `1px solid #FFE2D1`.

### Feature & Step Cards
- Pure white (`#FFFFFF`) background, 1px border in `#EFECE6`, corner radius `1rem`.
- Step cards incorporate bold numbered counters (`01`, `02`, `03`) in `#FF6600` `label-md` uppercase.
- Feature cards house a `40x40px` soft-orange icon container (`#FFF4ED`) with matching geometric stroke icons in `#FF6600`.

### Digital Wallet Preview Card
- Simulates native Apple Wallet / Google Wallet pass geometry.
- Aspect ratio approximately 1:1.5 inside a realistic smartphone mockup chassis.
- Features standard merchant header, tier label, dynamic customer barcode/QR block, and live stamp progress markers (e.g. "10ème boisson offerte").

### Metric & Social Proof Chips
- Inline pills combining tertiary emerald indicator dots (`#2F8F68`) with merchant names (e.g., "Café El Aurassi", "Pizzeria Bab Ezzouar").
- Statistical counter groups with bold numerical metrics (`headline-md`) stacked over muted labels (`body-sm`).

### FAQ Accordions (Dark Section)
- Container background `#1A1A1A`, border `1px solid rgba(255, 255, 255, 0.08)`, corner radius `0.75rem`.
- Questions in `headline-sm` with white text (`#FFFFFF`).
- Answers formatted in `body-md` using `#A0A0A0` for comfortable contrast and legibility.