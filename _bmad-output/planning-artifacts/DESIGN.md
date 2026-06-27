---
title: DESIGN: WeekendWhere SG
status: draft
created: 2026-06-27
updated: 2026-06-27
# Tokens — visual identity decisions
colors:
  - primary: "#3C5D4F" - Singapore garden city green (lush tropical)
  - secondary: "#D4A574" - Tropical wood/earth tone (local warmth)
  - accent: "#E63946" - Singapore red (from flag, energy)
  - orchid: "#9B5DE5" - National orchid purple (local flora)
  - success: "#4CAF50" - Lush green (positive outcomes)
  - warning: "#FF9800" - Tropical sunset (caution)
  - neutral: "#6B7280" - Urban concrete (practical)
  - background: "#FAF9F6" - Paper white (clean canvas)
typography:
  - heading: "Inter, sans-serif"
  - body: "Inter, sans-serif"
  - mono: "Roboto Mono, monospace"
rounded:
  - card: "8px"
  - button: "6px"
  - input: "4px"
spacing:
  - xs: "4px"
  - sm: "8px"
  - md: "16px"
  - lg: "24px"
  - xl: "32px"
components:
  - selector: "dropdown with chevron"
  - card: "elevated with shadow"
  - button: "rounded with hover state"
---

# DESIGN: WeekendWhere SG

## Brand & Style

WeekendWhere SG embodies **Singapore's practical optimism** — the confidence that there's always a good outdoor option waiting in our garden city. The visual language balances Singapore's tropical greenery, multicultural warmth, and the efficiency of our decision-making culture.

**Brand personality:**
- Efficient like Singapore's transport systems
- Multicultural warmth in every interaction
- Garden city greenery as inspiration
- Practical, like hawker center ordering
- Clean, like our urban landscapes

**Singapore Design Philosophy:**
- **Garden City DNA:** Lush greens, tropical colors, natural harmony
- **Multicultural Vibrancy:** Colors that reflect our diverse heritage
- **Urban Efficiency:** Clean layouts, quick decisions, minimal friction
- **Tropical Modern:** Contemporary with local warmth, not sterile

**Voice:** Concise like MRT announcements, helpful like hawker center vendors, explainable like our efficient systems. Every recommendation carries its reasoning explicitly — Singapore style: clear, practical, no ambiguity.

## Colors

### Primary Palette — Garden City Greens
```css
--color-primary: #3C5D4F;        /* Singapore tropical green - main actions */
--color-primary-light: #5A7A68;  /* Lighter garden green */
--color-primary-dark: #2A4138;   /* Deep rainforest green */
```
*Inspired by: Botanic Gardens' rainforest canopy, Gardens by the Bay's supertrees*

### Secondary Palette — Tropical Warmth
```css
--color-secondary: #D4A574;      /* Tropical wood/earth - information */
--color-secondary-light: #E5C4A0;
--color-secondary-dark: #B88D5A;
```
*Inspired by: Heritage shophouses, traditional teak furniture, warm earth tones*

### Accent Colors — Singapore Energy
```css
--color-accent: #E63946;         /* Singapore red - highlights, CTAs */
--color-accent-light: #FF6B6B;
--color-accent-dark: #C12937;
```
*Inspired by: Singapore flag red, national energy, festival vibrancy*

### Special Palette — Local Flora
```css
--color-orchid: #9B5DE5;         /* National orchid purple - special features */
--color-orchid-light: #B79CF0;
--color-orchid-dark: #7D4BB5;
```
*Inspired by: Papilionanthe Miss Joaquim (Singapore's national flower)*

### Semantic Colors — Tropical Context
```css
--color-success: #4CAF50;        /* Lush green - great verdict */
--color-warning: #FF9800;        /* Sunset orange - caution needed */
--color-error: #E63946;           /* Tropical alert - poor conditions */
--color-neutral: #6B7280;        /* Urban concrete - secondary text */
```

### Backgrounds — Urban Canvas
```css
--color-bg-primary: #FAF9F6;     /* Paper white - main background */
--color-bg-secondary: #FFFFFF;    /* Clean white - card background */
--color-bg-tertiary: #F5F4EF;    /* Warm off-white - elevated surfaces */
```
*Inspired by: Clean modern architecture, white HDB facades, gallery minimalism*

## Typography

### Type Stack — Multilingual Singapore
- **Primary:** Inter (Google Fonts) — Clean, modern, highly legible
- **Secondary:** Noto Sans (Google Fonts) — Better Chinese character rendering
- **Malay Support:** Noto Sans Arabic (for Jawi script compatibility)
- **Tamil Support:** Noto Sans Tamil (South Indian languages)
- **Monospace:** Roboto Mono (for technical labels, MRT codes)

### Scale — Readable for All Ages
```css
--font-size-xs: 0.875rem;   /* 14px - captions (increased for aging population) */
--font-size-sm: 1rem;        /* 16px - body (WCAG AAA preferred) */
--font-size-base: 1.125rem;  /* 18px - default (mobile-optimized) */
--font-size-lg: 1.25rem;     /* 20px - emphasis */
--font-size-xl: 1.5rem;      /* 24px - headings */
--font-size-2xl: 1.75rem;    /* 28px - section headers */
```
*Singapore context: Larger base sizes for diverse age groups, outdoor readability*

### Weights
```css
--font-weight-normal: 400;    /* Regular body text */
--font-weight-medium: 500;    /* Emphasis without shouting */
--font-weight-semibold: 600;  /* Important information */
--font-weight-bold: 700;      /* Headlines and CTAs */
```

### Hierarchy
- **H1:** 2xl, Bold, Primary color (app title)
- **H2:** xl, Semibold, Primary color (section headers)
- **H3:** lg, Semibold, Secondary color (card titles)
- **Body:** base, Normal, Neutral (content)
- **Caption:** xs, Medium, Neutral (meta info)

### Singapore Language Considerations
- **Singlish-friendly:** Clear, simple language (no complex idioms)
- **Multilingual support:** English primary, Chinese/Malay/Tamil labels for key features
- **Aging population:** Larger fonts, higher contrast, clear typography
- **Outdoor readability:** Optimized for Singapore's bright sunlight conditions

## Layout & Spacing

### Container Width
- **Mobile:** 100% (full width)
- **Tablet:** max 640px centered
- **Desktop:** max 800px centered

### Spacing Scale
```css
--space-xs: 4px;   /* Tight packing */
--space-sm: 8px;   /* Related elements */
--space-md: 16px;  /* Standard spacing */
--space-lg: 24px;  /* Section separation */
--space-xl: 32px;  /* Major divisions */
```

### Component Padding
- **Card:** md all around
- **Selector:** sm vertical, md horizontal
- **Button:** sm vertical, lg horizontal
- **Section:** lg top/bottom

## Elevation & Depth

### Shadow Levels
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 2px 8px rgba(0,0,0,0.1);
--shadow-lg: 0 4px 16px rgba(0,0,0,0.15);
```

### Elevation Usage
- **Ground:** No shadow (background)
- **Cards:** md shadow
- **Selectors:** sm shadow, elevated on focus
- **Modals:** lg shadow

## Shapes

### Border Radius
```css
--radius-card: 8px;   /* Recommendation cards */
--radius-button: 6px; /* Buttons and dropdowns */
--radius-input: 4px; /* Form elements */
--radius-badge: 12px; /* Verdict badges */
```

### Border Treatment
- **Cards:** 1px solid, color: neutral-200
- **Inputs:** 1px solid, color: neutral-300
- **Buttons:** No border, background fill

## Components

### Selector (Dropdown)
**Visual:**
- Background: white
- Border: 1px solid neutral-300
- Border radius: 4px
- Padding: sm vertical, md horizontal
- Chevron: right-aligned, neutral color
- Hover: border color neutral-400
- Focus: border color primary, sm shadow

### Recommendation Card
**Visual:**
- Background: white
- Border: 1px solid neutral-200
- Border radius: 8px
- Padding: md
- Shadow: md
- Hover: lift slightly (shadow-lg)

**Card Internal Structure:**
- **Header:** Park name (lg, semibold) + Region badge (xs, medium)
- **Verdict:** Colored badge, rounded-full, bold text
- **Score:** Large numeric (2xl) + label (sm)
- **Reasons:** Bullet list, neutral color
- **Signals:** Small badges, muted colors

### Button
**Visual:**
- Background: primary
- Color: white
- Border radius: 6px
- Padding: sm vertical, lg horizontal
- Font weight: medium
- Hover: primary-dark
- Active: primary-dark with sm scale

### Badge/Verdict
**Visual:**
- Rounded-full (12px radius)
- Padding: xs vertical, sm horizontal
- Font size: xs
- Font weight: medium

**Colors by verdict:**
- Perfect: success background, white text
- Great: primary background, white text
- Good: primary-light background, white text
- Okay: warning background, white text
- Poor: error background, white text

## Do's and Don'ts — Singapore Context

### Do
✓ Use tropical colors sparingly for emphasis (garden city inspiration)
✓ Keep recommendation cards concise (like efficient Singapore systems)
✓ Show reasons as simple bullets (practical, no-nonsense)
✓ Use color to reinforce verdict (like MRT line colors)
✓ Maintain generous whitespace (clean, uncluttered like modern Singapore)
✓ Ensure text contrast meets WCAG AA standards (aging population friendly)
✓ Include multilingual labels where appropriate (Chinese/Malay/Tamil)
✓ Consider outdoor viewing conditions (bright Singapore sunlight)

### Don't
✗ Don't use more than 3 colors per card (keep it clean)
✗ Don't hide the "why" behind interactions (transparency is key)
✗ Don't use generic nature photos (use local parks, recognizable landmarks)
✗ Don't overwhelm with data (efficiency over complexity)
✗ Don't use Western-only idioms (keep it locally relevant)
✗ Don't sacrifice readability for decoration (function over form)
✗ Don't ignore aging population needs (larger fonts, clear contrast)

## Singapore Design Patterns

### Local Iconography
- **Parks:** Use recognizable Singapore park silhouettes (Supertrees, Merlion Park, East Coast)
- **Transport:** MRT-style symbols for location guidance
- **Weather:** Tropical storm icons (not generic snow/ice)
- **Activities:** Local context (hawker center seating, void deck spaces)

### Cultural Considerations
- **Multilingual:** Key labels in English + Chinese/Malay/Tamil where space permits
- **Age-friendly:** Larger fonts, higher contrast for aging population
- **Family-oriented:** Emphasis on multi-generational activities
- **Food-centered:** Many outdoor plans revolve around hawker centers/food parks
- **Religious sensitivity:** Avoid pork/alcohol references in family activity suggestions

### Practical Singapore Elements
- **MRT Integration:** Future references to nearest MRT stations
- **HDB Context:** Include heartland parks vs. city center distinctions
- **Weather Awareness:** Heavy rain warnings (tropical climate consideration)
- **Timing:** Morning/evening activity preferences (avoid midday heat)
- **Accessibility:** Barrier-free entrance information (wheelchair-friendly parks)

### Local Terminology (Use in Copy)
- **"Heartland"** instead of "suburban" for HDB neighborhoods
- **"Town"** instead of "area" (Ang Mo Kio, Tampines, etc.)
- **"Park connector"** instead of "trail" (local terminology)
- **"Morning/Evening"** instead of "AM/PM" (more natural phrasing)
- **"Sheltered"** for rain-protected areas

## Responsive Behavior

### Mobile (< 640px)
- Full-width cards
- Stacked selectors (vertical)
- Simplified card details

### Tablet (640px - 1024px)
- Centered container, max 640px
- Side-by-side selectors where space permits
- Full card details visible

### Desktop (> 1024px)
- Centered container, max 800px
- All selectors in one row
- Maximum card information density

## Accessibility

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Verdict badges use text + background contrast
- Interactive elements have clear focus states

### Focus States
- All interactive elements: 2px primary outline
- Focus visible on keyboard navigation
- Skip to content link available

### Touch Targets
- Minimum 44x44px for all interactive elements
- Adequate spacing between touch targets
- Clear visual feedback on touch

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for custom components
- Verdict and score announced together
- Reasons list announced as grouped related items
