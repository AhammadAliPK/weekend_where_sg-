# WeekendWhere SG — Training Prep Checklist

## Ready for Tomorrow (90-min Live Build)

### Documents ✓
- [x] Product Brief — clear and concise
- [x] Full PRD — comprehensive with epics, stories, and API contracts
- [x] MVP Scope — clearly defined vertical slice

### Pre-Build Setup (Do Tonight)
- [ ] **Create fallback park data** JSON file with 10-15 sample parks
  - Include: id, name, region, activity signals (family, walking, cycling, nature, fitness)
  - Example: East Coast Park (East, cycling route signal), Botanic Gardens (Central, nature/family)
- [ ] **Scaffold project** with Express backend + vanilla/React frontend
- [ ] **Pre-create API routes** structure (even if empty)
  - `/api/health`
  - `/api/recommendations`
- [ ] **Pre-write scoring function stub** for quick implementation
- [ ] **Test locally** that server starts and frontend loads

### During Session (90-min breakdown)
- [ ] **0:00-0:15**: Explain PRD → API contract (show, don't just tell)
- [ ] **0:15-0:45**: Build backend
  - Health endpoint (2 min)
  - Recommendations endpoint (20 min)
  - Scoring logic (10 min)
  - Reasons generator (5 min)
  - Test with Postman/curl (3 min)
- [ ] **0:45-1:20**: Build frontend
  - Region selector (5 min)
  - Activity selector (5 min)
  - Preference selector (5 min)
  - API call handler (10 min)
  - Recommendation cards renderer (15 min)
  - Loading/error states (5 min)
- [ ] **1:20-1:30**: Demo live + explain roadmap

### Stretch Features (Explicitly Skip)
- [ ] Weather API integration
- [ ] PM2.5 air quality
- [ ] Real park dataset fetch
- [ ] Map view
- [ ] GPS location

### Success Criteria
By end of session, attendees should see:
- [ ] Working web app in browser
- [ ] Selectors work and update recommendations
- [ ] Backend returns JSON matching API contract
- [ ] Cards show: name, region, score, verdict, reasons
- [ ] Scoring is explainable and traceable to PRD
- [ ] Clear path to full product visible in codebase

### Backup Plans
- [ ] If live dataset fails: Use fallback data
- [ ] If scoring takes too long: Use simplified version
- [ ] If frontend takes too long: Pre-build UI shell
