# WeekendWhere SG - Sprint Plan

**Created:** 2026-06-27  
**Project:** weekend_where_sg  
**Tracking Period:** 90-minute live build + full product development

---

## 📊 Overview

| Metric | Count |
|--------|-------|
| **Total Epics** | 6 |
| **Total Stories** | 42 |
| **Demo Stories (90-min)** | 17 (optimized) |
| **Full Product Stories** | 42 |
| **Deferred Stories** | 9 (Epic 6) |

### ⏱️ Time Allocation

| Phase | Original Plan | Optimized Demo Plan |
|-------|---------------|---------------------|
| Epic 1: Foundation | 15 min | 10 min |
| Epic 2: Discovery | 20 min | 15 min |
| Epic 3: Scoring | 20 min | 15 min |
| Epic 4: Data | 10 min | 5 min |
| Epic 5: UX | 30 min | 15 min |
| Epic 6: Advanced | Deferred | - |
| **TOTAL** | **95 min** | **90 min** ⚡ |

---

## 🚨 Code Review Crew Feedback

### Critical Gaps (Must Add)

| Gap | Priority | Epic | Status |
|-----|----------|------|--------|
| Input validation & sanitization (XSS prevention) | HIGH | Epic 2 | Added to story-2.6 notes |
| Timeout & circuit breaker handling | HIGH | Epic 4 | Added to story-4.2 notes |
| Request cancellation for rapid selector changes | HIGH | Epic 3 | Added to story-3.6 notes |
| **Deploy & smoke test verification** | **CRITICAL** | Epic 5 | ✅ **Added as story-5.deploy** |

### Optimization Suggestions

1. **Use SvelteKit template** instead of manual Turborepo setup → Saves 10-15 min
2. **Merge Epic 2 and Epic 3** stories → Same feature, different angles
3. **Mobile-only first** → Defer tablet/desktop responsiveness
4. **Basic accessibility** for demo → Full WCAG AA post-demo

### Edge Cases Identified (17 gaps)

- Rapid selector changes (< 300ms)
- Zero results from API
- API 500 errors
- API timeouts
- Malformed JSON responses
- NaN scores from bad data
- Location permission denied
- localStorage full/disabled
- Slow networks
- Weather/air quality API hangs
- Fallback data missing/corrupt

---

## ⚡ Optimized 90-Minute Demo Plan

### Phase 1: Setup & Foundation (10 min)
**Stories:** 1.1, 1.3, 1.4

- ✅ Initialize Turborepo (or use SvelteKit template)
- ✅ Set up SvelteKit frontend
- ✅ Implement Express backend

### Phase 2: Selectors & UI (15 min)
**Stories:** 2.1, 2.2, 2.3, 2.4

- ✅ Build Region Selector
- ✅ Build Activity Selector
- ✅ Build Preference Selector
- ✅ Build Recommendation Card (with mock data)

### Phase 3: Scoring Engine (15 min)
**Stories:** 3.1, 3.2, 3.3, 3.4

- ✅ Implement pure function scoring
- ✅ Implement signal-based data structure
- ✅ Implement region-based scoring
- ✅ Implement activity-based scoring

### Phase 4: API Integration (20 min)
**Stories:** 2.5, 2.6, 4.1, 2.7

- ✅ Implement health endpoint
- ✅ Implement recommendations endpoint
- ✅ Create fallback park data
- ✅ Connect frontend to backend

### Phase 5: Error Handling (10 min)
**Stories:** 4.2, 5.3

- ✅ Implement graceful error handling
- ✅ Implement user-friendly error states

### Phase 6: Deploy & Verify (20 min) 🔥 CRITICAL
**Story:** 5.deploy

- ✅ Deploy backend to production
- ✅ Deploy frontend to production
- ✅ Complete smoke test

**Smoke Test Checklist:**
- [ ] Production URL loads in browser
- [ ] Health endpoint responds
- [ ] Selectors work in production
- [ ] API returns recommendations
- [ ] Cards display correctly
- [ ] Error handling works
- [ ] Mobile responsive verified
- [ ] **End-to-end user journey completes successfully**

---

**Full sprint plan details available in sprint-plan.yaml**
