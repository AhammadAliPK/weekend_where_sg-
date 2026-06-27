---
title: EXPERIENCE: WeekendWhere SG
status: draft
created: 2026-06-27
updated: 2026-06-27
sources:
  - ../prds/prd-weekend_where_sg-2026-06-27/prd.md
design_reference: DESIGN.md
---

# EXPERIENCE: WeekendWhere SG

## Foundation

### Form Factor
**Mobile-responsive web application** — users plan outdoors while mobile, need quick access. Desktop support for at-home planning.

### UI System
**Custom CSS with utility-first approach** — vanilla implementation for training simplicity. No component library dependency for MVP. Visual tokens defined in {DESIGN.md#colors}.

### Responsive Behavior
- **Mobile-first:** Full-width cards, stacked selectors
- **Tablet:** Centered container (640px max), side-by-side selectors
- **Desktop:** Centered container (800px max), all selectors in one row

## Information Architecture

### Screen Structure
**Single-screen progressive flow** — all functionality accessible without navigation.

**Top Section:** Control Panel
- Region selector
- Activity selector
- Preference selector
- Optional: "Surprise Me" button (future)

**Middle Section:** State Display
- Loading indicator
- Error state (when applicable)
- Empty state (when applicable)

**Bottom Section:** Recommendation Stack
- Ranked recommendation cards
- Minimum 1, maximum 10 cards (configurable via API limit parameter)
- Scrollable when many results

### Navigation Model
**No traditional navigation** — single-page application. All state changes happen in-place without page reloads.

**Future extensions:**
- About/Help modal
- Settings (preferences memory)
- Share plan (future)

## Voice and Tone

### Microcopy Principles
- **Concise:** Maximum 8 words per line
- **Actionable:** Tell users what they can do
- **Explainable:** Always show "why"
- **Optimistic:** Focus on possibilities, not limitations

### Sample Copy

**Selectors:**
- Region label: "Where in Singapore?"
- Activity label: "What are you planning?"
- Preference label: "What matters most?"

**Empty State:**
- "No parks match your criteria. Try adjusting your preferences."

**Error State:**
- "Couldn't load recommendations. Using cached data instead."

**Loading State:**
- "Finding the best spots for you..."

**Card Reasons:**
- "Matches selected region"
- "Great for cycling"
- "Family-friendly with open spaces"

## Component Patterns

### Region Selector
**Behavior:**
- Dropdown with 5 options: Central, East, West, North, South
- Auto-refreshes recommendations on change (debounced 300ms)
- Shows selected value as button label

**States:**
- Default: "Where in Singapore?"
- Selected: "{Region} areas"
- Disabled: During API call

**Reference:** {DESIGN.md#components.selector}

### Activity Selector
**Behavior:**
- Dropdown with 5 options: Family outing, Walking, Cycling, Nature, Fitness
- Auto-refreshes recommendations on change (debounced 300ms)
- Shows selected value as button label

**States:**
- Default: "What are you planning?"
- Selected: "{Activity}"
- Disabled: During API call

### Preference Selector
**Behavior:**
- Dropdown with 5 options: Balanced, Weather-safe, Kid-friendly, Long walk, Cycling-friendly
- Auto-refreshes recommendations on change (debounced 300ms)
- Shows selected value as button label

**States:**
- Default: "What matters most?"
- Selected: "{Preference}"
- Disabled: During API call

### Recommendation Card
**Behavior:**
- Displays single park recommendation
- Ranked by score (highest first)
- Expandable for full details (mobile)
- Always shows verdict, score, and minimum 2 reasons

**Visual Hierarchy:**
1. **Verdict badge** (most prominent) — {DESIGN.md#colors.semantic}
2. **Score** — large numeric + label
3. **Park name** — medium, semibold
4. **Region** — small badge
5. **Reasons** — bullet list, secondary prominence
6. **Signals** — small badges (optional)

**States:**
- Default: Full card visible
- Loading: Skeleton loader
- Error: "Data unavailable" placeholder
- Empty: Card not rendered

### Loading State
**Behavior:**
- Shows during API call (minimum 500ms display to prevent flicker)
- Full-page or inline based on context
- Cancelled if user changes selector quickly

**Visual:** Spinner + "Finding the best spots for you..."

### Error State
**Behavior:**
- Shows when API call fails completely
- Never blocks entire app
- Offers retry action
- Falls back to cached data when available

**Visual:** Warning icon + message + retry button

### Empty State
**Behavior:**
- Shows when no results match criteria
- Encourages action (change preferences)
- Never shows without explanation

**Visual:** Neutral icon + "No parks match..." + suggestion

## State Patterns

### Application States

**Initial Load:**
1. App loads with default selectors
2. Auto-triggers initial recommendation request
3. Shows loading state
4. Displays results or empty state

**Selector Change:**
1. User changes any selector
2. 300ms debounce (anticipates more changes)
3. API call with new parameters
4. Loading state
5. Results update in-place (no page reload)

**API Success:**
1. Parse response JSON
2. Validate data structure
3. Render recommendation cards
4. Hide loading state
5. Scroll to top of results (if many cards)

**API Error:**
1. Log error (not visible to user)
2. Check for cached data
3. If cache exists: use cache + show "Using cached data" toast
4. If no cache: show error state + retry option

**Network Timeout:**
1. After 10 seconds: show error state
2. Offer retry option
3. Keep previous results visible (don't clear)

### Data States

**Fallback Mode:**
- Triggered when external APIs fail
- Uses static JSON data
- Shows "Offline mode" indicator
- All functionality remains available

**Stretch Features:**
- Weather data: show warning icon if unavailable
- Air quality: show warning icon if unavailable
- Route data: degrade gracefully without breaking

## Interaction Primitives

### Input Behavior
- **Debouncing:** 300ms on selector changes
- **Optimistic UI:** Show immediate visual feedback on selector change
- **Focus management:** Return focus to selector after error retry

### Scroll Behavior
- **Auto-scroll:** Scroll to top of results on update
- **Smooth scroll:** 300ms duration
- **Position:** Results top aligned with viewport top

### Touch Behavior
- **Minimum target:** 44x44px for all interactive elements
- **Spacing:** 8px minimum between touch targets
- **Feedback:** Visual + haptic (when available)

### Keyboard Navigation
- **Tab order:** Left-to-right, top-to-bottom
- **Enter/Space:** Activate focused element
- **Escape:** Close modals (future)
- **Arrow keys:** Navigate dropdown options

## Accessibility Floor

### Semantic Structure
- `<main>` for primary content
- `<section>` for each major area
- `<article>` for each recommendation card
- `<button>` for all interactive elements
- `<select>` for dropdowns

### ARIA Labels
- **Selectors:** aria-label + aria-selected
- **Cards:** aria-label with park name + verdict
- **Loading:** aria-live="polite" for status updates
- **Errors:** aria-live="assertive" for critical messages

### Keyboard Accessibility
- **Focus visible:** 2px primary outline
- **Skip links:** "Skip to main content"
- **Focus trap:** In modals (future)

### Screen Reader Support
- **Verdict announced:** "East Coast Park: Great choice for cycling"
- **Score announced:** "Score 9 out of 10"
- **Reasons grouped:** "3 reasons why: matches region, great for cycling, route available"
- **State changes:** "Loading recommendations... Recommendations updated"

### Color Independence
- **Not color-dependent:** Verdict conveyed via text + color
- **Patterns:** Icons supplement color coding
- **Contrast:** All text meets WCAG AA

## Key Flows

### Flow 1: Sarah Plans Family Outing

**Protagonist:** Sarah, mother of two, planning Saturday morning outdoors

**Scene:** Friday evening, Sarah checks phone while kids sleep

**Steps:**
1. Sarah opens WeekendWhere SG
2. Sees simple selectors at top
3. Taps "Where in Singapore?" → selects "East"
4. Taps "What are you planning?" → selects "Family outing"
5. Taps "What matters most?" → selects "Kid-friendly"
6. **Climax:** Cards animate in with top result
   - "East Coast Park: Great choice" (green badge)
   - Score: 8/10
   - "Perfect for families, kid-friendly, matches your region"
7. Sarah scrolls to see 2 more options
8. Decides on East Coast Park
9. **Satisfaction:** Clear decision made in under 30 seconds

### Flow 2: Marcus Chooses Cycling Route

**Protagonist:** Marcus, cycling enthusiast, 60km ride planned

**Scene:** Saturday morning, coffee shop, deciding route

**Steps:**
1. Marcus opens app while waiting for coffee
2. Quick check: defaults to Central, Walking, Balanced
3. Changes activity to "Cycling"
4. Changes region to "West"
5. **Climax:** Results update instantly
   - "West Coast Park: Perfect weekend pick"
   - Score: 9/10
   - "Route-connected, great for cycling, long distances"
6. Marcus sees "Jurong Lake Gardens" as second option
7. Opens first card → sees route signal available
8. **Decision:** West Coast Park it is
9. **Confidence:** Knows why it was recommended

### Flow 3: First-Time User Discovery

**Protagonist:** Jin, new to Singapore, curious about weekend options

**Scene:** Thursday evening, exploring app for first time

**Steps:**
1. Jin opens app from social media link
2. Sees friendly "Where in Singapore?" prompt
3. Taps through regions: "Central" → "What are you planning?"
4. Selects "Walking" → "Balanced"
5. **Discovery moment:** 5 parks appear with explanations
6. Jin reads reasons: "Matches region," "Great for walking"
7. Realizes: "This isn't just a list — it's recommendations"
8. Tries different combinations: "Nature," "North"
9. **Learning:** Understands how preferences change results
10. **Trust:** Decides to visit recommended spot

## Platform-Specific Considerations

### Mobile
- **Touch-optimized:** Large tap targets, generous spacing
- **Thumb-friendly:** Key controls in bottom 1/3 of screen
- **Performance:** Fast initial load, smooth animations
- **Offline:** Works in fallback mode without network

### Desktop
- **Hover states:** Additional feedback on mouse hover
- **Keyboard:** Full keyboard navigation support
- **Layout:** Side-by-side selectors for efficiency
- **Print-friendly:** Clean print stylesheet for offline reference

## Responsive Breakpoints

### Mobile (< 640px)
- Stacked selectors (vertical layout)
- Full-width cards
- Simplified card details
- Bottom-anchored CTA (future)

### Tablet (640px - 1024px)
- Centered container (640px max)
- Side-by-side region + activity selectors
- Full card details visible
- Optimized touch targets

### Desktop (> 1024px)
- Centered container (800px max)
- All selectors in one row
- Maximum card information density
- Hover states for all interactive elements

## Performance Considerations

### Loading Performance
- **Initial render:** Under 1 second
- **First contentful paint:** Under 1.5 seconds
- **Time to interactive:** Under 3 seconds

### Runtime Performance
- **Selector debouncing:** 300ms delay
- **API timeout:** 10 seconds
- **Animation duration:** 300ms (smooth but fast)
- **Card rendering:** Batched for smooth scrolling

### Network Efficiency
- **API caching:** 5-minute cache for identical requests
- **Debouncing:** Prevent excessive API calls
- **Fallback data:** Instant load when APIs fail
