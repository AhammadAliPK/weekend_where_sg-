import { writable, derived } from 'svelte/store';
import { regionStore } from './regionStore';
import { activityStore } from './activityStore';
import { preferenceStore } from './preferenceStore';

export interface Recommendation {
	parkName: string;
	region: string;
	score: number;
	verdict: string;
	reasons: string[];
}

interface RecommendationsState {
	items: Recommendation[];
	loading: boolean;
	error: string | null;
}

const initialState: RecommendationsState = {
	items: [],
	loading: false,
	error: null
};

function createRecommendationsStore() {
	const { subscribe, set, update } = writable<RecommendationsState>(initialState);

	// Derived store for when recommendations should be fetched
	const shouldFetch = derived(
		[regionStore, activityStore, preferenceStore],
		([$region, $activity, $preference]) => {
			return !!$region.selected && !!$activity.selected && !!$preference.selected;
		}
	);

	return {
		subscribe,
		shouldFetch,
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
