// API client utilities for WeekendWhere SG frontend
// Part of Phase 5: Error Handling

import { apiConfig } from '$lib/config/env';

const API_BASE_URL = apiConfig.baseUrl;

export interface RecommendationResponse {
	id: string;
	parkName: string;
	region: string;
	score: number;
	verdict: string;
	activityFit: string;
	description: string;
	reasons: string[];
	signals: Record<string, number | boolean>;
	mrtStations?: Array<{
		name: string;
		lineCode: string;
		walkingTimeMinutes: number;
		distanceKm: number;
	}>;
	activities?: string[];
	amenities?: string[];
}

export interface RecommendationsAPIResponse {
	source: string;
	region: string;
	activity: string;
	preference: string;
	count: number;
	recommendations: RecommendationResponse[];
	timestamp: string;
}

export interface RecommendationsRequest {
	region: string;
	activity: string;
	preference: string;
	limit?: number;
}

/**
 * Fetch recommendations from the backend API
 *
 * @param request - Recommendation request parameters
 * @returns Promise with recommendations response
 * @throws Error if API call fails
 */
export async function fetchRecommendations(
	request: RecommendationsRequest
): Promise<RecommendationsAPIResponse> {
	const params = new URLSearchParams({
		region: request.region,
		activity: request.activity,
		preference: request.preference,
		limit: (request.limit || 6).toString()
	});

	const url = `${API_BASE_URL}/api/recommendations?${params.toString()}`;
	const response = await fetch(url);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({
			error: 'UNKNOWN_ERROR',
			message: 'An unknown error occurred'
		}));

		throw new Error(errorData.message || 'Failed to fetch recommendations');
	}

	return response.json();
}

/**
 * Check backend API health
 *
 * @returns Promise with health status
 */
export async function checkHealth(): Promise<{ ok: boolean; app: string; version: string; timestamp: string }> {
	const response = await fetch(`${API_BASE_URL}/api/health`);

	if (!response.ok) {
		throw new Error('Health check failed');
	}

	return response.json();
}
