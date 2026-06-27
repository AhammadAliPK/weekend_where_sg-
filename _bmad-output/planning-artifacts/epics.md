---
stepsCompleted: ["validate-prerequisites", "design-epics", "generate-stories", "final-validation"]
inputDocuments: [
  "prds/prd-weekend_where_sg-2026-06-27/prd.md",
  "ARCHITECTURE-SPINE.md",
  "ux-designs/ux-weekend_where_sg-2026-06-27/DESIGN.md",
  "ux-designs/ux-weekend_where_sg-2026-06-27/EXPERIENCE.md"
]
---

# WeekendWhere SG - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for WeekendWhere SG, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories for a 90-minute live build demonstration.

## Requirements Inventory

### Functional Requirements

**FR-1.1: Region Selection**
As a user, I want to select a Singapore region so that I can see outdoor options in the area I prefer.

**FR-1.2: Activity Selection**
As a user, I want to choose my outdoor activity so that recommendations match what I plan to do.

**FR-1.3: Ranked Recommendations Display**
As a user, I want to see ranked outdoor recommendations so that I can quickly compare my options.

**FR-2.1: Region-Based Scoring**
As a product owner, I want parks in the selected region to receive a score boost so that recommendations feel locally relevant.

**FR-2.2: Activity-Based Scoring**
As a user, I want the app to prioritize parks suitable for my selected activity so that the results are practical.

**FR-2.3: Recommendation Reasons Generation**
As a user, I want to understand why a park was recommended so that I can decide confidently.

**FR-3.1: Weather-Safe Planning**
As a user, I want to know whether rain may affect my outdoor plan so that I can plan better.

**FR-3.2: Air Quality Awareness**
As a user, I want to know whether air quality is suitable for long outdoor activity so that I can avoid uncomfortable outdoor plans.

**FR-3.3: Condition-Based Verdict**
As a user, I want the final verdict to consider outdoor conditions so that the app gives realistic suggestions.

**FR-4.1: Route-Connected Parks Identification**
As a cyclist, I want parks connected to park connectors to rank higher so that I can plan a better ride.

**FR-4.2: Long Walk Recommendations**
As a walker, I want to find parks suitable for longer walks so that I can plan a meaningful outdoor activity.

**FR-4.3: Route-Aware Extension Support**
As a product team, we want the system to support future route-distance calculations so that we can later recommend actual walk or cycling lengths.

**FR-5.1: Kid-Friendly Preference**
As a parent, I want to select Kid-friendly so that parks suitable for children rank higher.

**FR-5.2: Family Outing Mode**
As a family user, I want recommendations that are suitable for a relaxed outing so that I can avoid overly difficult routes.

**FR-5.3: Accessibility Signal Support**
As a user, I want to know whether a park looks suitable for an easy visit so that I can choose a low-effort plan.

**FR-6.1: Area Search**
As a user, I want to search by area or town so that I can find outdoor options near where I am.

**FR-6.2: Location-Based Recommendations**
As a user, I want to use my current location so that I can find nearby outdoor options.

**FR-6.3: Preference Memory**
As a returning user, I want the app to remember my common activity preference so that I can get recommendations faster.

**FR-7.1: Responsive Recommendation Cards**
As a user, I want cards that are easy to read on mobile so that I can use the app while planning outside.

**FR-7.2: Loading and Error States**
As a user, I want the app to show what is happening so that I understand whether data is loading or unavailable.

**FR-7.3: Interactive Filter Updates**
As a user, I want results to update when I change filters so that I can compare plans quickly.

**FR-8.1: Health Endpoint**
As a developer, I want a health endpoint so that I can quickly verify the backend is running.

**FR-8.2: Recommendation Endpoint**
As a frontend developer, I want a recommendation endpoint so that the UI can display ranked parks without understanding raw datasets.

**FR-8.3: Dataset Fallback**
As a developer, I want fallback data so that the demo and app still work if an external dataset fails.

### NonFunctional Requirements

**NFR-1: Performance**
- API response time under 2 seconds for recommendation requests
- Frontend renders initial UI within 1 second
- Fallback data loads within 500ms

**NFR-2: Reliability**
- App remains functional if external datasets fail
- Graceful degradation for weather and air quality data
- No critical errors visible to end users

**NFR-3: Maintainability**
- Clear separation between scoring logic and data fetching
- API contracts remain stable across versions
- Code structure supports easy addition of new signals

**NFR-4: Scalability (Future)**
- Cache strategy for frequently requested recommendations
- Support for concurrent users in future versions

**NFR-5: Cross-Platform Compatibility**
- Mobile-responsive design (primary use case)
- Desktop support for at-home planning
- Touch-optimized interface (minimum 44x44px targets)

**NFR-6: Accessibility**
- WCAG AA compliance for color contrast
- Screen reader support with semantic HTML
- Keyboard navigation for all interactive elements
- ARIA labels for custom components

### Additional Requirements (from Architecture)

**AR-1: Monorepo Structure with Turborepo**
- Implement Turborepo monorepo with apps/web, apps/api, packages/ui, packages/config, packages/types
- Configure pnpm workspace for dependency management
- Set up shared TypeScript configurations across packages

**AR-2: SvelteKit Frontend Architecture**
- Implement SvelteKit for frontend application
- Use Svelte stores for state management
- Configure SvelteKit routing for single-page application
- Set up Vite build pipeline

**AR-3: shadcn-svelte Component Integration**
- Install and configure shadcn-svelte component library
- Implement required UI components: Select, Card, Button, Badge
- Configure Tailwind CSS integration with DESIGN.md tokens
- Set up component theming and customization

**AR-4: TypeScript Type Safety**
- Implement TypeScript across frontend and backend
- Create shared types package for API contracts
- Configure strict TypeScript settings
- Set up type generation from API contracts

**AR-5: Express Backend API**
- Implement Express server with TypeScript
- Create health endpoint at /api/health
- Create recommendations endpoint at /api/recommendations
- Configure CORS for frontend-backend communication

**AR-6: Pure Function Scoring System**
- Implement scoring as pure function: (parkData, userPreferences) => {score, verdict, reasons}
- Ensure no external dependencies or side effects
- Make scoring function testable and modifiable
- Separate scoring logic from data fetching

**AR-7: Graceful Degradation Strategy**
- Implement fallback JSON data for demo reliability
- Create error handling at each layer (data, API, frontend)
- Ensure API always returns valid JSON structure
- Never show technical errors to end users

**AR-8: API Contract Enforcement**
- Implement request/response shape validation
- Enforce API contract defined in FR-8.2
- Create TypeScript types for API contracts
- Ensure frontend never assumes backend implementation details

**AR-9: Signal-Based Data Structure**
- Implement parks data structure with signals object
- Support extensible signals: {activity, family, cycling, nature, fitness, route, kidFriendly}
- Ensure adding new signals never breaks existing scoring
- Create data source abstraction layer

**AR-10: State Management Architecture**
- Implement Svelte stores for UI state
- Ensure backend remains stateless
- Create debounced API calls (300ms delay)
- Implement unidirectional data flow pattern

### UX Design Requirements

**UX-DR1: Design Token Implementation**
- Implement color system from DESIGN.md: primary (#3C5D4F), secondary (#D4A574), accent (#E63946), semantic colors (success, warning, error, neutral)
- Implement typography scale: xs (14px), sm (16px), base (18px), lg (20px), xl (24px), 2xl (28px)
- Implement spacing scale: xs (4px), sm (8px), md (16px), lg (24px), xl (32px)
- Configure border radius: card (8px), button (6px), input (4px), badge (12px)
- Implement shadow levels: sm, md, lg for elevation

**UX-DR2: shadcn-svelte Component Configuration**
- Configure Select component for region/activity/preference dropdowns with custom styling
- Configure Card component for recommendation display with proper padding and shadows
- Configure Button component for interactive elements with hover states
- Configure Badge component for verdict display with semantic color mapping
- Ensure all components follow DESIGN.md visual specifications

**UX-DR3: Responsive Layout Implementation**
- Implement mobile-first responsive design (<640px: full-width cards, stacked selectors)
- Implement tablet layout (640px-1024px: centered 640px container, side-by-side selectors)
- Implement desktop layout (>1024px: centered 800px container, all selectors in one row)
- Ensure no horizontal scrolling on mobile devices
- Implement touch-optimized spacing (minimum 44x44px targets)

**UX-DR4: Loading State UX**
- Implement loading indicator with spinner and "Finding the best spots for you..." message
- Configure minimum 500ms display to prevent flicker
- Ensure loading state shows during API calls
- Implement skeleton loaders for recommendation cards

**UX-DR5: Error State UX**
- Implement user-friendly error messages (never technical errors)
- Configure retry functionality for failed API calls
- Implement cached data fallback when available
- Ensure error states don't block entire app functionality

**UX-DR6: Empty State UX**
- Implement friendly empty state: "No parks match your criteria. Try adjusting your preferences."
- Provide actionable suggestions for next steps
- Ensure empty state only shows with explanation
- Include neutral icon and guidance

**UX-DR7: Accessibility Implementation**
- Implement WCAG AA color contrast for all text and interactive elements
- Configure semantic HTML structure (main, section, article, button, select)
- Implement ARIA labels for custom components
- Ensure focus visible with 2px primary outline
- Implement skip-to-content link for keyboard navigation

**UX-DR8: Interaction Behavior**
- Implement 300ms debounce on selector changes
- Configure auto-refresh on any selector change (no submit button)
- Implement smooth scroll to results after update (300ms duration)
- Ensure optimistic UI updates on selector interaction
- Configure immediate visual feedback on all interactions

**UX-DR9: Card Visual Hierarchy**
- Implement card layout with proper visual hierarchy (verdict > score > park name > region > reasons)
- Configure verdict as most prominent element (colored badge, bold text)
- Implement score display with large numeric (2xl) and label (sm)
- Show reasons as bullet list with secondary prominence
- Ensure cards are readable on mobile without horizontal scrolling

**UX-DR10: Progressive Disclosure**
- Implement single-screen progressive flow (control panel → state display → recommendation stack)
- Configure maximum 10 recommendation cards (configurable via API limit)
- Ensure minimum 1 recommendation card always displays when available
- Implement scrollable results when many cards present

**UX-DR11: Dark Mode Support (Deferred)**
- Prepare design tokens for dark mode theme (deferred to post-MVP)
- Ensure color system supports theme switching
- Configure component theming for future dark mode implementation

**UX-DR12: Animation and Transitions**
- Implement 300ms duration for smooth animations
- Configure card hover effects with shadow elevation changes
- Ensure transitions don't cause accessibility issues (respect prefers-reduced-motion)
- Implement loading animations that feel smooth but fast

### FR Coverage Map

**Epic 1: Foundation & Project Setup**
- AR-1: Turborepo monorepo structure with apps/web, apps/api, packages/ui, packages/config, packages/types
- AR-2: SvelteKit frontend architecture with stores and routing
- AR-3: shadcn-svelte component integration with Tailwind CSS
- AR-4: TypeScript type safety across frontend and backend
- AR-5: Express backend API with health and recommendations endpoints
- AR-8: API contract enforcement with TypeScript validation
- AR-10: State management architecture with Svelte stores

**Epic 2: Recommendation Discovery**
- FR-1.1: Region Selection (Central, East, West, North, South)
- FR-1.2: Activity Selection (Family, Walking, Cycling, Nature, Fitness)
- FR-1.3: Ranked Recommendations Display (score, verdict, reasons)
- FR-8.1: Health Endpoint (GET /api/health)
- FR-8.2: Recommendation Endpoint (GET /api/recommendations)
- UX-DR2: shadcn-svelte component configuration (Select, Card, Button, Badge)
- UX-DR3: Responsive layout implementation (mobile, tablet, desktop)
- UX-DR9: Card visual hierarchy (verdict > score > park name > reasons)

**Epic 3: Explainable Scoring Engine**
- FR-2.1: Region-Based Scoring (3 points for region match)
- FR-2.2: Activity-Based Scoring (family, walking, cycling, nature, fitness)
- FR-2.3: Recommendation Reasons Generation (human-readable explanations)
- AR-6: Pure function scoring system ((parkData, preferences) => result)
- AR-9: Signal-based data structure with extensible signals
- AR-10: Unidirectional data flow with debounced API calls (300ms)

**Epic 4: Reliable Data Layer**
- FR-8.3: Dataset Fallback (static JSON for demo reliability)
- FR-3.1: Weather-Safe Planning (rain warnings, weather-safe preference)
- FR-3.2: Air Quality Awareness (PM2.5 data, caution labels)
- FR-3.3: Condition-Based Verdict (score adjustment, poor conditions)
- AR-7: Graceful degradation strategy at each layer

**Epic 5: Enhanced User Experience**
- FR-7.1: Responsive Recommendation Cards (mobile-optimized, no horizontal scroll)
- FR-7.2: Loading and Error States (user-friendly messages, cached fallback)
- FR-7.3: Interactive Filter Updates (auto-refresh on selector changes)
- UX-DR1: Design token implementation (Singapore colors, typography, spacing)
- UX-DR4: Loading state UX (spinner, minimum 500ms display)
- UX-DR5: Error state UX (retry functionality, cached data)
- UX-DR6: Empty state UX (friendly messages, actionable suggestions)
- UX-DR7: Accessibility implementation (WCAG AA, semantic HTML, ARIA labels)
- UX-DR8: Interaction behavior (300ms debounce, smooth scroll, optimistic UI)
- UX-DR10: Progressive disclosure (single-screen flow, scrollable results)
- UX-DR12: Animation and transitions (300ms duration, smooth effects)

**Epic 6: Advanced Features (Future/Stretch)**
- FR-4.1: Route-Connected Parks Identification (park connector integration)
- FR-4.2: Long Walk Recommendations (track and route signals)
- FR-4.3: Route-Aware Extension Support (future distance calculations)
- FR-5.1: Kid-Friendly Preference (family-oriented recommendations)
- FR-5.2: Family Outing Mode (relaxed outings, easy routes)
- FR-5.3: Accessibility Signal Support (easy-visit information)
- FR-6.1: Area Search (town/area name search)
- FR-6.2: Location-Based Recommendations (GPS location, fallback to selector)
- FR-6.3: Preference Memory (local storage, no account required)

**Non-Functional Requirements (Cross-Epic)**
- NFR-1: Performance (API < 2s, UI < 1s, fallback < 500ms)
- NFR-2: Reliability (functional if external datasets fail, graceful degradation)
- NFR-3: Maintainability (separated scoring/data fetching, stable API contracts)
- NFR-4: Scalability (future cache strategy, concurrent user support)
- NFR-5: Cross-Platform Compatibility (mobile-responsive, desktop support, touch-optimized)
- NFR-6: Accessibility (WCAG AA compliance, screen reader support, keyboard navigation)

## Epic List

### Epic 1: Foundation & Project Setup
**User Outcome:** Development team has a working monorepo with Svelte + shadcn + Express structure ready for rapid development  
**Business Value:** Establishes the build substrate for 90-minute live build, enabling parallel frontend/backend development  
**FRs covered:** AR-1, AR-2, AR-3, AR-4, AR-5, AR-8, AR-10  
**Implementation Notes:** This epic creates the project scaffold, configures TypeScript, sets up Turborepo, installs shadcn-svelte, and establishes the basic frontend/backend structure. No user-facing features yet.

### Epic 2: Recommendation Discovery
**User Outcome:** Users can select their preferences (region, activity, preference) and see personalized park recommendations with scores and verdicts  
**Business Value:** Delivers the core "aha!" moment where the app provides value — personalized outdoor recommendations for Singapore  
**FRs covered:** FR-1.1, FR-1.2, FR-1.3, FR-8.1, FR-8.2, UX-DR2, UX-DR3, UX-DR9  
**Implementation Notes:** This epic builds the main user interface with selectors, recommendation cards, and the backend API endpoints. It demonstrates the frontend-backend integration through clear API contracts.

### Epic 3: Explainable Scoring Engine
**User Outcome:** Users understand WHY each park was recommended with clear, human-readable reasons  
**Business Value:** Builds trust and transparency through explainable AI — users see exactly how their preferences drive recommendations  
**FRs covered:** FR-2.1, FR-2.2, FR-2.3, AR-6, AR-9, AR-10  
**Implementation Notes:** This epic implements the pure function scoring system, signal-based data structures, and reasons generation. It shows how PRD requirements (scoring model) directly translate to implementation.

### Epic 4: Reliable Data Layer
**User Outcome:** App works reliably even when external APIs fail, with graceful degradation  
**Business Value:** Handles Singapore's real-world conditions — weather disruptions, API failures, haze events — ensuring the app always provides value  
**FRs covered:** FR-8.3, FR-3.1, FR-3.2, FR-3.3, AR-7  
**Implementation Notes:** This epic implements fallback data strategy, weather awareness, air quality monitoring, and error handling at each layer. It demonstrates graceful degradation principles.

### Epic 5: Enhanced User Experience
**User Outcome:** Smooth, responsive interface optimized for Singapore users with proper loading states, error handling, and accessibility  
**Business Value:** Polishes the experience to production quality with Singapore-centric design tokens and inclusive design principles  
**FRs covered:** FR-7.1, FR-7.2, FR-7.3, UX-DR1, UX-DR4, UX-DR5, UX-DR6, UX-DR7, UX-DR8, UX-DR10, UX-DR12  
**Implementation Notes:** This epic implements design tokens, loading/error/empty states, accessibility features, and interaction behaviors. It brings the Singapore-centric design system to life.

### Epic 6: Advanced Features (Future/Stretch)
**User Outcome:** Power users get rich features for route planning, family activities, and location-based recommendations  
**Business Value:** Demonstrates extensibility of the architecture and provides roadmap for post-MVP enhancements  
**FRs covered:** FR-4.1, FR-4.2, FR-4.3, FR-5.1, FR-5.2, FR-5.3, FR-6.1, FR-6.2, FR-6.3  
**Implementation Notes:** This epic contains stretch features that demonstrate how the architecture supports growth without breaking existing functionality. These are NOT part of the 90-minute live build.

---

## Epic 1: Foundation & Project Setup

**Epic Goal:** Development team has a working monorepo with Svelte + shadcn + Express structure ready for rapid development

**Business Value:** Establishes the build substrate for 90-minute live build, enabling parallel frontend/backend development

### Story 1.1: Initialize Turborepo Monorepo Structure

As a developer,
I want a Turborepo monorepo with apps/web, apps/api, packages/ui, packages/config, packages/types structure,
So that we can efficiently manage frontend and backend code with shared configurations.

**Acceptance Criteria:**

**Given** a fresh project directory
**When** I initialize Turborepo with pnpm workspace
**Then** the following directory structure is created:
  - apps/web/ (SvelteKit frontend)
  - apps/api/ (Express backend)
  - packages/ui/ (shared shadcn-svelte components)
  - packages/config/ (shared ESLint, TypeScript, Tailwind configs)
  - packages/types/ (shared TypeScript types)
**And** turbo.json is configured with pipeline tasks
**And** pnpm-workspace.yaml defines workspace dependencies
**And** root package.json includes scripts for running apps

### Story 1.2: Configure TypeScript and Shared Build Settings

As a developer,
I want shared TypeScript configurations across all packages,
So that we maintain type safety consistency while enabling independent package development.

**Acceptance Criteria:**

**Given** the Turborepo structure is created
**When** I set up TypeScript configurations
**Then** packages/config/tsconfig.json extends base TypeScript configuration
**And** apps/web/tsconfig.json and apps/api/tsconfig.json extend shared config
**And** TypeScript strict mode is enabled for all packages
**And** shared types can be imported from @weekend-where-sg/types package
**And** turbo.json runs TypeScript checks in CI pipeline
**And** path aliases are configured for clean imports (@app/*, @package/*)

### Story 1.3: Set Up SvelteKit Frontend Foundation

As a developer,
I want a SvelteKit application with basic routing and Svelte stores for state management,
So that we have a reactive frontend foundation ready for component development.

**Acceptance Criteria:**

**Given** the apps/web directory exists
**When** I initialize SvelteKit with TypeScript
**Then** SvelteKit is configured with Vite build tool
**And** basic routing structure exists in src/routes/
**And** src/lib/stores/ directory contains Svelte stores for state management
**And** stores include: regionStore, activityStore, preferenceStore, recommendationsStore
**And** stores are reactive and support订阅/取消订阅 patterns
**And** src/app.html is configured with basic HTML structure
**And** development server runs on http://localhost:5173

### Story 1.4: Implement Express Backend with API Structure

As a developer,
I want an Express TypeScript backend with health and recommendations endpoints following the API contract,
So that the frontend has a reliable backend to integrate with.

**Acceptance Criteria:**

**Given** the apps/api directory exists
**When** I set up Express with TypeScript
**Then** Express server is configured with CORS for frontend communication
**And** server runs on http://localhost:3000 (configurable via environment)
**And** src/routes/health.ts implements GET /api/health endpoint
**And** /api/health returns { ok: true, app: "WeekendWhere SG", version: "1.0.0" }
**And** src/routes/recommendations.ts creates GET /api/recommendations endpoint
**And** endpoint accepts query parameters: region, activity, preference, limit
**And** TypeScript interfaces define request/response shapes per API contract
**And** error handling middleware is configured
**And** development server supports hot reload

### Story 1.5: Integrate shadcn-svelte Component Library

As a developer,
I want shadcn-svelte components configured with Tailwind CSS and our Singapore design tokens,
So that we have accessible, customizable UI components ready for implementation.

**Acceptance Criteria:**

**Given** the SvelteKit frontend is initialized
**When** I install and configure shadcn-svelte
**Then** shadcn-svelte is added to apps/web/package.json dependencies
**And** Tailwind CSS is configured with DESIGN.md color tokens
**And** @package/ui contains Select, Card, Button, Badge components
**And** each component is configured with Singapore theme colors (primary, secondary, accent)
**And** Tailwind config includes custom color palette from DESIGN.md
**And** components are importable as @package/ui/select, @package/ui/card, etc.
**And** each component supports TypeScript props
**And** component styling follows shadcn patterns with custom theming

---

## Epic 2: Recommendation Discovery

**Epic Goal:** Users can select their preferences and see personalized park recommendations

**Business Value:** Delivers the core "aha!" moment where the app provides value — personalized outdoor recommendations for Singapore

### Story 2.1: Implement Region Selector Component

As a user,
I want to select my preferred Singapore region from a dropdown,
So that I see recommendations for areas I want to visit.

**Acceptance Criteria:**

**Given** the main page is loaded
**When** I interact with the region selector
**Then** a dropdown displays five options: Central, East, West, North, South
**And** the dropdown uses shadcn Select component with Singapore styling
**And** selecting a region updates the regionStore
**And** the selected value is displayed as the button label
**And** the dropdown is accessible with keyboard navigation
**And** ARIA labels indicate "Where in Singapore?"

### Story 2.2: Implement Activity Selector Component

As a user,
I want to choose my planned outdoor activity from a dropdown,
So that recommendations match what I want to do.

**Acceptance Criteria:**

**Given** the main page is loaded
**When** I interact with the activity selector
**Then** a dropdown displays five options: Family outing, Walking, Cycling, Nature, Fitness
**And** the dropdown uses shadcn Select component with Singapore styling
**And** selecting an activity updates the activityStore
**And** the selected value is displayed as the button label
**And** the dropdown is accessible with keyboard navigation
**And** ARIA labels indicate "What are you planning?"

### Story 2.3: Implement Preference Selector Component

As a user,
I want to choose what matters most to me from a dropdown,
So that recommendations prioritize my preferences.

**Acceptance Criteria:**

**Given** the main page is loaded
**When** I interact with the preference selector
**Then** a dropdown displays five options: Balanced, Weather-safe, Kid-friendly, Long walk, Cycling-friendly
**And** the dropdown uses shadcn Select component with Singapore styling
**And** selecting a preference updates the preferenceStore
**And** the selected value is displayed as the button label
**And** the dropdown is accessible with keyboard navigation
**And** ARIA labels indicate "What matters most?"

### Story 2.4: Create Recommendation Card Component

As a user,
I want to see each park recommendation as a clear, scannable card,
So that I can quickly compare my outdoor options.

**Acceptance Criteria:**

**Given** recommendations are loaded from the API
**When** I view a recommendation card
**Then** the card displays with proper visual hierarchy (verdict > score > park name > region > reasons)
**And** the card uses shadcn Card component with Singapore styling
**And** verdict badge uses semantic colors (success/green for 9+, primary for 7-8, etc.)
**And** score is displayed as large numeric (2xl) with label (sm)
**And** park name is medium weight and prominently displayed
**And** region badge shows location context
**And** reasons are shown as bullet list with secondary prominence
**And** card is readable on mobile without horizontal scrolling
**And** card has proper spacing (md padding, 8px border radius)
**And** card elevation changes on hover (shadow-md to shadow-lg)

### Story 2.5: Implement Backend Health Endpoint

As a developer,
I want a health endpoint to verify the backend is running,
So that I can quickly diagnose backend issues during development and demo.

**Acceptance Criteria:**

**Given** the Express backend is running
**When** I send a GET request to /api/health
**Then** the response includes { ok: true, app: "WeekendWhere SG", version: "1.0.0" }
**And** the response is returned within 100ms
**And** the endpoint does not depend on external datasets
**And** the endpoint returns 200 status code
**And** the endpoint supports CORS for frontend requests
**And** the endpoint is documented in API contracts

### Story 2.6: Implement Backend Recommendations Endpoint

As a frontend developer,
I want a recommendation endpoint that accepts user preferences and returns ranked parks,
So that the UI can display personalized recommendations.

**Acceptance Criteria:**

**Given** the Express backend is running
**When** I send a GET request to /api/recommendations with query parameters
**Then** the endpoint accepts region, activity, preference, and limit parameters
**And** region parameter validates against five Singapore regions
**And** activity parameter validates against five activity types
**And** preference parameter validates against five preference options
**And** limit parameter defaults to 6 if not provided
**And** response includes source, region, activity, preference, count fields
**And** recommendations array contains parks sorted by score (highest first)
**And** each recommendation includes: id, name, region, score, verdict, activityFit, description, reasons[], signals{}
**And** response structure matches API contract exactly
**And** endpoint returns 200 status code for valid requests
**And** endpoint returns 400 for invalid parameters with clear error message

### Story 2.7: Connect Frontend to Backend API

As a user,
I want my selector changes to trigger API calls and update recommendations,
So that I can see real-time personalized results.

**Acceptance Criteria:**

**Given** the frontend is loaded with selectors
**When** I change any selector (region, activity, or preference)
**Then** the change updates the corresponding store
**And** a debounced API call is triggered after 300ms
**And** the API request includes current selector values as query parameters
**And** loading state shows while API call is in progress
**And** recommendation cards update with API response
**And** results scroll to top of recommendation section smoothly (300ms)
**And** errors show user-friendly messages with retry option
**And** the implementation uses unidirectional data flow pattern

### Story 2.8: Implement Responsive Layout for Selectors

As a user,
I want the selector layout to adapt to my screen size,
So that I can easily use the app on mobile, tablet, or desktop.

**Acceptance Criteria:**

**Given** the main page is loaded
**When** I view the page on mobile (<640px)
**Then** all three selectors are stacked vertically
**And** each selector takes full width with proper spacing
**And** no horizontal scrolling is required
**When** I view the page on tablet (640px-1024px)
**Then** the page is centered with max 640px width
**And** region and activity selectors appear side-by-side
**And** preference selector is on second row
**When** I view the page on desktop (>1024px)
**Then** the page is centered with max 800px width
**And** all three selectors appear in one horizontal row
**And** touch targets maintain minimum 44x44px size

---

## Epic 3: Explainable Scoring Engine

**Epic Goal:** Users understand WHY each park was recommended with clear reasons

**Business Value:** Builds trust and transparency through explainable AI — users see exactly how their preferences drive recommendations

### Story 3.1: Implement Pure Function Scoring System

As a developer,
I want a scoring function that is pure and testable,
So that scoring logic is isolated from data fetching and easy to modify.

**Acceptance Criteria:**

**Given** park data and user preferences are available
**When** I call the scoring function(parkData, userPreferences)
**Then** the function returns { score: number, verdict: string, reasons: string[] }
**And** the function is pure (no side effects, no external dependencies)
**And** the function is deterministic (same inputs always produce same outputs)
**And** the function can be unit tested without mocking
**And** the scoring follows PRD rules (base score + region match + activity match + preference bonuses)
**And** verdict mapping follows PRD rules (9+ = Perfect, 7-8 = Great, 5-6 = Good, 3-4 = Okay, <3 = Poor)
**And** the function is in apps/api/src/services/scoring.ts

### Story 3.2: Implement Signal-Based Data Structure

As a developer,
I want parks to carry extensible signals for scoring,
So that new signals can be added without breaking existing scoring.

**Acceptance Criteria:**

**Given** park data is loaded
**When** I examine a park object
**Then** it includes a signals object with: { activity, family, cycling, nature, fitness, route, kidFriendly }
**And** each signal is a boolean or number indicating presence/strength
**And** adding a new signal never breaks existing scoring function
**And** unknown signals are ignored gracefully
**And** signals can be extended in future without API contract changes
**And** signal structure is defined in shared types package

### Story 3.3: Implement Region-Based Scoring

As a product owner,
I want parks in the selected region to receive a score boost,
So that recommendations feel locally relevant.

**Acceptance Criteria:**

**Given** a park with region "East" and user selects "East"
**When** the scoring function processes region match
**Then** the park receives +3 points for region match
**And** "Matches selected region" is added to reasons array
**And** the score is reflected in final score calculation
**And** region matching is case-insensitive
**And** non-matching regions receive no region bonus points

### Story 3.4: Implement Activity-Based Scoring

As a user,
I want the app to prioritize parks suitable for my selected activity,
So that the results are practical for my plans.

**Acceptance Criteria:**

**Given** user selects "Cycling" activity
**When** the scoring function processes activity signals
**Then** parks with cycling signal receive +3 points
**And** parks with route/connector signal receive +2 points
**And** "Good for cycling" is added to reasons array
**Given** user selects "Family" activity
**When** the scoring function processes activity signals
**Then** parks with family signal receive +3 points
**And** parks with kidFriendly signal receive +2 points
**And** "Good for family outing" is added to reasons array
**And** similar logic applies for Walking, Nature, and Fitness activities per PRD

### Story 3.5: Generate Human-Readable Recommendation Reasons

As a user,
I want to understand why a park was recommended,
So that I can decide confidently.

**Acceptance Criteria:**

**Given** a park has been scored
**When** I view the reasons array
**Then** every recommendation has at least two reasons when possible
**And** reasons are human-readable strings (not technical codes)
**And** reasons match the scoring rules that were applied
**And** reasons clearly explain the value (e.g., "Matches selected region," "Strong fit for cycling")
**And** reasons are ordered by relevance (highest scoring reasons first)
**And** reasons are properly formatted for display in recommendation cards

### Story 3.6: Implement Debounced API Calls with State Management

As a developer,
I want unidirectional data flow with debounced API calls,
So that the UI remains responsive and doesn't overwhelm the backend.

**Acceptance Criteria:**

**Given** the user changes a selector
**When** the store is updated
**Then** a 300ms debounce timer starts
**And** if another selector changes within 300ms, the timer resets
**And** after 300ms of no changes, the API call is triggered
**And** the API call uses current store values as parameters
**And** loading state is set during API call
**And** recommendations store is updated with response
**And** the flow is unidirectional (user action → store update → debounced call → response → store update → UI update)

---

## Epic 4: Reliable Data Layer

**Epic Goal:** App works reliably even when external APIs fail

**Business Value:** Handles Singapore's real-world conditions — weather disruptions, API failures, haze events

### Story 4.1: Create Fallback Park Data

As a developer,
I want fallback JSON data with sample Singapore parks,
So that the demo and app work reliably if external datasets fail.

**Acceptance Criteria:**

**Given** the backend needs park data
**When** external APIs are unavailable or for demo purposes
**Then** apps/api/data/parks.json contains 10-15 sample parks
**And** each park includes: id, name, region, description, signals{}
**And** parks represent all five Singapore regions (Central, East, West, North, South)
**And** parks have varied signals (some cycling-friendly, some family-oriented, some nature-focused)
**And** parks include recognizable Singapore locations (East Coast Park, Botanic Gardens, West Coast Park, etc.)
**And** data structure matches the signal-based schema from Epic 3
**And** file loads within 500ms for demo reliability

### Story 4.2: Implement Graceful Error Handling

As a developer,
I want the backend to catch external data errors and return fallback data,
So that the app remains functional when external APIs fail.

**Acceptance Criteria:**

**Given** the backend attempts to fetch from external data source
**When** the external API fails (timeout, 404, 500 error, network error)
**Then** the error is caught in try/catch block
**And** fallback data is returned instead of failing
**And** API response includes source: "fallback data"
**And** frontend renders fallback results normally
**And** technical error details are logged but not exposed to user
**And** the error handling is at data layer (not API layer)

### Story 4.3: Integrate Weather Data (Stretch)

As a user,
I want to know whether rain may affect my outdoor plan,
So that I can plan better for Singapore's tropical weather.

**Acceptance Criteria:**

**Given** the backend can fetch weather forecast data
**When** rain or thundery showers are detected
**Then** response includes weather.warning field
**And** recommendation cards show weather label
**And** if user selects "Weather-safe" preference, rainy conditions subtract 2 points
**And** "Rain expected — bring umbrella" is added to reasons if score adjusted
**And** if weather data is unavailable, app still returns recommendations without weather information
**And** weather status is set to "not_checked_in_mvp" for demo

### Story 4.4: Integrate Air Quality Data (Stretch)

As a user,
I want to know whether air quality is suitable for long outdoor activity,
So that I can avoid uncomfortable outdoor plans during haze events.

**Acceptance Criteria:**

**Given** the backend can fetch PM2.5 data
**When** PM2.5 levels are elevated
**Then** response includes airQuality.warning field
**Then** response includes airQuality.label field
**And** if user selects "Long walk" or "Cycling-friendly" preference, elevated PM2.5 subtracts 2 points
**And** "Air quality may affect outdoor activity" is added to reasons if score adjusted
**And** air quality is mapped to broad Singapore region
**And** if air quality data is unavailable, app still returns recommendations without air quality information
**And** air quality status is set to "not_checked_in_mvp" for demo

### Story 4.5: Implement Condition-Based Verdict

As a user,
I want the final verdict to consider outdoor conditions,
So that the app gives realistic suggestions.

**Acceptance Criteria:**

**Given** weather and/or air quality data indicates poor conditions
**When** conditions are poor (heavy rain, high PM2.5)
**Then** score includes condition adjustments
**And** verdict changes based on adjusted score (e.g., from "Great choice" to "Okay, check conditions")
**And** app still returns recommendations rather than failing
**And** API response includes warning field if condition data could not be loaded
**And** verdict never drops below "Maybe choose another place" due to conditions alone
**And** condition adjustments are transparent in reasons

---

## Epic 5: Enhanced User Experience

**Epic Goal:** Smooth, responsive interface optimized for Singapore users

**Business Value:** Polishes the experience to production quality with Singapore-centric design tokens

### Story 5.1: Implement Singapore Design Tokens

As a user,
I want the app to use Singapore-inspired colors and design elements,
So that the app feels locally relevant and visually appealing.

**Acceptance Criteria:**

**Given** the frontend components are rendered
**When** I view the app's design
**Then** primary color uses Singapore tropical green (#3C5D4F)
**And** secondary color uses tropical wood/earth tone (#D4A574)
**And** accent color uses Singapore red from flag (#E63946)
**And** special orchid purple is available for highlights (#9B5DE5)
**And** semantic colors follow tropical context (success green, warning sunset orange)
**And** background uses warm off-white (#FAF9F6) like paper/canvas
**And** typography scale supports aging population (base 18px, xs 14px)
**And** spacing scale provides generous whitespace for readability
**And** border radius follows friendly, rounded aesthetic (card 8px, button 6px)
**And** design tokens are configurable in Tailwind

### Story 5.2: Implement Loading States with Singapore Context

As a user,
I want to see friendly loading messages while data fetches,
So that I understand what's happening and don't worry about errors.

**Acceptance Criteria:**

**Given** an API call is in progress
**When** I view the loading state
**Then** a spinner animation is displayed
**And** message reads "Finding the best spots for you..."
**And** loading state shows for minimum 500ms to prevent flicker
**And** loading indicator is centered on screen
**And** skeleton loaders appear for recommendation cards
**And** loading state respects user's prefers-reduced-motion setting
**And** loading animation feels smooth but fast (300ms duration)

### Story 5.3: Implement User-Friendly Error States

As a user,
I want to see helpful error messages when something goes wrong,
So that I know what to do next without seeing technical details.

**Acceptance Criteria:**

**Given** an API call fails
**When** I view the error state
**Then** a friendly error message is displayed (not technical error details)
**And** message explains what happened in plain language
**And** retry button is available for user to try again
**And** if cached data is available, "Using cached data" message appears
**And** error state doesn't block entire app functionality
**And** error icon uses neutral/approachable design (not warning colors)
**And** error states are accessible with screen readers

### Story 5.4: Implement Empty State with Guidance

As a user,
I want to see helpful guidance when no parks match my criteria,
So that I can adjust my preferences to find recommendations.

**Acceptance Criteria:**

**Given** API returns zero recommendations
**When** I view the empty state
**Then** friendly message displays: "No parks match your criteria. Try adjusting your preferences."
**And** neutral icon accompanies the message
**And** actionable suggestions are provided (e.g., "Try a different region or activity")
**And** empty state only appears with explanation (never blank screen)
**And** empty state encourages exploration rather than failure
**And** empty state is properly spaced and centered

### Story 5.5: Implement Accessibility Features

As a user with disabilities,
I want the app to be accessible and navigable with assistive technologies,
So that I can use the app effectively.

**Acceptance Criteria:**

**Given** I use the app with a screen reader or keyboard
**When** I navigate through the interface
**Then** all text meets WCAG AA contrast requirements (4.5:1 minimum)
**And** semantic HTML structure is used (main, section, article, button, select)
**And** all interactive elements have ARIA labels
**And** focus visible shows 2px primary outline on keyboard focus
**And** skip-to-content link allows bypassing navigation
**And** touch targets are minimum 44x44px for mobile
**And** form fields have associated labels
**And** color is not the only way information is conveyed
**And** animations respect prefers-reduced-motion setting

### Story 5.6: Implement Interaction Behaviors and Micro-animations

As a user,
I want the interface to respond smoothly to my actions,
So that the app feels polished and responsive.

**Acceptance Criteria:**

**Given** I interact with any element
**When** I change a selector
**Then** API call is debounced by 300ms
**And** optimistic UI update shows immediately
**And** smooth scroll (300ms duration) brings results into view
**When** I hover over a recommendation card
**Then** shadow elevation changes from md to lg
**And** transition is smooth (300ms duration)
**And** hover effect doesn't cause accessibility issues
**When** the app loads
**Then** initial UI renders within 1 second
**And** animations feel smooth but not sluggish
**And** all transitions respect user's prefers-reduced-motion setting

### Story 5.7: Implement Progressive Disclosure Layout

As a user,
I want a clean single-screen interface that reveals information progressively,
So that I'm not overwhelmed but can access details when needed.

**Acceptance Criteria:**

**Given** I load the main page
**When** I view the layout
**Then** control panel (selectors) appears at top
**And** state display (loading/error) shows in middle
**And** recommendation stack appears at bottom
**And** maximum 10 recommendation cards are displayed (configurable via API limit)
**And** results area is scrollable when many cards are present
**And** minimum 1 recommendation card displays when available
**And** layout follows single-screen progressive flow
**And** no navigation is required to access core features

---

## Epic 6: Advanced Features (Future/Stretch)

**Epic Goal:** Power users get rich features while demonstrating architecture extensibility

**Business Value:** Demonstrates extensibility of the architecture and provides roadmap for post-MVP enhancements

### Story 6.1: Implement Route-Connected Parks

As a cyclist,
I want parks connected to park connectors to rank higher,
So that I can plan a better ride.

**Acceptance Criteria:**

**Given** I select "Cycling" activity
**When** the backend scores parks
**Then** parks with connector or route signals receive +2 points
**And** "Route or connector signal available" is added to reasons
**And** route-connected parks rank higher for cycling activity
**And** signal is available in parks data structure
**And** frontend displays route signal when available

### Story 6.2: Implement Long Walk Recommendations

As a walker,
I want to find parks suitable for longer walks,
So that I can plan a meaningful outdoor activity.

**Acceptance Criteria:**

**Given** I select "Long walk" preference
**When** the backend scores parks
**Then** parks with track or route signals receive +2 points
**And** recommendations include long-walk reasons
**And** parks with only small or unknown walking signal rank lower
**And** preference influences verdict and ranking
**And** frontend shows preference-specific reasons

### Story 6.3: Design Route-Aware Extension Points

As a product team,
We want the system to support future route-distance calculations,
So that we can later recommend actual walk or cycling lengths.

**Acceptance Criteria:**

**Given** the API response structure
**When** route metadata becomes available
**Then** API response supports signals.route object
**And** scoring function can accept route metadata without breaking
**And** frontend does not need major changes when route data is added
**And** extension points are documented in architecture
**And** adding route distance is a non-breaking change

### Story 6.4: Implement Kid-Friendly Preference

As a parent,
I want to select "Kid-friendly" so that suitable parks rank higher,
So that I can find appropriate places for my children.

**Acceptance Criteria:**

**Given** I select "Kid-friendly" preference
**When** the backend scores parks
**Then** parks with family or kidFriendly signals receive +2 points
**And** "Bonus for kid-friendly preference" is added to reasons
**And** preference is available in UI selector
**And** recommendations include child-friendly reasons
**And** verdict reflects the preference boost

### Story 6.5: Implement Family Outing Mode

As a family user,
I want recommendations suitable for relaxed outings,
So that I can avoid overly difficult routes.

**Acceptance Criteria:**

**Given** I select "Family" activity
**When** the backend scores parks
**Then** parks with open-space, garden, or easy-walk signals receive +3 points
**And** nature reserves with difficult routes are not automatically ranked highest
**And** cards explain why a park fits a family outing
**And** recommendations consider multi-generational accessibility
**And** family safety factors are prioritized

### Story 6.6: Implement Accessibility Signals

As a user,
I want to know whether a park is suitable for an easy visit,
So that I can choose a low-effort plan.

**Acceptance Criteria:**

**Given** I view a recommendation card
**When** accessibility or easy-visit signal is available
**Then** recommendation cards can display accessibility notes
**And** missing accessibility data does not break the app
**And** future API supports accessibility signal
**And** signal is optional and handled gracefully
**And** frontend shows accessibility information when present

### Story 6.7: Implement Area Search

As a user,
I want to search by area or town name,
So that I can find outdoor options near where I am.

**Acceptance Criteria:**

**Given** I enter an area name (e.g., "Tampines", "Ang Mo Kio")
**When** the backend processes the search
**Then** search term is mapped to approximate region or coordinates
**And** recommendations prioritize nearby results
**And** search input is available in UI (future feature)
**And** backend supports area name resolution
**And** results show area-based recommendations

### Story 6.8: Implement Location-Based Recommendations

As a user,
I want to use my current location,
So that I can find nearby outdoor options.

**Acceptance Criteria:**

**Given** I grant location permission
**When** the browser requests location
**Then** location is used for recommendation calculation
**And** recommendations prioritize nearby results
**And** if permission is denied, app falls back to region selector
**And** location is used only for recommendation calculation
**And** app does not store precise location in MVP
**And** privacy-friendly location handling

### Story 6.9: Implement Preference Memory

As a returning user,
I want the app to remember my common activity preference,
So that I can get recommendations faster.

**Acceptance Criteria:**

**Given** I return to the app
**When** I previously selected an activity preference
**Then** app can store preference locally (localStorage)
**And** no account is required for preference memory
**And** user can change stored preference
**And** preference persists across sessions
**And** privacy-friendly local storage only
**And** clear option to reset preferences

---

## Document Completion

**Total Epics:** 6  
**Total Stories:** 42  
**FR Coverage:** 24/24 functional requirements covered  
**NFR Coverage:** 6/6 non-functional requirements addressed across epics  
**AR Coverage:** 10/10 architecture requirements covered  
**UX-DR Coverage:** 12/12 UX design requirements covered

**Training Demo Allocation:**
- Epic 1: Foundation (Stories 1.1-1.5) → 15 minutes
- Epic 3: Scoring Engine (Stories 3.1-3.4) → 20 minutes
- Epic 2: Discovery (Stories 2.1-2.8) → 20 minutes  
- Epic 4: Data Layer (Stories 4.1-4.2) → 10 minutes
- Epic 5: UX Polish (Stories 5.1-5.7) → 30 minutes
- Epic 6: Advanced Features → Deferred to post-training

**Stories are ready for development implementation with clear acceptance criteria and standalone completable scope.**
