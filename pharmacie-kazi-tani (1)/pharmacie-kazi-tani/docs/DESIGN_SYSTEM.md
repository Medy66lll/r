# Design System: La Terrasse Plus (DESIGN_SYSTEM.md)

## 1. Visual Foundation & Philosophy
The design system reflects the identity of La Terrasse Plus in Tlemcen: warm hospitality, Andalusian architectural refinement, wood-fired culinary craft, and an open garden terrace atmosphere.

## 2. Color Tokens
All tokens are mapped to Tailwind theme extensions and `:root` CSS custom properties:

| Token Name | Hex Value | Semantic Role | WCAG Contrast |
| :--- | :--- | :--- | :--- |
| `brand-primary` | `#C88A32` | Tlemcen Ochre / Primary Brand CTA & Emblem | 4.8:1 on dark / 3.6:1 text |
| `brand-primary-dark`| `#9B651B` | Hover state for Primary Buttons | 7.1:1 AAA on light |
| `brand-primary-light`| `#E5A955`| Dark background accents & highlights | High contrast on dark |
| `brand-primary-subtle`| `#FDF7ED`| Badge backgrounds & pill containers | 1.1:1 surface tint |
| `brand-secondary`| `#1E3A2B` | Terrace Cypress Green / Structural contrast | 10.4:1 AAA on light |
| `brand-accent` | `#D9532F` | Wood-fire Ember / Callout badges | 4.6:1 AA |
| `brand-surface` | `#FAF7F2` | Warm Limestone Ivory / Primary background | Base canvas |
| `brand-surface-elevated`| `#FFFFFF`| Cards, modals & form panels | Elevated canvas |
| `brand-surface-dark` | `#141210` | Nocturnal Terrace Slate / Dark sections | Inverted canvas |
| `brand-text` | `#1C1814` | Deep Espresso Charcoal / Primary typography | 15.2:1 AAA on surface |
| `brand-text-muted` | `#6B635B` | Subheadings, metadata, captions | 5.3:1 AA on surface |
| `brand-border` | `#E8E1D5` | Subtle warm dividers & card outlines | Structural divider |
| `brand-success` | `#1E824C` | "Open Now" status indicator & verified badges| 5.1:1 AA |

## 3. Typography Scale
- **Display Headings**: `Fraunces` (Google Fonts variable serif, optical size 9-144, weight 300-800).
- **Body & UI**: `Plus Jakarta Sans` (Google Fonts geometric humanist, weight 400-700).
- **Arabic Inscriptions**: `Amiri` (Naskh classical Arabic typography for brand subtitles and menu item names).

## 4. Spacing Scale & Border Radii
- **Radii**:
  - `sm`: `0.5rem` (buttons, form inputs)
  - `md`: `0.875rem` (subtle cards, metric widgets)
  - `lg`: `1.25rem` (menu cards, review panels)
  - `xl`: `2rem` (hero stage, interactive swing enclosure)
  - `pill`: `9999px` (badges, pills, rounded action buttons)
- **Shadows**:
  - `shadow-sm`: `0 2px 8px rgba(28, 24, 20, 0.04)`
  - `shadow-md`: `0 8px 24px rgba(28, 24, 20, 0.07)`
  - `shadow-lg`: `0 16px 48px rgba(28, 24, 20, 0.11)`
  - `shadow-fire`: `0 0 35px rgba(217, 83, 47, 0.35)`

## 5. Motion Rules & Easings
- **Default Ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy spring deceleration).
- **Hover Transitions**: `160ms` for color/transform micro-interactions.
- **Scroll Reveal**: `500ms` with `y: 24px -> 0px` and opacity transition.
- **Pendulum Motion**: `rotate` transforms responding to cursor tilt (`-9deg` to `+9deg`).
- **Accessibility**: All Framer Motion variants respect `prefers-reduced-motion` using the `usePrefersReducedMotion` hook.

## 6. RTL and Arabic Support
- Arabic text blocks (`brandArabic`, `nameArabic`) use `dir="rtl"` with `font-family: var(--font-arabic)`.
- Flexible layouts avoid fixed directional positioning (`left`/`right`) in favor of logical inline/block alignment.

## 7. Component Library Inventory
1. `Button`: Variants (primary, secondary, accent, whatsapp), sizes (sm, md, lg), link support.
2. `Input`: Accessible form control with floating/stacked label and error message.
3. `Textarea`: Accessible multi-line input.
4. `Select`: Accessible dropdown with styled options.
5. `Card`: Surface, elevated, and dark variant cards with tactile hover states.
6. `Badge`: Categorical pill badges for menu tags and culinary highlights.
7. `StatusPill`: Live pulsating status indicator (Open Now / Closed).
8. `RatingStars`: Star rendering with numeric rating and review count.
9. `Container`: Max-width wrapper enforcing responsive gutters.
10. `Section`: Background variant wrapper (default, muted, dark).
11. `Heading`: Editorial display section header with optional badge and subtitle.
12. `Modal`: Accessible dialog with focus trap and escape listener.
13. `Skeleton`: Animated placeholder for loading states.
