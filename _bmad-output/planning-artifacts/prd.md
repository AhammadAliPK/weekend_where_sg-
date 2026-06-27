---
title: PRD: WeekendWhere SG
status: draft
created: 2026-06-27
updated: 2026-06-27
altitude: feature
purpose: Training demonstration of spec-driven development with 90-min live build
---

# WeekendWhere SG

**Working Codename:** ParkKaki

## Product Summary

WeekendWhere SG is a Singapore outdoor decision assistant that helps users decide where to go for a walk, cycle, family outing, nature visit, or fitness activity. The product recommends parks, nature areas, and park connector routes based on user intent, location preference, weather conditions, air quality, facilities, and route suitability.

**The goal is not to replace an official park directory.** The goal is to help users answer one practical question: *"Where should I go this weekend?"*

## Problem Statement

Singapore has many parks, gardens, nature reserves, and park connectors. However, users often struggle to choose the right place for their situation.

A user may ask:
- Where can I bring my kids this weekend?
- Where can I cycle in the East?
- Where can I go for a long walk?
- Is the weather okay now?
- Is the air quality okay for outdoor activity?
- Which place is suitable for nature, not just exercise?

Current park discovery often requires users to browse and compare manually across multiple sources. WeekendWhere SG solves this by ranking outdoor options and explaining why each one is suitable.

## Product Vision

Make outdoor planning in Singapore simple, practical, and context-aware.

The app should help users decide in under 30 seconds where to go outdoors based on what they want to do and current conditions.

## Product Positioning

Existing park websites help users **browse** park information.
WeekendWhere SG helps users **make a decision**.

It combines user intent, region, activity type, weather conditions, air quality, park suitability, route signals, family-friendly signals, and explanation-based recommendations.

The product should feel like a smart weekend planning assistant, not just a list of parks.

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
People unfamiliar with Singapore parks who want simple recommendations.

**Developers and Product Teams**
For the masterclass, this product demonstrates how to turn public data into a full-stack recommendation app.

## Goals

### User Goals
- Choose an outdoor destination quickly
- Get recommendations based on activity
- Understand why a place is recommended
- Avoid bad outdoor conditions where possible
- Discover parks and routes beyond famous locations

### Product Goals
- Create a recommendation layer on top of public datasets
- Convert raw park and weather data into useful decision signals
- Provide explainable scoring
- Support future expansion into maps, route planning, and personalization

### Masterclass Goals
- Show how a big PRD becomes epics and stories
- Show how to choose a 90-minute vertical slice
- Show how a backend normalizes public data
- Show how frontend and backend are connected through a clear API contract
- Show how spec-driven development prevents scope confusion

## Non-Goals

The first version will **not** include:
- User login
- Paid booking
- Facility reservation
- Social media features
- Live GPS tracking
- Full navigation
- Live crowd prediction
- Health or medical advice
- Complex machine learning model
- Full map rendering
- Push notifications

These are future possibilities, not MVP requirements.

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

## Core User Journey

1. User opens WeekendWhere SG
2. User selects a region: Central, East, West, North, South
3. User selects an activity: Family outing, Walking, Cycling, Nature, Fitness
4. User selects a preference: Balanced, Weather-safe, Kid-friendly, Long walk, Cycling-friendly
5. User clicks "Recommend"
6. Frontend calls backend API
7. Backend fetches or loads park data
8. Backend normalizes data
9. Backend scores parks based on rules
10. Backend returns ranked recommendations
11. Frontend displays cards with name, region, activity fit, score, verdict, reasons, and condition signals
12. User chooses where to go

## Functional Requirements (Grouped by Epic)

### Epic 1: Outdoor Recommendation Discovery

**FR-1.1: Region Selection**
As a user, I want to select a Singapore region so that I can see outdoor options in the area I prefer.

**Acceptance Criteria:**
- User can select Central, East, West, North, or South
- Selected region is sent to the backend
- Recommendations prioritize parks in the selected region
- If no results exist, app shows a friendly empty state

**FR-1.2: Activity Selection**
As a user, I want to choose my outdoor activity so that recommendations match what I plan to do.

**Acceptance Criteria:**
- User can select Family, Walking, Cycling, Nature, or Fitness
- Backend receives the activity value
- Recommendation reasons mention the selected activity where relevant
- Changing activity changes ranking

**FR-1.3: Ranked Recommendations Display**
As a user, I want to see ranked outdoor recommendations so that I can quickly compare my options.

**Acceptance Criteria:**
- App displays recommendation cards
- Cards are sorted by score
- Each card shows score and verdict
- Each card shows at least two reasons
- Results are limited by API parameter

### Epic 2: Explainable Scoring Engine

**FR-2.1: Region-Based Scoring**
As a product owner, I want parks in the selected region to receive a score boost so that recommendations feel locally relevant.

**Acceptance Criteria:**
- Park gets region-match points if its region matches the selected region
- Recommendation includes reason: "Matches selected region"
- Score is returned in API response

**FR-2.2: Activity-Based Scoring**
As a user, I want the app to prioritize parks suitable for my selected activity so that the results are practical.

**Acceptance Criteria:**
- Cycling activity boosts parks with cycling or route signals
- Family activity boosts parks with family or kid-friendly signals
- Nature activity boosts parks with nature or reserve signals
- Fitness activity boosts parks with active outdoor signals
- Walking activity boosts parks with walking or long-walk signals

**FR-2.3: Recommendation Reasons Generation**
As a user, I want to understand why a park was recommended so that I can decide confidently.

**Acceptance Criteria:**
- Every recommendation has a reasons array
- Reasons are human-readable
- Reasons match the scoring rules
- At least two reasons are returned when possible

### Epic 3: Outdoor Condition Awareness

**FR-3.1: Weather-Safe Planning**
As a user, I want to know whether rain may affect my outdoor plan so that I can plan better.

**Acceptance Criteria:**
- Backend can fetch or receive weather forecast data
- If rain or thundery showers are detected, response includes weather warning
- If user selects Weather-safe preference, rainy conditions affect score
- Recommendation card shows weather label

**FR-3.2: Air Quality Awareness**
As a user, I want to know whether air quality is suitable for long outdoor activity so that I can avoid uncomfortable outdoor plans.

**Acceptance Criteria:**
- Backend can fetch PM2.5 data
- PM2.5 signal is mapped to broad Singapore region
- If air quality is elevated, long-walk and cycling recommendations include caution
- Card shows an air quality label

**FR-3.3: Condition-Based Verdict**
As a user, I want the final verdict to consider outdoor conditions so that the app gives realistic suggestions.

**Acceptance Criteria:**
- Score includes condition adjustments when data is available
- Verdict changes when weather or air quality is poor
- App still returns recommendations if condition data fails
- API includes a warning if condition data could not be loaded

### Epic 4: Route and Park Connector Intelligence

**FR-4.1: Route-Connected Parks Identification**
As a cyclist, I want parks connected to park connectors to rank higher so that I can plan a better ride.

**Acceptance Criteria:**
- Backend identifies parks with connector or route signals
- Cycling activity boosts route-connected parks
- Recommendation includes reason: "Route or connector signal available"

**FR-4.2: Long Walk Recommendations**
As a walker, I want to find parks suitable for longer walks so that I can plan a meaningful outdoor activity.

**Acceptance Criteria:**
- Long-walk preference boosts parks with track or route signals
- Recommendations include long-walk reasons
- Parks with only small or unknown walking signal rank lower

**FR-4.3: Route-Aware Extension Support**
As a product team, we want the system to support future route-distance calculations so that we can later recommend actual walk or cycling lengths.

**Acceptance Criteria:**
- API response supports a signals.route object
- Scoring function can accept route metadata
- Frontend does not need major changes when route data is added

### Epic 5: Family and Accessibility Suitability

**FR-5.1: Kid-Friendly Preference**
As a parent, I want to select Kid-friendly so that parks suitable for children rank higher.

**Acceptance Criteria:**
- Kid-friendly preference is available in UI
- Backend boosts parks with family or kid-friendly signals
- Recommendations include child-friendly reasons

**FR-5.2: Family Outing Mode**
As a family user, I want recommendations that are suitable for a relaxed outing so that I can avoid overly difficult routes.

**Acceptance Criteria:**
- Family activity boosts parks with open-space, garden, or easy-walk signals
- Nature reserves with difficult routes are not automatically ranked highest for family mode
- Cards explain why a park fits a family outing

**FR-5.3: Accessibility Signal Support**
As a user, I want to know whether a park looks suitable for an easy visit so that I can choose a low-effort plan.

**Acceptance Criteria:**
- Future API supports an accessibility or easy-visit signal
- Recommendation cards can display accessibility notes
- Missing accessibility data does not break the app

### Epic 6: Search, Location, and Personalization

**FR-6.1: Area Search**
As a user, I want to search by area or town so that I can find outdoor options near where I am.

**Acceptance Criteria:**
- User can enter an area name
- Backend maps search term to approximate region or coordinates
- Recommendations prioritize nearby results

**FR-6.2: Location-Based Recommendations**
As a user, I want to use my current location so that I can find nearby outdoor options.

**Acceptance Criteria:**
- Browser requests location permission
- If permission is denied, app falls back to region selector
- Location is used only for recommendation calculation
- App does not store precise location in MVP

**FR-6.3: Preference Memory**
As a returning user, I want the app to remember my common activity preference so that I can get recommendations faster.

**Acceptance Criteria:**
- App can store preference locally
- No account is required
- User can change stored preference

### Epic 7: Frontend Experience

**FR-7.1: Responsive Recommendation Cards**
As a user, I want cards that are easy to read on mobile so that I can use the app while planning outside.

**Acceptance Criteria:**
- Cards are readable on mobile
- Score and verdict are visually clear
- Reasons are shown as short bullets
- No horizontal scrolling is required

**FR-7.2: Loading and Error States**
As a user, I want the app to show what is happening so that I understand whether data is loading or unavailable.

**Acceptance Criteria:**
- UI shows loading state while API is called
- UI shows fallback message if backend uses fallback data
- UI shows empty state if no results are returned
- Technical errors are not shown directly to users

**FR-7.3: Interactive Filter Updates**
As a user, I want results to update when I change filters so that I can compare plans quickly.

**Acceptance Criteria:**
- Changing region refreshes recommendations
- Changing activity refreshes recommendations
- Changing preference refreshes recommendations
- API request includes current filter values

### Epic 8: Backend API and Data Normalization

**FR-8.1: Health Endpoint**
As a developer, I want a health endpoint so that I can quickly verify the backend is running.

**Acceptance Criteria:**
- GET /api/health returns { ok: true }
- Response includes app name
- Endpoint does not depend on external datasets

**FR-8.2: Recommendation Endpoint**
As a frontend developer, I want a recommendation endpoint so that the UI can display ranked parks without understanding raw datasets.

**Acceptance Criteria:**
- Endpoint supports region, activity, preference, and limit
- Endpoint returns source, count, and recommendations
- Each recommendation includes name, region, score, verdict, reasons, and signals

**FR-8.3: Dataset Fallback**
As a developer, I want fallback data so that the demo and app still work if an external dataset fails.

**Acceptance Criteria:**
- Backend catches external data errors
- Backend returns fallback recommendations
- API response includes source as fallback data
- Frontend renders fallback results normally

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

### Scalability (Future)
- Cache strategy for frequently requested recommendations
- Support for concurrent users in future versions

## Data Strategy

### Core Data Sources
- Parks and Nature Reserves: Names, geometry, location, region classification
- Park Connector Loop: Cycling-friendly signals, route-connected signals
- NParks Tracks: Walking routes, track availability, connector network

### Condition Data (Future)
- 2-Hour Weather Forecast: Rain warnings, weather-safe scoring
- PM2.5: Air quality warnings, long-walk caution

### Fallback Data Strategy
MVP uses static JSON with 10-15 sample parks to ensure demo reliability.
Production version fetches from data.gov.sg APIs with fallback to cached data.

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

## MVP Scope for 90-Minute Masterclass

### Build Live
- Express backend
- Static frontend
- Health endpoint
- Recommendation endpoint
- Region selector
- Activity selector
- Preference selector
- Fallback park data
- Basic dataset fetch if available
- Rule-based scoring
- Recommendation reasons
- Frontend cards
- Loading state
- Empty state

### Do Not Build Live (Stretch Features)
- Full weather integration
- Full PM2.5 integration
- Full map view
- GPS location
- Real route distance
- MRT search
- User profiles
- Saved preferences
- Push notifications

## Success Metrics

### Masterclass Success
At the end of the session, users should see:
- A working web app
- Frontend calling backend
- Backend returning ranked recommendations
- Scoring rules matching PRD
- Explainable recommendation cards
- Clear extension points for the full product

### Product Success (Future)
- Users can decide where to go outdoors within 30 seconds
- Recommendations match user intent and conditions
- Users understand why each recommendation was made
- App works reliably even when external data fails

## Risks and Mitigations

**Risk 1: Looks Like a Park Directory**
- *Mitigation:* Position as a recommendation assistant, not a directory. Focus on decision-making, not browsing.

**Risk 2: Dataset Does Not Have All Required Fields**
- *Mitigation:* Use backend enrichment and rule-based tags. Improve with additional datasets over time.

**Risk 3: Weather and Air Quality APIs Fail**
- *Mitigation:* Use fallback labels and keep recommendation flow working.

**Risk 4: Region Classification Is Approximate**
- *Mitigation:* Start with simple region mapping. Later improve with planning areas or proper geospatial lookup.

**Risk 5: 90-Minute Scope Becomes Too Big**
- *Mitigation:* Build only the recommendation slice. Keep stretch features as clearly defined future epics.

## Definition of Done

The demo slice is done when:
- App opens in browser
- User can select region, activity, and preference
- Frontend calls backend API
- Backend returns ranked recommendations
- Each card shows name, region, score, verdict, and reasons
- App handles empty or fallback data
- Scoring logic is traceable to the PRD
- The class can see how the product can expand after the demo
