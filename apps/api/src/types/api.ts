// API Contract Types for WeekendWhere SG

export type Region = 'Central' | 'East' | 'West' | 'North' | 'South';
export type Activity = 'Family outing' | 'Walking' | 'Cycling' | 'Nature' | 'Fitness';
export type Preference = 'Balanced' | 'Weather-safe' | 'Kid-friendly' | 'Long walk' | 'Cycling-friendly';

export interface Recommendation {
	parkName: string;
	region: Region;
	score: number;
	verdict: string;
	reasons: string[];
}

export interface HealthResponse {
	ok: boolean;
	app: string;
	version: string;
	timestamp: string;
}

export interface RecommendationsRequest {
	region: Region;
	activity: Activity;
	preference: Preference;
	limit?: number;
}

export interface RecommendationsResponse {
	success: boolean;
	data: Recommendation[];
	count: number;
	parameters: RecommendationsRequest;
}

export interface ErrorResponse {
	success: false;
	error: string;
	message: string;
	timestamp: string;
}
