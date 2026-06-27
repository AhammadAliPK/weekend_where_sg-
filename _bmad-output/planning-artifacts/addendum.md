# Addendum: WeekendWhere SG PRD

## Technical Implementation Notes

### Tech Stack Considerations
- Backend: Express.js for rapid development
- Frontend: Vanilla JS or React for training simplicity
- Data: Static JSON fallback with data.gov.sg API integration path
- Hosting: Local development for demo, deployable to any Node.js hosting

### Scoring Logic Implementation
The scoring function should be implemented as a pure function that takes:
- Park data with signals
- User preferences (region, activity, preference)
- Returns: score, verdict, and reasons array

This allows easy testing and modification without touching API contracts.

### Data Normalization Strategy
Backend should normalize raw park data into a consistent schema:
- id, name, region (required)
- signals: { family, walking, cycling, nature, fitness, route, kidFriendly }
- description (optional)

This separation allows easy swapping of data sources without breaking the scoring engine.

## Open Questions

### For Architecture Phase
- Should the recommendation engine be pluggable for future ML-based scoring?
- How should we handle caching for frequent region/activity combinations?
- What monitoring/observability is needed for production?

### For UX Phase
- Mobile-first or responsive design approach?
- Should we include a "surprise me" random option?
- How do we handle the case when no parks match the criteria?

## Training Demo Considerations

### Time Management
The 90-minute build requires tight scope management. Consider having:
- Pre-written HTML/CSS shell for the frontend
- Stubbed scoring function that can be filled in quickly
- Sample park data ready to copy-paste

### Teaching Moments
Key learning points to highlight during the demo:
1. How PRD maps to API contracts
2. Importance of graceful degradation
3. Separation of concerns (scoring vs data fetching)
4. How to extend beyond MVP without breaking existing code

### Backup Options
If time runs short:
- Skip empty state styling
- Use hardcoded verdict thresholds instead of dynamic function
- Reduce number of sample parks to 5 instead of 10-15
