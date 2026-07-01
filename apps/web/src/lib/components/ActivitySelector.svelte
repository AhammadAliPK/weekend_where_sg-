<script lang="ts">
	import { Select } from '@weekend-where-sg/ui/select';
	import { activityStore } from '$lib/stores/activityStore';
	import type { Activity } from '$lib/stores/activityStore';

	export let label = 'What are you planning?';
	export let customClass = '';

	const activities: Activity[] = ['Family outing', 'Walking', 'Cycling', 'Nature', 'Fitness'];
	const activityIcon = '🎯'; // Target icon for activities

	let selectedActivity: Activity | null = null;

	// Subscribe to store changes
	activityStore.subscribe((state) => {
		selectedActivity = state.selected;
	});

	function handleActivityChange(event: CustomEvent<{ value: string }>) {
		const activity = event.detail.value as Activity;
		activityStore.set(activity);
	}
</script>

<div class="activity-selector-wrapper" class:extra-class={customClass}>
	<Select
		options={activities}
		bind:value={selectedActivity}
		{label}
		icon={activityIcon}
		on:change={handleActivityChange}
		required={true}
	/>
</div>

<style>
	.activity-selector-wrapper {
		width: 100%;
	}

	.extra-class {
		/* Additional styling if needed */
	}
</style>
