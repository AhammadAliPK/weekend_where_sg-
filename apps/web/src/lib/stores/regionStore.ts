import { writable } from 'svelte/store';

export type Region = 'Central' | 'East' | 'West' | 'North' | 'South';

interface RegionState {
	selected: Region | null;
}

const initialState: RegionState = {
	selected: null
};

function createRegionStore() {
	const { subscribe, set, update } = writable<RegionState>(initialState);

	return {
		subscribe,
		set: (region: Region | null) => {
			update(state => ({ ...state, selected: region }));
		},
		reset: () => set(initialState)
	};
}

export const regionStore = createRegionStore();
