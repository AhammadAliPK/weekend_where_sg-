// Shared TypeScript types package
// This package contains API contracts and shared interfaces

/**
 * Park signals for scoring
 * Signals are extensible - new signals can be added without breaking existing code
 * Each signal indicates presence/strength as boolean or number
 */
export interface ParkSignals {
	activity?: boolean | number;      // General recreational activities available
	family?: boolean | number;         // Family-friendly facilities and features
	cycling?: boolean | number;        // Cycling infrastructure and tracks
	nature?: boolean | number;         // Natural features and wildlife
	fitness?: boolean | number;        // Fitness equipment and exercise areas
	route?: boolean | number;          // Walking/jogging routes and trails
	kidFriendly?: boolean | number;   // Child-safe amenities and playgrounds
	wifi?: boolean | number;          // WiFi/internet availability
	parking?: boolean | number;       // Parking availability
	food?: boolean | number;          // Food and beverage options
	[key: string]: boolean | number | undefined; // Allow extensible signals
}

export interface MRTStation {
	name: string;           // Station name (e.g., "Botanic Gardens")
	lineCode: string;       // MRT line code (e.g., "CC", "EW", "NS", "DT", "NE")
	walkingTimeMinutes: number; // Walking time from station to park in minutes
	distanceKm: number;     // Distance from station to park in kilometers
}

export interface Park {
	id?: string; // Optional ID for database records
	name: string;
	region: string;
	activities: string[];
	amenities: string[];
	description?: string;
	signals?: ParkSignals; // Extensible signals object
	mrtStations?: MRTStation[]; // Nearest MRT stations with walking times
}

export interface Recommendation {
	park: Park;
	score: number;
	reasons: string[];
}

export interface RecommendationRequest {
	region: string;
	activity: string;
	preference: string;
}

export interface UserPreferences {
	region: string;
	activity: string;
	preference: string;
}

export interface RecommendationsResponse {
	recommendations: Recommendation[];
	total: number;
	timestamp: string;
}

export interface HealthResponse {
	status: string;
	timestamp: string;
	uptime: number;
}
