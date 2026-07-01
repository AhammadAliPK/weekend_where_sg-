import { writable, derived, get } from 'svelte/store';
import { regionStore } from './regionStore';
import { activityStore } from './activityStore';
import { preferenceStore } from './preferenceStore';
import { fetchRecommendations as fetchFromAPI, type RecommendationResponse } from '../api/client';

export interface MRTStation {
	name: string;
	lineCode: string;
	walkingTimeMinutes: number;
	distanceKm: number;
}

export interface Recommendation {
	id: string;
	parkName: string;
	region: string;
	score: number;
	verdict: string;
	activityFit: string;
	description: string;
	reasons: string[];
	signals: Record<string, number | boolean>;
	mrtStations?: MRTStation[];
	activities?: string[];
	amenities?: string[];
}

interface RecommendationsState {
	items: Recommendation[];
	loading: boolean;
	error: string | null;
	lastFetched: string | null;
}

interface RecommendationsRequest {
	region: string;
	activity: string;
	preference: string;
	limit?: number;
}

const initialState: RecommendationsState = {
	items: [],
	loading: false,
	error: null,
	lastFetched: null
};

// Debounce timer
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

// Flag to prevent multiple simultaneous fetches
let isFetching = false;

function createRecommendationsStore() {
	const { subscribe, set, update } = writable<RecommendationsState>(initialState);

	// Derived store for when recommendations should be fetched
	const shouldFetch = derived(
		[regionStore, activityStore, preferenceStore],
		([$region, $activity, $preference]) => {
			return !!$region.selected && !!$activity.selected && !!$preference.selected;
		}
	);

	/**
	 * Fetch recommendations from the API with debouncing
	 *
	 * @param request - Recommendation request parameters
	 * @param debounceMs - Debounce delay in milliseconds (default: 300ms)
	 */
	async function fetchRecommendations(request: RecommendationsRequest, debounceMs = 300): Promise<void> {
		// Prevent multiple simultaneous fetches
		if (isFetching) {
			return;
		}

		// Clear existing timer
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		// Set loading state and fetch flag
		isFetching = true;
		update(state => ({ ...state, loading: true, error: null }));

		// Debounce the API call
		return new Promise((resolve, reject) => {
			debounceTimer = setTimeout(async () => {
				try {
					const response = await fetchFromAPI(request);

					// Transform API response to store format
					const recommendations: Recommendation[] = response.recommendations.map(rec => ({
						id: rec.id,
						parkName: rec.parkName,
						region: rec.region,
						score: rec.score,
						verdict: rec.verdict,
						activityFit: rec.activityFit,
						description: rec.description,
						reasons: rec.reasons,
						signals: rec.signals,
						mrtStations: rec.mrtStations || [],
						activities: rec.activities || [],
						amenities: rec.amenities || []
					}));

					update(state => ({
						...state,
						items: recommendations,
						loading: false,
						error: null,
						lastFetched: new Date().toISOString()
					}));

					isFetching = false;
					resolve();
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Failed to fetch recommendations';
					update(state => ({
						...state,
						loading: false,
						error: errorMessage
					}));

					isFetching = false;
					reject(error);
				}
			}, debounceMs);
		});
	}

	/**
	 * Trigger recommendation fetch based on current selector values
	 */
	async function triggerFetch(): Promise<void> {
		const region = get(regionStore).selected;
		const activity = get(activityStore).selected;
		const preference = get(preferenceStore).selected;

		if (!region || !activity || !preference) {
			update(state => ({ ...state, items: [], loading: false, error: null }));
			return;
		}

		await fetchRecommendations({
			region,
			activity,
			preference,
			limit: 6
		});
	}

	return {
		subscribe,
		shouldFetch,
		fetchRecommendations,
		triggerFetch,
		setLoading: () => {
			update(state => ({ ...state, loading: true, error: null }));
		},
		setRecommendations: (recommendations: Recommendation[]) => {
			update(state => ({ ...state, items: recommendations, loading: false, error: null }));
		},
		setError: (error: string) => {
			update(state => ({ ...state, loading: false, error }));
		},
		reset: () => set(initialState)
	};
}

export const recommendationsStore = createRecommendationsStore();
