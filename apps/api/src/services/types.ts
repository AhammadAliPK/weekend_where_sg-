// Scoring Service Types
// Type definitions for the scoring service

import type { Park } from '@weekend-where-sg/types';

/**
 * User preferences for scoring
 */
export interface UserPreferences {
	region: string;
	activity: string;
	preference: string;
}

/**
 * Scoring result containing score, verdict, and reasons
 */
export interface ScoringResult {
	score: number;
	verdict: string;
	reasons: string[];
}
