import { Router, Request, Response } from 'express';
import { scoreParks } from '../services/scoring.js';
import { loadParksDataWithFallback } from '../utils/dataLoader.js';
import type { ErrorResponse } from '../types/api.js';

const router = Router();

// Validation helper
function validateRecommendationRequest(
	region: unknown,
	activity: unknown,
	preference: unknown,
	limit: unknown
): { region: string; activity: string; preference: string; limit: number } | null {
	const validRegions = ['Central', 'East', 'West', 'North', 'South'];
	const validActivities = ['Family outing', 'Walking', 'Cycling', 'Nature', 'Fitness'];
	const validPreferences = ['Balanced', 'Weather-safe', 'Kid-friendly', 'Long walk', 'Cycling-friendly'];

	if (
		typeof region === 'string' &&
		validRegions.includes(region) &&
		typeof activity === 'string' &&
		validActivities.includes(activity) &&
		typeof preference === 'string' &&
		validPreferences.includes(preference)
	) {
		return {
			region: region,
			activity: activity,
			preference: preference,
			limit: typeof limit === 'string' ? parseInt(limit, 10) || 6 : 6 // Default to 6
		};
	}

	return null;
}

/**
 * GET /api/recommendations
 * Get personalized park recommendations based on user preferences
 *
 * Query parameters:
 * - region: Singapore region (Central, East, West, North, South)
 * - activity: Activity type (Family outing, Walking, Cycling, Nature, Fitness)
 * - preference: Preference type (Balanced, Weather-safe, Kid-friendly, Long walk, Cycling-friendly)
 * - limit: Maximum number of recommendations to return (default: 6)
 */
router.get('/', (req: Request, res: Response) => {
	const { region, activity, preference, limit } = req.query;

	// Validate request
	const request = validateRecommendationRequest(region, activity, preference, limit);

	if (!request) {
		const errorResponse: ErrorResponse = {
			success: false,
			error: 'INVALID_REQUEST',
			message: 'Invalid or missing parameters. Required: region, activity, preference. Valid regions: Central, East, West, North, South. Valid activities: Family outing, Walking, Cycling, Nature, Fitness. Valid preferences: Balanced, Weather-safe, Kid-friendly, Long walk, Cycling-friendly.',
			timestamp: new Date().toISOString()
		};
		return res.status(400).json(errorResponse);
	}

	try {
		// Load parks data with graceful error handling
		const { parks, source } = loadParksDataWithFallback(false);

		// Score parks using the scoring service
		const userPreferences = {
			region: request.region,
			activity: request.activity,
			preference: request.preference
		};

		const scoredRecommendations = scoreParks(parks, userPreferences);

		// Apply limit and transform to response format
		const limitedRecommendations = scoredRecommendations
			.slice(0, request.limit)
			.map(rec => ({
				id: rec.park.id || `park-${rec.park.name.toLowerCase().replace(/\s+/g, '-')}`,
				name: rec.park.name,
				region: rec.park.region,
				score: rec.score,
				verdict: rec.score >= 9 ? 'Perfect' : rec.score >= 7 ? 'Great' : rec.score >= 5 ? 'Good' : rec.score >= 3 ? 'Okay' : 'Poor',
				activityFit: rec.park.activities.includes(request.activity) ? 'Excellent' : 'Good',
				description: rec.park.description || '',
				reasons: rec.reasons,
				signals: rec.park.signals || {}
			}));

		// Build response matching API contract
		const response = {
			source: source, // Include source information (fallback data or external API)
			region: request.region,
			activity: request.activity,
			preference: request.preference,
			count: limitedRecommendations.length,
			recommendations: limitedRecommendations,
			timestamp: new Date().toISOString()
		};

		res.json(response);
	} catch (error) {
		console.error('Error generating recommendations:', error);

		const errorResponse: ErrorResponse = {
			success: false,
			error: 'INTERNAL_ERROR',
			message: 'An error occurred while generating recommendations. Please try again later.',
			timestamp: new Date().toISOString()
		};

		res.status(500).json(errorResponse);
	}
});

export default router;
