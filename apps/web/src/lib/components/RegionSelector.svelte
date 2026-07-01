<script lang="ts">
	import { Select } from '@weekend-where-sg/ui/select';
	import { regionStore } from '$lib/stores/regionStore';
	import type { Region } from '$lib/stores/regionStore';

	export let label = 'Where in Singapore?';
	export let customClass = '';

	const regions: Region[] = ['Central', 'East', 'West', 'North', 'South'];
	const regionIcon = '📍'; // Location pin icon for regions

	let selectedRegion: Region | null = null;

	// Subscribe to store changes
	regionStore.subscribe((state) => {
		selectedRegion = state.selected;
	});

	function handleRegionChange(event: CustomEvent<{ value: string }>) {
		const region = event.detail.value as Region;
		regionStore.set(region);
	}
</script>

<div class="region-selector-wrapper" class:extra-class={customClass}>
	<Select
		options={regions}
		bind:value={selectedRegion}
		{label}
		icon={regionIcon}
		on:change={handleRegionChange}
		required={true}
	/>
</div>

<style>
	.region-selector-wrapper {
		width: 100%;
	}

	.extra-class {
		/* Additional styling if needed */
	}
</style>
