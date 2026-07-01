// Scoring Service - Pure Function Implementation
// This service contains pure functions for scoring parks based on user preferences
// Part of Phase 3: Scoring Engine

import type { Park, Recommendation, ParkSignals } from '@weekend-where-sg/types';
import type { ScoringResult, UserPreferences } from './types.js';

/**
 * Pure scoring function that calculates park scores based on user preferences
 *
 * @param park - Park data to score
 * @param preferences - User preferences for scoring
 * @returns ScoringResult with score, verdict, and reasons
 *
 * Scoring Rules (from PRD):
 * - Base score: 5 points
 * - Region match: +2 points if park region matches user's selected region
 * - Activity match: +1 point if park supports user's selected activity
 * - Preference bonuses: +0-2 points based on preference alignment using signals
 * - Maximum score: 10 points
 *
 * Verdict mapping:
 * - 9+ = Perfect
 * - 7-8 = Great
 * - 5-6 = Good
 * - 3-4 = Okay
 * - <3 = Poor
 */
export function scorePark(park: Park, preferences: UserPreferences): ScoringResult {
	// Initialize scoring components
	const reasons: string[] = [];
	let score = 5; // Base score

	// Region match bonus (+3 points)
	if (park.region.toLowerCase() === preferences.region.toLowerCase()) {
		score += 3;
		reasons.push('Matches selected region');
	}

	// Activity match bonus using signals (+1 to +3 points based on signal strength)
	const activityBonus = calculateActivityBonus(park.signals || {}, preferences.activity, park.activities);
	score += activityBonus.score;
	reasons.push(...activityBonus.reasons);

	// Preference-based bonuses using signals (0-2 points)
	const preferenceBonus = calculatePreferenceBonus(park.signals || {}, preferences);
	score += preferenceBonus.score;
	reasons.push(...preferenceBonus.reasons);

	// Cap score at 10
	score = Math.min(score, 10);

	// Generate verdict based on final score
	const verdict = generateVerdict(score);

	return {
		score,
		verdict,
		reasons
	};
}

/**
 * Calculate activity-based bonus scores using signals
 *
 * @param signals - Park signals for scoring
 * @param activity - User selected activity
 * @param activities - Park activities array for fallback matching
 * @returns Bonus scoring result with score and reasons
 */
function calculateActivityBonus(signals: ParkSignals, activity: string, activities: string[]): ScoringResult {
	const reasons: string[] = [];
	let bonusScore = 0;

	// Helper function to safely get signal value
	const getSignalValue = (signal?: boolean | number): number => {
		if (typeof signal === 'number') return signal;
		if (typeof signal === 'boolean') return signal ? 1 : 0;
		return 0;
	};

	// Helper function to check if signal is present
	const hasSignal = (signal?: boolean | number): boolean => {
		return getSignalValue(signal) > 0;
	};

	// Activity-specific scoring logic using signals
	switch (activity) {
		case 'Cycling':
			// Cycling: parks with cycling signal receive +3 points
			const cyclingSignal = getSignalValue(signals.cycling);
			if (cyclingSignal >= 2) {
				bonusScore += 3;
				reasons.push('Good for cycling');
			} else if (cyclingSignal >= 1) {
				bonusScore += 2;
				reasons.push('Suitable for cycling');
			}

			// Parks with route/connector signal receive +2 points
			const routeSignal = getSignalValue(signals.route);
			if (routeSignal >= 1 && cyclingSignal < 2) {
				bonusScore += 2;
				reasons.push('Has cycling-friendly routes');
			}
			break;

		case 'Family outing':
			// Family: parks with family signal receive +3 points
			const familySignal = getSignalValue(signals.family);
			if (familySignal >= 2) {
				bonusScore += 3;
				reasons.push('Perfect for family activities');
			} else if (familySignal >= 1) {
				bonusScore += 2;
				reasons.push('Good for families');
			}

			// Additional kid-friendly bonus
			const kidFriendlySignal = getSignalValue(signals.kidFriendly);
			if (kidFriendlySignal >= 1 && familySignal < 2) {
				bonusScore += 1;
				reasons.push('Kid-friendly facilities available');
			}
			break;

		case 'Walking':
			// Walking: parks with route signal receive +3 points
			const walkingRouteSignal = getSignalValue(signals.route);
			if (walkingRouteSignal >= 2) {
				bonusScore += 3;
				reasons.push('Excellent for walking');
			} else if (walkingRouteSignal >= 1) {
				bonusScore += 2;
				reasons.push('Good for walking');
			}

			// Nature signal bonus for walking
			const natureSignal = getSignalValue(signals.nature);
			if (natureSignal >= 1 && walkingRouteSignal < 2) {
				bonusScore += 1;
				reasons.push('Nature trails available');
			}
			break;

		case 'Nature':
			// Nature: parks with nature signal receive +3 points
			if (getSignalValue(signals.nature) >= 2) {
				bonusScore += 3;
				reasons.push('Rich nature experience');
			} else if (hasSignal(signals.nature)) {
				bonusScore += 2;
				reasons.push('Natural features available');
			}

			// Route bonus for nature walks
			if (hasSignal(signals.route) && getSignalValue(signals.nature) < 2) {
				bonusScore += 1;
				reasons.push('Nature trails accessible');
			}
			break;

		case 'Fitness':
			// Fitness: parks with fitness signal receive +3 points
			if (getSignalValue(signals.fitness) >= 2) {
				bonusScore += 3;
				reasons.push('Excellent for fitness activities');
			} else if (hasSignal(signals.fitness)) {
				bonusScore += 2;
				reasons.push('Fitness options available');
			}

			// Route bonus for fitness activities
			if (hasSignal(signals.route) && getSignalValue(signals.fitness) < 2) {
				bonusScore += 1;
				reasons.push('Good routes for exercise');
			}
			break;

		default:
			// Generic activity bonus for activities not explicitly mapped
			if (activities.includes(activity)) {
				bonusScore += 1;
				reasons.push(`Great for ${activity.toLowerCase()}`);
			}
	}

	return {
		score: bonusScore,
		verdict: '', // Verdict is generated later
		reasons
	};
}

/**
 * Calculate preference-based bonus scores using signals
 *
 * @param signals - Park signals for scoring
 * @param preferences - User preferences
 * @returns Bonus scoring result with score and reasons
 */
function calculatePreferenceBonus(signals: ParkSignals, preferences: UserPreferences): ScoringResult {
	const reasons: string[] = [];
	let bonusScore = 0;

	// Helper function to safely get signal value
	const getSignalValue = (signal?: boolean | number): number => {
		if (typeof signal === 'number') return signal;
		if (typeof signal === 'boolean') return signal ? 1 : 0;
		return 0; // Unknown or undefined signals default to 0
	};

	// Helper function to check if signal is present
	const hasSignal = (signal?: boolean | number): boolean => {
		return getSignalValue(signal) > 0;
	};

	// Preference-specific scoring logic using signals
	switch (preferences.preference) {
		case 'Balanced':
			// Balanced: bonus for parks with diverse activity signals
			const activitySignal = getSignalValue(signals.activity);
			if (activitySignal >= 2) {
				bonusScore += 1;
				reasons.push('Offers diverse activity options');
			}
			const familySignal = getSignalValue(signals.family);
			if (familySignal >= 1) {
				bonusScore += 1;
				reasons.push('Family-friendly facilities available');
			}
			break;

		case 'Weather-safe':
			// Weather-safe: bonus for parks with covered/route signals
			if (hasSignal(signals.route) && getSignalValue(signals.route) >= 2) {
				bonusScore += 2;
				reasons.push('Has covered routes and sheltered areas');
			} else if (hasSignal(signals.route)) {
				bonusScore += 1;
				reasons.push('Has some covered options');
			}
			break;

		case 'Kid-friendly':
			// Kid-friendly: bonus for parks with kid-friendly signals
			const kidFriendlySignal = getSignalValue(signals.kidFriendly);
			if (kidFriendlySignal >= 2) {
				bonusScore += 2;
				reasons.push('Excellent kid-friendly facilities');
			} else if (kidFriendlySignal >= 1) {
				bonusScore += 1;
				reasons.push('Child-safe amenities available');
			}
			if (hasSignal(signals.family)) {
				bonusScore += 1;
				reasons.push('Perfect for family activities');
			}
			break;

		case 'Long walk':
			// Long walk: bonus for parks with route signals
			const routeSignal = getSignalValue(signals.route);
			if (routeSignal >= 2) {
				bonusScore += 2;
				reasons.push('Excellent walking trails and routes');
			} else if (routeSignal >= 1) {
				bonusScore += 1;
				reasons.push('Good for walking');
			}
			break;

		case 'Cycling-friendly':
			// Cycling-friendly: bonus for parks with cycling signals
			const cyclingSignal = getSignalValue(signals.cycling);
			if (cyclingSignal >= 2) {
				bonusScore += 2;
				reasons.push('Dedicated cycling tracks available');
			} else if (cyclingSignal >= 1) {
				bonusScore += 1;
				reasons.push('Suitable for cycling');
			}
			break;
	}

	// Extensible: Future preferences can be added here without breaking existing logic

	return {
		score: bonusScore,
		verdict: '', // Verdict is generated later
		reasons
	};
}

/**
 * Generate verdict text based on score
 *
 * @param score - Final score (0-10)
 * @returns Verdict text
 */
function generateVerdict(score: number): string {
	if (score >= 9) return 'Perfect';
	if (score >= 7) return 'Great';
	if (score >= 5) return 'Good';
	if (score >= 3) return 'Okay';
	return 'Poor';
}

/**
 * Batch score multiple parks
 *
 * @param parks - Array of parks to score
 * @param preferences - User preferences
 * @returns Array of scored recommendations
 */
export function scoreParks(parks: Park[], preferences: UserPreferences): Recommendation[] {
	return parks.map(park => {
		const scoringResult = scorePark(park, preferences);
		return {
			park,
			score: scoringResult.score,
			reasons: scoringResult.reasons
		};
	})
	.sort((a, b) => b.score - a.score); // Sort by score descending
}

/**
 * Test function to verify signals extensibility
 * This function demonstrates that new signals can be added without breaking existing code
 *
 * @param signals - Park signals (can include unknown future signals)
 * @returns Object showing how unknown signals are handled gracefully
 */
export function demonstrateSignalExtensibility(signals: Record<string, any>): {
	knownSignals: string[];
	unknownSignals: string[];
	totalSignals: number;
} {
	const knownSignalKeys = ['activity', 'family', 'cycling', 'nature', 'fitness', 'route', 'kidFriendly'];
	const knownSignals: string[] = [];
	const unknownSignals: string[] = [];

	Object.keys(signals).forEach(key => {
		if (knownSignalKeys.includes(key)) {
			knownSignals.push(key);
		} else {
			// Unknown signals are ignored gracefully
			unknownSignals.push(key);
		}
	});

	return {
		knownSignals,
		unknownSignals,
		totalSignals: Object.keys(signals).length
	};
}
