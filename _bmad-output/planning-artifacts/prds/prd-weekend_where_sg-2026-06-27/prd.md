---
title: WeekendWhere SG Product Requirements Document
status: final
created: 2026-06-27
updated: 2026-06-27
author: Ahammad Ali
project: weekend_where_sg
altitude: feature
purpose: Hybrid - Production-ready recommendation system + Spec-driven development training artifact
---

# WeekendWhere SG

**Working Codename:** ParkKaki
**Stake Level:** Hybrid (Real Product + Training Demo)
**Target Launch:** [ASSUMPTION] No fixed timeline — 90-min demo is immediate priority; production launch when resources allow

---

## Product Summary

WeekendWhere SG is a Singapore outdoor decision assistant that helps users decide where to go for a walk, cycle, family outing, nature visit, or fitness activity. The product recommends parks, nature areas, and park connector routes based on user intent, location preference, weather conditions, air quality, facilities, and route suitability.

**The goal is not to replace an official park directory.** The goal is to help users answer one practical question: *"Where should I go this weekend?"*

---

## Problem Statement

Singapore has many parks, gardens, nature reserves, and park connectors. However, users often struggle to choose the right place for their situation.

**User questions this product answers:**
- Where can I bring my kids this weekend?
- Where can I cycle in the East?
- Where can I go for a long walk?
- Is the weather okay now?
- Is the air quality okay for outdoor activity?
- Which place is suitable for nature, not just exercise?

Current park discovery requires users to browse and compare manually across multiple sources. WeekendWhere SG solves this by ranking outdoor options and explaining why each one is suitable.

---

## Product Vision

Make outdoor planning in Singapore simple, practical, and context-aware.

The app should help users decide in under 30 seconds where to go outdoors based on what they want to do and current conditions.

---

## Product Positioning

**Decision:** "Decision assistant, not directory"

Existing park websites help users **browse** park information.
WeekendWhere SG helps users **make a decision**.

It combines user intent, region, activity type, weather conditions, air quality, park suitability, route signals, family-friendly signals, and explanation-based recommendations.

The product should feel like a smart weekend planning assistant, not just a list of parks.

---

## Target Users

### Primary Users

**Families**
Parents or guardians looking for parks suitable for kids, easy walks, open spaces, and practical facilities.

**Walkers and Joggers**
Users who want a relaxing walk, fitness walk, or longer outdoor route.

**Cyclists**
Users who want cycling-friendly parks or routes connected to park connectors.

**Nature Seekers**
Users who want greenery, nature reserves, birdwatching areas, trails, or quieter spaces.

**Weekend Explorers**
Users who simply want a recommendation for what to do outdoors this weekend.

### Secondary Users

**Visitors and New Residents**
[ASSUMPTION] People unfamiliar with Singapore parks who want simple recommendations.

**Developers and Product Teams**
[NOTE FOR PM] For the masterclass, this product demonstrates how to turn public data into a full-stack recommendation app. This is a training artifact, not a primary user segment.

---

## Core User Journey

**User Journey 1: Weekend Family Planning (Sarah, mom of two)**

1. **Saturday morning, 9 AM** — Sarah wants to take her kids (ages 5 and 8) outdoors but doesn't know where to go
2. She opens WeekendWhere SG on her phone
3. She selects: **East region** (closest to home), **Family activity**, **Kid-friendly preference**
4. She taps "Recommend"
5. Backend ranks parks in East with family/kid signals
6. She sees East Coast Park ranked #1: "Perfect weekend pick — Great for family outing, kid-friendly, matches your region"
7. She taps the card to see more details
8. She sees walking/cycling options and facility hints
9. She decides on East Coast Park for the afternoon

**User Journey 2: Post-Work Cycling (James, software engineer)**

1. **Tuesday evening, 6 PM** — James wants to cycle after work but limited time
2. He opens WeekendWhere SG
3. He selects: **West region** (near office), **Cycling activity**, **Balanced preference**
4. He sees recommendations sorted by cycling suitability
5. Western Water Park ranks highest: "Great choice — Strong fit for cycling, route connector available"
6. He checks the route signal confirmation
7. He heads there for a 45-minute ride

---

## Goals

### User Goals
- Choose an outdoor destination quickly (under 30 seconds)
- Get recommendations based on activity
- Understand why a place is recommended
- Avoid bad outdoor conditions where possible
- Discover parks and routes beyond famous locations

### Product Goals
- Create a recommendation layer on top of public datasets
- Convert raw park and weather data into useful decision signals
- Provide explainable scoring
- Support future expansion into maps, route planning, and personalization

### Training Demo Goals [NOTE FOR PM]
- Show how a big PRD becomes epics and stories
- Show how to choose a 90-minute vertical slice
- Show how a backend normalizes public data
- Show how frontend and backend are connected through a clear API contract
- Show how spec-driven development prevents scope confusion

---

## Non-Goals

The first version will **not** include:
- User login/authentication
- Paid booking or facility reservation
- Social media features
- Live GPS tracking
- Full navigation/route calculation
- Live crowd prediction
- Health or medical advice
- Complex machine learning model
- Full map rendering
- Push notifications

These are future possibilities, not MVP requirements.

---

## Product Principles

### Decision Over Directory
The app should not only show parks. It should recommend suitable options.

### Explain Every Recommendation
Every recommendation must include reasons.

**Bad:** "East Coast Park — Score 8"

**Good:** "East Coast Park — Great for cycling because it matches your region, has route signals, and is suitable for longer outdoor plans."

### Graceful Degradation
If weather, PM2.5, or external datasets fail, the app should still work with fallback data.

### Simple First, Extensible Later
The first build should use simple scoring rules. Later versions can add better geospatial matching, route distance, and personalization.

---

## Functional Requirements

### Epic 1: Outdoor Recommendation Discovery

#### FR-1.1: Region Selection
**As a user, I want to select a Singapore region so that I can see outdoor options in the area I prefer.**

**Acceptance Criteria:**
- User can select Central, East, West, North, or South
- Selected region is sent to the backend
- Recommendations prioritize parks in the selected region
- If no results exist, app shows a friendly empty state

---

#### FR-1.2: Activity Selection
**As a user, I want to choose my outdoor activity so that recommendations match what I plan to do.**

**Acceptance Criteria:**
- User can select Family, Walking, Cycling, Nature, or Fitness
- Backend receives the activity value
- Recommendation reasons mention the selected activity where relevant
- Changing activity changes ranking

---

#### FR-1.3: Ranked Recommendations Display
**As a user, I want to see ranked outdoor recommendations so that I can quickly compare my options.**

**Acceptance Criteria:**
- App displays recommendation cards
- Cards are sorted by score
- Each card shows score and verdict
- Each card shows at least two reasons
- Results are limited by API parameter

---

### Epic 2: Explainable Scoring Engine

#### FR-2.1: Region-Based Scoring
**As a product owner, I want parks in the selected region to receive a score boost so that recommendations feel locally relevant.**

**Acceptance Criteria:**
- Park gets region-match points if its region matches the selected region
- Recommendation includes reason: "Matches selected region"
- Score is returned in API response

---

#### FR-2.2: Activity-Based Scoring
**As a user, I want the app to prioritize parks suitable for my selected activity so that the results are practical.**

**Acceptance Criteria:**
- Cycling activity boosts parks with cycling or route signals
- Family activity boosts parks with family or kid-friendly signals
- Nature activity boosts parks with nature or reserve signals
- Fitness activity boosts parks with active outdoor signals
- Walking activity boosts parks with walking or long-walk signals

---

#### FR-2.3: Recommendation Reasons Generation
**As a user, I want to understand why a park was recommended so that I can decide confidently.**

**Acceptance Criteria:**
- Every recommendation has a reasons array
- Reasons are human-readable
- Reasons match the scoring rules
- At least two reasons are returned when possible

---

### Epic 3: Outdoor Condition Awareness

#### FR-3.1: Weather-Safe Planning
**As a user, I want to know whether rain may affect my outdoor plan so that I can plan better.**

**Acceptance Criteria:**
- Backend can fetch or receive weather forecast data
- If rain or thundery showers are detected, response includes weather warning
- If user selects Weather-safe preference, rainy conditions affect score
- Recommendation card shows weather label

---

#### FR-3.2: Air Quality Awareness
**As a user, I want to know whether air quality is suitable for long outdoor activity so that I can avoid uncomfortable outdoor plans.**

**Acceptance Criteria:**
- Backend can fetch PM2.5 data
- PM2.5 signal is mapped to broad Singapore region
- If air quality is elevated, long-walk and cycling recommendations include caution
- Card shows an air quality label

---

#### FR-3.3: Condition-Based Verdict
**As a user, I want the final verdict to consider outdoor conditions so that the app gives realistic suggestions.**

**Acceptance Criteria:**
- Score includes condition adjustments when data is available
- Verdict changes when weather or air quality is poor
- App still returns recommendations if condition data fails
- API includes a warning if condition data could not be loaded

---

### Epic 4: Route and Park Connector Intelligence

#### FR-4.1: Route-Connected Parks Identification
**As a cyclist, I want parks connected to park connectors to rank higher so that I can plan a better ride.**

**Acceptance Criteria:**
- Backend identifies parks with connector or route signals
- Cycling activity boosts route-connected parks
- Recommendation includes reason: "Route or connector signal available"

---

#### FR-4.2: Long Walk Recommendations
**As a walker, I want to find parks suitable for longer walks so that I can plan a meaningful outdoor activity.**

**Acceptance Criteria:**
- Long-walk preference boosts parks with track or route signals
- Recommendations include long-walk reasons
- Parks with only small or unknown walking signal rank lower

---

#### FR-4.3: Route-Aware Extension Support
**As a product team, we want the system to support future route-distance calculations so that we can later recommend actual walk or cycling lengths.**

**Acceptance Criteria:**
- API response supports a signals.route object
- Scoring function can accept route metadata
- Frontend does not need major changes when route data is added

---

### Epic 5: Family and Accessibility Suitability

#### FR-5.1: Kid-Friendly Preference
**As a parent, I want to select Kid-friendly so that parks suitable for children rank higher.**

**Acceptance Criteria:**
- Kid-friendly preference is available in UI
- Backend boosts parks with family or kid-friendly signals
- Recommendations include child-friendly reasons

---

#### FR-5.2: Family Outing Mode
**As a family user, I want recommendations that are suitable for a relaxed outing so that I can avoid overly difficult routes.**

**Acceptance Criteria:**
- Family activity boosts parks with open-space, garden, or easy-walk signals
- Nature reserves with difficult routes are not automatically ranked highest for family mode
- Cards explain why a park fits a family outing

---

#### FR-5.3: Accessibility Signal Support
**As a user, I want to know whether a park looks suitable for an easy visit so that I can choose a low-effort plan.**

**Acceptance Criteria:**
- Future API supports an accessibility or easy-visit signal
- Recommendation cards can display accessibility notes
- Missing accessibility data does not break the app

---

### Epic 6: Search, Location, and Personalization

#### FR-6.1: Area Search
**As a user, I want to search by area or town so that I can find outdoor options near where I am.**

**Acceptance Criteria:**
- User can enter an area name
- Backend maps search term to approximate region or coordinates
- Recommendations prioritize nearby results

---

#### FR-6.2: Location-Based Recommendations
**As a user, I want to use my current location so that I can find nearby outdoor options.**

**Acceptance Criteria:**
- Browser requests location permission
- If permission is denied, app falls back to region selector
- Location is used only for recommendation calculation
- App does not store precise location in MVP

---

#### FR-6.3: Preference Memory
**As a returning user, I want the app to remember my common activity preference so that I can get recommendations faster.**

**Acceptance Criteria:**
- App can store preference locally
- No account is required
- User can change stored preference

---

### Epic 7: Frontend Experience

#### FR-7.1: Responsive Recommendation Cards
**As a user, I want cards that are easy to read on mobile so that I can use the app while planning outside.**

**Acceptance Criteria:**
- Cards are readable on mobile
- Score and verdict are visually clear
- Reasons are shown as short bullets
- No horizontal scrolling is required

---

#### FR-7.2: Loading and Error States
**As a user, I want the app to show what is happening so that I understand whether data is loading or unavailable.**

**Acceptance Criteria:**
- UI shows loading state while API is called
- UI shows fallback message if backend uses fallback data
- UI shows empty state if no results are returned
- Technical errors are not shown directly to users

---

#### FR-7.3: Interactive Filter Updates
**As a user, I want results to update when I change filters so that I can compare plans quickly.**

**Acceptance Criteria:**
- Changing region refreshes recommendations
- Changing activity refreshes recommendations
- Changing preference refreshes recommendations
- API request includes current filter values

---

### Epic 8: Backend API and Data Normalization

#### FR-8.1: Health Endpoint
**As a developer, I want a health endpoint so that I can quickly verify the backend is running.**

**Acceptance Criteria:**
- GET /api/health returns { ok: true }
- Response includes app name
- Endpoint does not depend on external datasets

---

#### FR-8.2: Recommendation Endpoint
**As a frontend developer, I want a recommendation endpoint so that the UI can display ranked parks without understanding raw datasets.**

**Acceptance Criteria:**
- Endpoint supports region, activity, preference, and limit
- Endpoint returns source, count, and recommendations
- Each recommendation includes name, region, score, verdict, reasons, and signals

---

#### FR-8.3: Dataset Fallback
**As a developer, I want fallback data so that the demo and app still work if an external dataset fails.**

**Acceptance Criteria:**
- Backend catches external data errors
- Backend returns fallback recommendations
- API response includes source as fallback data
- Frontend renders fallback results normally

---

## Non-Functional Requirements

### Performance
- API response time under 2 seconds for recommendation requests
- Frontend renders initial UI within 1 second
- Fallback data loads within 500ms

### Reliability
- App remains functional if external datasets fail
- Graceful degradation for weather and air quality data
- No critical errors visible to end users

### Maintainability
- Clear separation between scoring logic and data fetching
- API contracts remain stable across versions
- Code structure supports easy addition of new signals

### Scalability
- [ASSUMPTION] Cache strategy for frequently requested recommendations in future versions
- [ASSUMPTION] Support for concurrent users in future versions (not MVP concern)

---

## Data Strategy

### Core Data Sources
- **Parks and Nature Reserves**: Names, geometry, location, region classification
- **Park Connector Loop**: Cycling-friendly signals, route-connected signals
- **NParks Tracks**: Walking routes, track availability, connector network

### Condition Data
- **2-Hour Weather Forecast**: Rain warnings, weather-safe scoring
- **PM2.5**: Air quality warnings, long-walk caution

### Fallback Data Strategy
- **MVP**: Static JSON with 10-15 sample parks to ensure demo reliability
- **Production**: [ASSUMPTION] Fetch from data.gov.sg APIs with fallback to cached data

---

## API Contracts

### Health API
**Request:** `GET /api/health`

**Response:**
```json
{
  "ok": true,
  "app": "WeekendWhere SG",
  "version": "1.0.0"
}
```

### Recommendations API
**Request:** `GET /api/recommendations?region=East&activity=cycling&preference=balanced&limit=6`

**Query Parameters:**
| Parameter | Required | Example | Description |
|-----------|----------|---------|-------------|
| region | Yes | East | Preferred Singapore region |
| activity | Yes | cycling | User's planned outdoor activity |
| preference | No | balanced | Planning preference |
| limit | No | 6 | Number of results to return |

**Response:**
```json
{
  "source": "data.gov.sg via backend",
  "region": "East",
  "activity": "cycling",
  "preference": "balanced",
  "count": 3,
  "recommendations": [
    {
      "id": "east-coast-park",
      "name": "East Coast Park",
      "region": "East",
      "score": 9,
      "verdict": "Great choice",
      "activityFit": "cycling",
      "description": "Good outdoor option for cycling, walking, or a casual weekend plan.",
      "reasons": [
        "Matches selected region",
        "Strong fit for cycling",
        "Route or connector signal available"
      ],
      "signals": {
        "weather": {
          "status": "not_checked_in_mvp",
          "label": "Weather check available in future version"
        },
        "airQuality": {
          "status": "not_checked_in_mvp",
          "label": "PM2.5 check available in future version"
        },
        "route": {
          "status": "available",
          "label": "Route signal available"
        }
      }
    }
  ]
}
```

---

## Scoring Model

### Base Score
Every outdoor option starts with 1 point.

### Region Match
- Add 3 points if region matches selected region
- Add reason: "Matches selected region"

### Activity Match
**Family:** +3 points if family signal, +2 points if kid-friendly signal → "Good for family outing"

**Walking:** +3 points if walking signal, +2 points if long-walk or track signal → "Good for walking"

**Cycling:** +3 points if cycling signal, +2 points if route or connector signal → "Good for cycling"

**Nature:** +3 points if nature signal, +2 points if nature reserve → "Nature-focused park"

**Fitness:** +3 points if fitness signal, +1 point if walking or route signal → "Good for active outdoor plans"

### Preference Bonuses
**Balanced:** No additional scoring

**Weather-Safe:** MVP notes future integration

**Kid-Friendly:** +2 points for kid-friendly signal → "Bonus for kid-friendly preference"

**Long Walk:** +2 points for route, track, or long-walk signal → "Bonus for long-walk preference"

**Cycling-Friendly:** +2 points for cycling or route signal → "Bonus for cycling-friendly preference"

### Verdict Rules
| Score | Verdict |
|-------|---------|
| 9+ | Perfect weekend pick |
| 7-8 | Great choice |
| 5-6 | Good option |
| 3-4 | Okay, check conditions |
| <3 | Maybe choose another place |

---

## MVP Scope Definition

### Build in MVP (Sprint 1-2)
- Region selector (Central, East, West, North, South)
- Activity selector (Family, Walking, Cycling, Nature, Fitness)
- Preference selector (Balanced, Kid-friendly, Long walk, Cycling-friendly)
- Health endpoint
- Recommendation endpoint
- Rule-based scoring engine
- Fallback park data (10-15 sample parks)
- Recommendation cards with score, verdict, reasons
- Loading state
- Empty state
- Responsive mobile design

### Build in Future Versions (Sprint 3+)
- Full weather integration (2-hour forecast)
- Full PM2.5 air quality integration
- Area search by town/name
- GPS-based location recommendations
- Preference memory (local storage)
- Accessibility signals
- Route distance calculations

### Never Build (Out of Scope)
- User authentication/login
- Facility booking/reservation
- Social features/sharing
- Live crowd prediction
- Full navigation/turn-by-turn
- Health/medical advice
- Push notifications
- ML-based personalization

---

## 90-Minute Training Demo Vertical Slice

**Purpose:** Demonstrate spec-driven development methodology

**Build Live:**
- Express backend setup
- SvelteJS frontend with shadcn-svelte components
- Health endpoint (2 min)
- Recommendation endpoint (20 min)
- Rule-based scoring function (10 min)
- Reasons generator (5 min)
- Region selector (5 min)
- Activity selector (5 min)
- Preference selector (5 min)
- API call handler (10 min)
- Recommendation cards renderer (15 min)
- Loading/error states (5 min)
- Demo and explanation (10 min)

**Success Criteria:**
By end of session, attendees should see:
- A working web app in browser
- Frontend calling backend through API contract
- Backend returning ranked recommendations matching PRD
- Scoring logic traceable to requirements
- Explainable recommendation cards
- Clear extension points for full product

---

## Success Metrics

### Training Demo Success
- Attendee understanding survey positive feedback
- PRD-to-code traceability clearly demonstrated
- 90-min time management achieved
- Working vertical slice delivered

### Product Success (Future)
- Users can decide where to go outdoors within 30 seconds
- Recommendations match user intent and conditions
- Users understand why each recommendation was made
- App works reliably even when external data fails
- [ASSUMPTION] User engagement measured by recommendations per session

---

## Risks and Mitigations

**Risk 1: Looks Like a Park Directory**
- *Mitigation:* Position as a recommendation assistant, not a directory. Focus on decision-making, not browsing.

**Risk 2: Dataset Does Not Have All Required Fields**
- *Mitigation:* [ASSUMPTION] Use backend enrichment and rule-based tags. Improve with additional datasets over time.

**Risk 3: Weather and Air Quality APIs Fail**
- *Mitigation:* Use fallback labels and keep recommendation flow working.

**Risk 4: Region Classification Is Approximate**
- *Mitigation:* Start with simple region mapping. Later improve with planning areas or proper geospatial lookup.

**Risk 5: 90-Minute Scope Becomes Too Big**
- *Mitigation:* Build only the recommendation slice. Keep stretch features as clearly defined future epics.

**Risk 6: [ASSUMPTION] User Needs Not Validated**
- *Mitigation:* Plan user research sessions after MVP launch. Iterate based on real Singapore user feedback.

---

## Tech Stack [DECISION LOCKED]

### Backend
- **Runtime:** Node.js 20.x LTS
- **Framework:** Express 4.x
- **Language:** TypeScript 5.x
- **Data:** Static JSON fallback → data.gov.sg API integration

### Frontend
- **Framework:** SvelteJS 4.x
- **Components:** shadcn-svelte (pre-built, accessible, customizable)
- **Styling:** Tailwind CSS
- **Build Tool:** Turborepo (monorepo structure)
- **Language:** TypeScript 5.x

### Monorepo Structure
```
/
├── apps/
│   ├── web/          # SvelteKit frontend
│   └── api/          # Express backend
├── packages/
│   ├── ui/           # Shared shadcn-svelte components
│   ├── config/       # Shared ESLint, TypeScript, Tailwind configs
│   └── types/        # Shared TypeScript types
```

---

## Definition of Done

### MVP (Sprint 1-2)
- [ ] App opens in browser
- [ ] User can select region, activity, and preference
- [ ] Frontend calls backend API
- [ ] Backend returns ranked recommendations
- [ ] Each card shows name, region, score, verdict, and reasons
- [ ] App handles empty or fallback data
- [ ] Scoring logic is traceable to the PRD
- [ ] Responsive on mobile devices

### Training Demo (Sprint 0)
- [ ] Working web app demonstrated
- [ ] Frontend-backend API integration shown
- [ ] Scoring rules matching PRD visible in code
- [ ] Explainable recommendation cards rendered
- [ ] Clear extension points identified
- [ ] Time managed within 90 minutes

---

## Open Questions

### For Architecture Phase
- [ ] Should the recommendation engine be pluggable for future ML-based scoring?
- [ ] How should we handle caching for frequent region/activity combinations?
- [ ] What monitoring/observability is needed for production?

### For UX Phase
- [ ] [RESOLVED] Singapore-centric design system — see DESIGN.md and EXPERIENCE.md
- [ ] Should we include a "surprise me" random option?
- [ ] How do we handle the case when no parks match the criteria?

### For Data Strategy
- [ ] [ASSUMPTION] data.gov.sg APIs provide required park fields — validation needed
- [ ] What is the fallback data refresh strategy for production?
- [ ] Are there licensing restrictions on using NParks data commercially?

---

## Next Steps After PRD

1. **UX Phase** — Design Singapore-centric visual identity and interaction patterns (DESIGN.md + EXPERIENCE.md)
2. **Architecture Phase** — Define system invariants, tech stack, data flow, API contracts (ARCHITECTURE-SPINE.md)
3. **Epics & Stories** — Break down FRs into actionable user stories with acceptance criteria
4. **Sprint Planning** — Plan Sprint 0 (demo), Sprint 1-2 (MVP), Sprint 3+ (advanced features)
5. **Implementation** — Begin spec-driven development with vertical slice demonstration

---

*End of PRD Draft — Status: Draft, pending review and iteration*
