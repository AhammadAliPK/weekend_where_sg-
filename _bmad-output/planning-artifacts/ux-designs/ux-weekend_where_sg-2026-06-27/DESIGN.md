---
title: WeekendWhere SG Design System
status: final
created: 2026-06-27
updated: 2026-06-27
author: Ahammad Ali
project: weekend_where_sg
purpose: Singapore-centric visual identity for outdoor decision assistant

colors:
  primary:
    name: Tropical Green
    value: "#3C5D4F"
    light: "#5A7A68"
    dark: "#2A4138"
    usage: Primary backgrounds, card surfaces, main identity
  secondary:
    name: Warm Wood
    value: "#D4A574"
    light: "#E5C4A0"
    dark: "#B88D5A"
    usage: Secondary backgrounds, borders, supporting elements
  accent:
    name: Singapore Red
    value: "#E63946"
    light: "#FF6B6B"
    dark: "#C12937"
    usage: Action buttons, highlights, energy signals (from flag)
  orchid:
    name: National Orchid
    value: "#9B5DE5"
    light: "#B79CF0"
    dark: "#7D4BB5"
    usage: Special features, premium accents (local flora)
  success:
    name: Lush Green
    value: "#4CAF50"
    usage: Great verdict, positive outcomes
  warning:
    name: Sunset Orange
    value: "#FF9800"
    usage: Caution, conditions check
  neutral:
    name: Urban Concrete
    value: "#6B7280"
    usage: Secondary text, subtle elements
  background:
    primary: "#FAF9F6"
    secondary: "#FFFFFF"
    tertiary: "#F5F4EF"
  text:
    primary: "#1A1A1A"
    secondary: "#666666"
    muted: "#999999"

typography:
  font_family:
    primary: "Inter, sans-serif"
    secondary: "Noto Sans, sans-serif"
    malay: "Noto Sans Arabic, sans-serif"
    tamil: "Noto Sans Tamil, sans-serif"
    mono: "Roboto Mono, monospace"
  scale:
    xs: "14px / 20px"
    sm: "16px / 24px"
    base: "18px / 28px"
    lg: "20px / 30px"
    xl: "24px / 34px"
    "2xl": "28px / 38px"
    "3xl": "32px / 42px"
  weights:
    normal: 400
    medium: 500
    semibold: 600
    bold: 700

rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"

components:
  buttons:
    variant: "solid"
    rounded: "{rounded.md}"
    padding: "{spacing.md} {spacing.lg}"
  cards:
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    shadow: "elevated"
  badges:
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} {spacing.sm}"
---

# WeekendWhere SG Design System

## Brand & Style

**Identity:** Singapore outdoor decision assistant — practical optimism, garden city DNA.

**Brand Personality:**
- Efficient like Singapore's transport systems
- Multicultural warmth in every interaction
- Garden city greenery as inspiration
- Practical, like hawker center ordering
- Clean, like our urban landscapes

**Voice:** Concise like MRT announcements, helpful like hawker center vendors, explainable like our efficient systems. Every recommendation carries its reasoning explicitly — Singapore style: clear, practical, no ambiguity.

**Singapore Design Philosophy:**
- **Garden City DNA:** Lush greens, tropical colors, natural harmony
- **Multicultural Vibrancy:** Colors that reflect our diverse heritage
- **Urban Efficiency:** Clean layouts, quick decisions, minimal friction
- **Tropical Modern:** Contemporary with local warmth, not sterile

**Atmosphere:**
- Fresh = Weekend anticipation, outdoor energy
- Calm = Peaceful nature, escape from city
- Practical = Trustworthy, reliable, Singapore efficiency

**Design Philosophy:** Clean and minimal. No heavy decoration. Colors and layout carry the identity.

---

## Colors

### Core Palette

| Token | Name | Value | Usage |
|-------|------|-------|-------|
| `{colors.primary}` | Tropical Green | `#3C5D4F` | Primary backgrounds, card surfaces, main identity |
| `{colors.secondary}` | Warm Wood | `#D4A574` | Secondary backgrounds, borders, supporting elements |
| `{colors.accent}` | Muted Orchid | `#9B5DE5` | Action buttons, highlights, verdict badges |
| `{colors.neutral}` | Warm Sand | `#F5F1E8` | Page backgrounds, subtle surfaces |

### Text Colors

| Token | Name | Value | Usage |
|-------|------|-------|-------|
| `{colors.text.primary}` | Near Black | `#1A1A1A` | Headlines, primary text |
| `{colors.text.secondary}` | Warm Gray | `#666666` | Body text, descriptions |
| `{colors.text.muted}` | Soft Gray | `#999999` | Secondary labels, metadata |

### Semantic Colors

| Token | Name | Value | Context |
|-------|------|-------|---------|
| Verdict: Perfect | `{colors.primary}` | `#3C5D4F` | Score 9+, "Perfect weekend pick" |
| Verdict: Great | `{colors.primary}` | `#3C5D4F` | Score 7-8, "Great choice" |
| Verdict: Good | `{colors.secondary}` | `#D4A574` | Score 5-6, "Good option" |
| Verdict: Caution | `{colors.warning}` | `#FF9800` | Score 3-4, "Okay, check conditions" |
| Verdict: Avoid | `{colors.accent}` | `#E63946` | Score <3, "Maybe choose another" |

### Singapore Identity Rationale

- **Tropical Green (`#3C5D4F`)** — Garden City DNA, lush parks, nature reserves, Botanic Gardens. Fresh, outdoor, natural.
- **Warm Wood (`#D4A574`)** — Heritage warmth, grounded, calming, practical.
- **Singapore Red (`#E63946`)** — Flag color, national energy, festival vibrancy, urgency signals.
- **National Orchid (`#9B5DE5`)** — Papilionanthe Miss Joaquim, distinctive but calm, premium accent.
- **Warm Sand (`#F5F1E8`)** — Coastal beaches, clean, practical backdrop.

---

## Typography

### Font Stack

**Primary:** `Inter, system-ui, -apple-system, sans-serif`

**Why Inter:** Clean, modern, minimal, excellent screen readability, neutral canvas for Singapore colors to shine.

### Typography Scale

| Size | Line Height | Usage |
|------|-------------|-------|
| `{typography.scale.xs}` | 14px / 20px | Small labels, metadata |
| `{typography.scale.sm}` | 16px / 24px | Body text, descriptions |
| `{typography.scale.base}` | 18px / 28px | [ASSUMPTION] Base UI text, card content |
| `{typography.scale.lg}` | 20px / 30px | Subheadings, emphasis |
| `{typography.scale.xl}` | 24px / 34px | Section headings |
| `{typography.scale.2xl}` | 28px / 38px | Page titles |
| `{typography.scale.3xl}` | 32px / 42px | Hero, marketing headers |

### Font Weights

| Weight | Usage |
|--------|-------|
| 400 (Normal) | Body text, descriptions |
| 500 (Medium) | Emphasized content, card metadata |
| 600 (Semibold) | Headings, labels, buttons |
| 700 (Bold) | Hero titles, strong emphasis |

### Typography Guidelines

- **Headings:** Semibold or Bold, tight tracking (-0.01em)
- **Body:** Regular or Medium, comfortable leading (1.4-1.6)
- **Buttons:** Semibold, uppercase, letter-spacing (0.05em)
- **Metadata:** Regular, muted color, smaller size

### Singapore Language Considerations

- **Singlish-friendly:** Clear, simple language (no complex idioms)
- **Multilingual support:** English primary, Chinese/Malay/Tamil labels for key features
- **Aging population:** Larger fonts, higher contrast, clear typography
- **Outdoor readability:** Optimized for Singapore's bright sunlight conditions

### Cultural Considerations

- **Multilingual labels:** Key UI elements support English, Chinese, Malay, Tamil
- **Religious sensitivity:** Avoid imagery that may conflict with cultural/religious norms
- **Food-centered activities:** Recognize that "going out" often means hawker centers/food
- **Community focus:** Emphasize family, group activities over individual pursuits
- **Practical efficiency:** Time-conscious decisions like transport planning

---

## Layout & Spacing

### Spacing Scale

8px base system, powers of 2.

| Token | Value | Usage |
|-------|-------|-------|
| `{spacing.xs}` | 4px | Tight gaps, icon spacing |
| `{spacing.sm}` | 8px | Small padding, compact gaps |
| `{spacing.md}` | 16px | Default padding, card gutters |
| `{spacing.lg}` | 24px | Section gaps, comfortable padding |
| `{spacing.xl}` | 32px | Major sections, large gaps |
| `{spacing.2xl}` | 48px | Screen margins |
| `{spacing.3xl}` | 64px | Hero spacing |

### Container Widths

| Breakpoint | Max Width |
|------------|-----------|
| Mobile (< 640px) | 100% |
| Tablet (640px - 1024px) | 640px |
| Desktop (1024px+) | 1024px |

### Grid System

12-column grid for desktop, 4-column for tablet, single-column for mobile.

---

## Elevation & Depth

### Shadow System

| Token | Context | Usage |
|-------|---------|-------|
| None | Flat | Buttons, default state |
| Subtle | `{colors.neutral}` offset 0 1px 2px | Cards, surfaces |
| Elevated | `{colors.neutral}` offset 0 4px 8px | Hover states, focus |
| Raised | `{colors.neutral}` offset 0 8px 16px | Modals, dropdowns |

### Elevation Guidelines

- **Cards:** Subtle shadow, elevation on hover
- **Buttons:** No shadow (flat), elevated on hover
- **Modals:** Raised shadow, clear depth
- **Recommendation cards:** Subtle + elevated on interaction

---

## Shapes

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `{rounded.sm}` | 6px | Buttons, badges, small elements |
| `{rounded.md}` | 8px | Cards, inputs, containers |
| `{rounded.lg}` | 12px | Hero sections, large cards |
| `{rounded.xl}` | 16px | Modals, special containers |

### Shape Guidelines

- **Buttons:** 6px radius (friendly but precise)
- **Cards:** 8px radius (balanced, modern)
- **Hero elements:** 12-16px radius (softer, welcoming)

---

## Components

### Buttons

**Primary Button:**
- Background: `{colors.accent}` (Singapore Red)
- Text: White, Semibold, uppercase
- Radius: `{rounded.sm}` (6px)
- Padding: `{spacing.md}` `{spacing.lg}` (16px 24px)
- Hover: Elevated shadow, slight brightness
- Active: Subtle scale (0.98)

**Secondary Button:**
- Background: Transparent
- Border: 1px solid `{colors.secondary}` (Warm Wood)
- Text: `{colors.secondary}`, Semibold, uppercase
- Same radius, padding, hover behavior

### Recommendation Cards

**Card Structure:**
- Background: White or `{colors.neutral}` (Warm Sand)
- Radius: `{rounded.md}` (8px)
- Padding: `{spacing.lg}` (24px)
- Shadow: Subtle (default), Elevated (hover)

**Card Content:**
- Park Name: Bold, `{typography.scale.lg}`, `{colors.text.primary}`
- Region: Medium, `{typography.scale.sm}`, `{colors.text.secondary}`
- Score Badge: Background based on verdict, white text, `{rounded.sm}`
- Verdict: Semibold, `{typography.scale.base}`, verdict color
- Reasons: Bullet list, Regular, `{typography.scale.sm}`, `{colors.text.secondary}`
- Signals: Small badges, `{rounded.sm}`, muted colors

### Verdict Badges

**Badge Styles:**
- Perfect/Great: `{colors.primary}` background, white text
- Good: `{colors.secondary}` background, white text
- Caution: `{colors.accent}` background, white text
- Avoid: `#E63946` background, white text
- Radius: `{rounded.sm}` (6px)
- Padding: `{spacing.xs}` `{spacing.sm}` (4px 8px)

### Form Elements

**Selectors (Region, Activity, Preference):**
- Style: Pill-shaped buttons or dropdown (shadcn-svelte base, customized)
- Selected: `{colors.primary}` background, white text
- Unselected: Light gray background, `{colors.text.secondary}` text
- Radius: `{rounded.md}` (8px)
- Transition: 300ms ease-in-out

---

## Do's and Don'ts

### Do

✅ **Keep cards concise** — Max 3-4 lines of visible content, collapse details
✅ **Show reasons transparently** — Every recommendation explains why
✅ **Use generous whitespace** — Breathing room makes recommendations feel calm
✅ **Maintain color hierarchy** — Primary > Secondary > Accent, don't overuse accent
✅ **Ensure WCAG AA contrast** — All text passes accessibility standards
✅ **Use local iconography** — MRT symbols, recognizable park silhouettes where relevant
✅ **Keep animations subtle** — 300ms transitions, no jarring movements

### Don't

❌ **Overload cards** — Don't stuff every signal into visible card content
❌ **Use more than 3 accent colors per screen** — Maintain visual calm
❌ **Hide the "why"** — Never show a score without reasons
❌ **Use generic stock imagery** — If using parks, use actual Singapore photos
❌ **Sacrifice readability for aesthetics** — Younger audience still needs clarity
❌ **Over-animate** — Keep motion minimal, practical
❌ **Break color semantics** — Green = good/great, Red = avoid, keep consistent

---

## Do's and Don'ts — Singapore Context

### Do

✅ **Use local terminology** — "Park connector," "heartland," "MRT," "hawker center" where natural
✅ **Show cultural sensitivity** — Recognize diversity, avoid assumptions
✅ **Emphasize family and community** — Group activities, family-friendly options prominent
✅ **Reference familiar locations** — Mention landmarks (MRT stations, neighborhoods) for context
✅ **Consider food context** — "Good for cycling near hawker centers" or similar practical combos
✅ **Use multilingual labels** — Chinese/Malay/Tamil for key features where space allows
✅ **Respect religious norms** — Avoid imagery that may conflict with cultural/religious practices

### Don't

❌ **Use Singlish in UI labels** — Keep English standard, Singlish in microcopy only if natural
❌ **Assume English fluency** — Clear, simple language for non-native speakers
❌ **Ignore aging users** — Even with younger audience, some may plan for parents/elders
❌ **Over-use national symbols** — Flag/merlion/orchid should be subtle, not overwhelming
❌ **Stereotype neighborhoods** — Avoid generalizations about regions or communities
❌ **Forget practical constraints** — Singapore heat, rain, crowds are real factors

---

## [ASSUMPTION] Tags Requiring Validation

- **Base font size:** 18px for body text — assumes younger audience doesn't need larger text. Validate with user testing.
- **Dark mode:** Skipped for MVP — may be requested by users. Monitor feedback.
- **Motion/animation:** Kept minimal — may feel too static for some users. Test engagement.
- **Pattern usage:** Minimal decorative elements — may feel "not Singapore enough." Test cultural resonance.

---

*End of DESIGN.md Draft — Status: Draft, pending review and iteration*
