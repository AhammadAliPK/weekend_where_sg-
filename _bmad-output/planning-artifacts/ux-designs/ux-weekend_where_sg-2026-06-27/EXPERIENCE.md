---
title: WeekendWhere SG Experience Design
status: final
created: 2026-06-27
updated: 2026-06-27
author: Ahammad Ali
project: weekend_where_sg
purpose: Information architecture, interaction patterns, and behavioral guidelines
---

# WeekendWhere SG Experience Design

## Foundation

**Form Factor:** Multi-surface (phone + tablet + desktop)

**UI System:** shadcn-svelte (heavily customized for Singapore identity)

**Design Reference:** `{DESIGN.md}` — All visual tokens (colors, typography, spacing, rounded) defined there

**Tech Stack:** SvelteJS + shadcn-svelte + Turborepo + TypeScript

**Platform:** Web (progressive web app capable)

---

## Information Architecture

### Screen Structure

**Single-Page Application Flow:**

```
┌─────────────────────────────────────────┐
│ HEADER: Logo + Title                    │
├─────────────────────────────────────────┤
│ CONTROL PANEL (Top)                     │
│ ├─ Region Selector                     │
│ ├─ Activity Selector                    │
│ └─ Preference Selector                  │
├─────────────────────────────────────────┤
│ STATE DISPLAY (Middle)                  │
│ ├─ Loading State                        │
│ ├─ Error State                          │
│ └─ Empty State                          │
├─────────────────────────────────────────┤
│ RECOMMENDATION STACK (Bottom)          │
│ └─ Scrollable Card List                 │
└─────────────────────────────────────────┘
```

### IA Surfaces

| Surface | Purpose | Navigation |
|---------|---------|------------|
| **Main Screen** | Core recommendation flow | Single-page, no navigation |
| **Recommendation Card** | Individual park details | Tap to expand (future) |
| **Empty State** | No results guidance | Suggest changing filters |

**IA Closure:** All user needs delivered through single-screen progressive flow. No multi-page navigation in MVP.

---

## Voice and Tone

**Singapore Voice:** Concise like MRT announcements, helpful like hawker center vendors, explainable like our efficient systems.

**Microcopy Principles:**
- **Concise:** Max 8 words per label (Singapore efficiency)
- **Actionable:** Tell users what to do, not what happened
- **Optimistic:** Frame recommendations positively
- **Local:** Use Singapore context where natural ("park connector," "MRT stop," "heartland")
- **Explainable:** Every recommendation shows why (no black-box decisions)

**Tone Examples:**

| Context | Voice | Example |
|---------|-------|---------|
| Loading | Actionable | "Finding the best spots..." |
| Error | Optimistic | "Using cached recommendations" |
| Empty | Helpful | "Try adjusting your filters" |
| Success | Celebratory | "Perfect weekend pick!" |
| Reasons | Clear | "Great for cycling because..." |

**What to Avoid:**
- Technical jargon ("API error," "timeout")
- Over-cute language ("Oopsie," "Whoopsie-daisy")
- Passive voice ("Error was encountered")
- Blame language ("You entered invalid input")
- Ambiguity ("Something went wrong" → "Using cached recommendations")

---

## Component Patterns

### Selector Pattern (Region, Activity, Preference)

**Behavior:**
- Visual: Pill-shaped buttons (shadcn-svelte customized with `{DESIGN.md.rounded.md}`)
- Selected state: `{DESIGN.md.colors.primary}` background, white text, elevated shadow
- Unselected: Light gray background, `{DESIGN.md.colors.text.secondary}` text
- Interaction: 300ms ease-in-out transition, no animation overshoot
- Debounce: [ASSUMPTION] 300ms after selection change before API call

**Implementation:**
- Use shadcn-svelte button group or radio group
- Apply Singapore colors via CSS variables
- Ensure 44x44px minimum touch target (accessibility)

### Recommendation Card Pattern

**Behavior:**
- Default: Subtle shadow, `{DESIGN.md.rounded.md}` radius
- Hover: Elevated shadow, slight scale (1.02), 300ms transition
- Tap/Active: Subtle scale (0.98), haptic feedback (mobile)
- Scroll: Smooth scrolling, no momentum snap

**Card Content:**
1. **Park Name** — Bold, `{DESIGN.typography.scale.lg}`, `{DESIGN.colors.text.primary}`
2. **Region** — Medium, `{DESIGN.typography.scale.sm}`, `{DESIGN.colors.text.secondary}`
3. **Score Badge** — Background by verdict, white text, `{DESIGN.rounded.sm}`
4. **Verdict** — Semibold, `{DESIGN.typography.scale.base}`, matches verdict color
5. **Reasons** — Bullet list, Regular, `{DESIGN.typography.scale.sm}`, 2-3 reasons max
6. **Signals** — [ASSUMPTION] Small badges (weather, air quality, route), `{DESIGN.rounded.sm}`

### Button Pattern

**Primary Button (Recommend):**
- Background: `{DESIGN.colors.accent}` (Muted Orchid)
- Text: White, Semibold, uppercase, letter-spacing 0.05em
- Radius: `{DESIGN.rounded.sm}`
- Padding: `{DESIGN.spacing.md}` `{DESIGN.spacing.lg}`
- Hover: Elevated shadow, brightness +5%
- Active: Scale 0.98
- Disabled: 50% opacity, no pointer events

---

## State Patterns

### Loading State

**Trigger:** API call initiated (selector change)

**Visual:**
- Spinner: `{DESIGN.colors.primary}` color, 24px, centered
- Microcopy: "Finding the best spots..." or "Checking conditions..."
- Skeleton: [ASSUMPTION] Optional card skeletons for perceived performance

**Behavior:**
- Disable selectors during load (prevent rapid-fire API calls)
- Show after 200ms delay (avoid flicker for fast responses)
- Timeout after 10s → transition to error state (Singapore efficiency: don't wait forever)

### Error State

**Trigger:** API failure, timeout, or invalid response

**Visual:**
- Icon: Warning icon in `{DESIGN.colors.secondary}` (not alarming red)
- Microcopy: "Using cached recommendations" or "Couldn't fetch live data"
- Subtext: "Showing previous results for {region}" (if available)
- Action: "Try again" button (primary button style)

**Behavior:**
- Graceful degradation — always show cached or fallback data
- Never show technical error messages to users
- Auto-retry: [ASSUMPTION] One automatic retry after 3s

### Empty State

**Trigger:** No recommendations match filters

**Visual:**
- Icon: Search or location icon in `{DESIGN.colors.secondary}`
- Microcopy: "No spots match your filters"
- Subtext: "Try a different region or activity"
- Action: "Reset filters" button

**Behavior:**
- Provide clear guidance on what to do
- Don't blame user ("You have no results" → "No spots match")
- Suggest specific next steps

---

## Interaction Primitives

### Debounce Strategy

**Selector Changes:**
- 300ms debounce after selection change
- Cancels previous pending API call
- Resets if another change occurs within debounce window

**Rationale:** Prevents excessive API calls while feeling responsive. Users who tap quickly won't trigger 5 requests.

### Transitions

**Timing:**
- Hover states: 300ms ease-in-out
- Page load: Fade in 500ms
- Card interactions: Scale 300ms, no bounce

**Easing:**
- Standard: `ease-in-out` (smooth, professional)
- Enter: `ease-out` (feels snappy)
- Exit: `ease-in` (feels natural)

**What to Animate:**
- Card hover/active states
- Selector transitions
- Loading spinner entrance
- Modal/dropdown enter/exit

**What NOT to Animate:**
- Text changes (jarring)
- Color shifts (feels glitchy)
- Layout shifts (causes motion sickness)

### Scroll Behavior

**Recommendation Stack:**
- Smooth scrolling, no snap points
- Infinite scroll: [ASSUMPTION] Not in MVP (pagination or "load more" instead)
- Pull-to-refresh: [ASSUMPTION] Not in MVP (web-focused)

---

## Accessibility Floor

### WCAG AA Compliance

**Contrast:**
- All text: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

**Implementation:**
- Use `{DESIGN.colors}` tokens (already validated for contrast)
- Test with browser dev tools contrast checker
- Verify color combinations in card content

### Keyboard Navigation

**Tab Order:**
1. Region selector
2. Activity selector
3. Preference selector
4. "Recommend" button (if present)
5. First recommendation card
6. Subsequent cards (tab through)

**Focus States:**
- Visible focus ring: 2px solid `{DESIGN.colors.accent}`, offset 2px
- Skip link: Optional for MVP (single-screen app), recommended for accessibility

**Focus Management:**
- Focus trap in modals/dropdowns (future enhancement)
- Focus returns to triggering element after modal close
- No focus loss on dynamic content updates

### Screen Reader Support

**Semantic HTML:**
- `<main>` for recommendation stack
- `<section>` for individual cards
- `<h1>` for page title, `<h2>` for card titles
- `<ul>` + `<li>` for reasons list
- `<button>` for interactive elements

**ARIA Labels:**
- Cards: `aria-label="{park name}, {verdict}, score {score}"`
- Selectors: `aria-label="Select {region/activity/preference}"`
- Loading: `aria-busy="true"`, `aria-live="polite"`
- Errors: `aria-live="assertive"`, `aria-describedby="{error message}"`

**Screen Reader Announcements:**
- Recommendations loaded: `{count} recommendations found for {region}`
- Empty state: `No recommendations match your filters. Try different options.`
- Error state: `Couldn't fetch live data. Showing cached recommendations.`
- Card interaction: `Expanded details for {park name}` (future enhancement)

**Semantic HTML Structure:**
- `<header>` for app title and logo
- `<main>` for recommendation stack
- `<section>` for individual cards with `aria-label`
- `<h1>` for page title, `<h2>` for card titles
- `<nav>` for selector controls (when grouped)
- `<button>` for all interactive elements
- `<ul>` + `<li>` for reasons list

### Touch Targets

**Minimum Size:** 44x44px (WCAG AAA)

**Applied to:**
- Selector buttons
- Card tap areas
- Action buttons
- Interactive badges

---

## Responsive & Platform

### Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, stacked selectors, 1 card per row |
| Tablet | 640px - 1024px | Single column, horizontal selector row, 1-2 cards per row |
| Desktop | 1024px+ | Centered container (max 1024px), horizontal selectors, 2-3 cards per row |

### Mobile Optimizations

**Touch:**
- 44x44px minimum touch targets
- Haptic feedback on card tap
- Pull-to-refresh: [ASSUMPTION] Not in MVP

**Performance:**
- Lazy load card content below fold
- Progressive image loading (if park photos added)
- API response caching (5min TTL)

**Layout:**
- Sticky header on scroll (keeps selectors visible)
- Bottom sheet for expanded card details (future)
- Safe area insets for notched devices

### Desktop Enhancements

**Layout:**
- Max-width container (1024px) to prevent ultra-wide stretching
- Horizontal selector row for efficiency
- Grid-based card layout (2-3 columns)

**Interactions:**
- Hover states elevated
- Keyboard shortcuts (optional future enhancement)
- Larger click targets (no touch constraint)

---

## User Personas

**Maya, 28, Marketing Professional**
- **Lives in:** East Coast (Singapore resident 5 years)
- **Goals:** Quick weekend decisions, active lifestyle
- **Frustrations:** Too many options, analysis paralysis
- **Tech comfort:** High, uses phone for everything
- **Singapore context:** Knows MRT lines, favorite hawker centers, parks by region

**James, 32, Software Engineer**
- **Lives in:** West (expat, 3 years in SG)
- **Goals:** Efficient planning, cycling spots after work
- **Frustrations:** Vague recommendations, unclear why something is suggested
- **Tech comfort:** Very high, data-driven
- **Singapore context:** Learns through exploring, values practical info

**Sarah, 25, Student**
- **Lives in:** Central (lifelong Singapore resident)
- **Goals:** Budget-friendly outings, nature escapes with friends
- **Frustrations:** Expensive options, unclear accessibility
- **Tech comfort:** High, social media native
- **Singapore context:** Knows hidden gems, values authentic local spots

---

## Key Flows

### Flow 1: First-Time User (Weekend Planning)

**Actor: Maya, 28, marketing professional, Singapore resident**

**Emotional Arc:** Curiosity → Anticipation → Delight → Confidence

1. **Saturday morning, 10 AM** — Maya opens WeekendWhere SG, curious about weekend options
2. **Landing** — Clean interface feels familiar, like MRT departure board (efficient, clear)
3. **Region selection** — She taps "East" (closest to her East Coast home)
4. **Activity selection** — She taps "Cycling" (wants active weekend, escape from work stress)
5. **Preference selection** — She leaves as "Balanced" (default, seems sensible)
6. **Recommendation** — East Coast Park ranked #1 with reasons
7. **Understanding** — She reads: "Matches your region," "Great for cycling," "Route connector available"
8. **Delight** — Reasons feel personal, like a friend recommending (not generic directory)
9. **Decision** — She feels confident, plans Sunday morning ride

**Climax:** The moment she sees the recommendation with clear reasons — she feels confident, not overwhelmed by choices.

### Flow 2: Returning User (Quick Check)

**Actor: James, 32, software engineer (expat, 3 years in SG)**

**Emotional Arc:** Efficiency → Trust → Satisfaction

1. **Tuesday evening, 6 PM** — James wants quick cycling spot after work, short on time
2. **Landing** — Familiar interface, no friction, goes straight to selectors
3. **Rapid selection** — He taps "West," "Cycling," "Balanced" in quick succession
4. **Debounced call** — App waits 300ms, then fetches recommendations (respects his pace)
5. **Results** — Western Water Park ranked first with clear reasons
6. **Decision** — He reads verdict "Great choice," checks route signal (trusts the system)
7. **Satisfaction** — Closes app, heads to park — decision made in under 10 seconds

**Climax:** The rapid, confident decision — from open to decision in under 10 seconds. Feels as efficient as checking MRT arrival times.

### Flow 3: No Results (Empty State)

**Actor: Sarah, 25, student (lifelong Singapore resident)**

**Emotional Arc:** Expectation → Confusion → Guidance → Relief

1. **Friday night, 8 PM** — Sarah wants nature spot in Central, planning weekend with niece
2. **Selection** — She selects "Central," "Nature," "Kid-friendly" (niece visiting, wants safety)
3. **No results** — Recommendation stack is empty (momentary confusion)
4. **Empty state** — Clear message: "No spots match your filters. Try a different region or activity."
5. **Guidance** — "Reset filters" button prominent, helpful like a traffic assistant
6. **Retry** — She changes "Kid-friendly" to "Balanced" (understands the constraint)
7. **Relief** — Botanic Gardens ranked #1 with clear reasons
8. **Success** — She plans weekend visit, feels supported

**Climax:** The empty state guidance — she knows exactly what to do, doesn't feel stuck or blamed. Like a helpful MRT staff redirecting you to the right platform.

---

## [ASSUMPTION] Tags Requiring Validation

- **Debounce timing:** 300ms — assumes good balance between responsiveness and API efficiency. Test with real users.
- **Card skeletons loading:** Optional — may add perceived performance complexity. Test if needed.
- **Auto-retry on error:** One retry after 3s — may frustrate users if fails again. Monitor error rates.
- **Infinite scroll:** Not in MVP — may be expected by users. Evaluate after launch.
- **Pull-to-refresh:** Not in MVP — mobile users may expect this. Consider for v2.
- **Haptic feedback:** On card tap — iOS/Android behavior differs. Test cross-platform.
- **Skip link:** Not in MVP — single-screen app, but accessibility best practice. Evaluate.

---

## Cross-References

**Visual Specifications:** See `{DESIGN.md}` for:
- Color tokens (`{DESIGN.colors.primary}`, etc.)
- Typography scale (`{DESIGN.typography.scale.base}`, etc.)
- Border radius (`{DESIGN.rounded.md}`, etc.)
- Spacing system (`{DESIGN.spacing.lg}`, etc.)

**Product Requirements:** See `{PRD}` for:
- User journeys (Sarah, James — expanded here as flows)
- Functional requirements (FR-7.1: Responsive cards, FR-7.2: Loading/error states, FR-7.3: Interactive updates)
- Non-functional requirements (performance targets, accessibility floor)

---

*End of EXPERIENCE.md Draft — Status: Draft, pending review and iteration*
