import { writable } from 'svelte/store';

export type Preference = 'Balanced' | 'Weather-safe' | 'Kid-friendly' | 'Long walk' | 'Cycling-friendly';

interface PreferenceState {
	selected: Preference | null;
}

const initialState: PreferenceState = {
	selected: null
};

function createPreferenceStore() {
	const { subscribe, set, update } = writable<PreferenceState>(initialState);

	return {
		subscribe,
		set: (preference: Preference | null) => {
			update(state => ({ ...state, selected: preference }));
		},
		reset: () => set(initialState)
	};
}

export const preferenceStore = createPreferenceStore();
