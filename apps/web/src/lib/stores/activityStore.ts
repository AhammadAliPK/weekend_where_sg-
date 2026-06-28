import { writable } from 'svelte/store';

export type Activity = 'Family outing' | 'Walking' | 'Cycling' | 'Nature' | 'Fitness';

interface ActivityState {
	selected: Activity | null;
}

const initialState: ActivityState = {
	selected: null
};

function createActivityStore() {
	const { subscribe, set, update } = writable<ActivityState>(initialState);

	return {
		subscribe,
		set: (activity: Activity | null) => {
			update(state => ({ ...state, selected: activity }));
		},
		reset: () => set(initialState)
	};
}

export const activityStore = createActivityStore();
