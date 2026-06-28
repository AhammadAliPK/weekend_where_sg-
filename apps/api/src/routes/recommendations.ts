import { Router, Request, Response } from 'express';
import type {
	RecommendationsRequest,
	RecommendationsResponse,
	Recommendation,
	ErrorResponse
} from '../types/api.js';

const router = Router();

// Validation helper
function validateRecommendationRequest(
	region: unknown,
	activity: unknown,
	preference: unknown,
	limit: unknown
): RecommendationsRequest | null {
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
			region: region as any,
			activity: activity as any,
			preference: preference as any,
			limit: typeof limit === 'string' ? parseInt(limit, 10) || 10 : 10
		};
	}

	return null;
}

router.get('/', (req: Request, res: Response) => {
	const { region, activity, preference, limit } = req.query;

	// Validate request
	const request = validateRecommendationRequest(region, activity, preference, limit);

	if (!request) {
		const errorResponse: ErrorResponse = {
			success: false,
			error: 'INVALID_REQUEST',
			message: 'Invalid or missing parameters. Required: region, activity, preference',
			timestamp: new Date().toISOString()
		};
		return res.status(400).json(errorResponse);
	}

	// TODO: Implement actual scoring logic
	// For now, return mock recommendations
	const mockRecommendations: Recommendation[] = [
		{
			parkName: 'East Coast Park',
			region: request.region,
			score: 8.5,
			verdict: 'Great choice!',
			reasons: [
				'Perfect for your selected activity',
				'Good weather conditions expected',
				'Highly rated by visitors'
			]
		}
	];

	const response: RecommendationsResponse = {
		success: true,
		data: mockRecommendations.slice(0, request.limit),
		count: mockRecommendations.length,
		parameters: request
	};

	res.json(response);
});

export default router;
