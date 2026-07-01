<script lang="ts">
	// Preference Selector Component
	// Allows users to choose what matters most for their park recommendations
	// Part of Phase 2: Selectors & UI

	import { Select } from '@weekend-where-sg/ui/select';
	import { preferenceStore } from '$lib/stores/preferenceStore';
	import type { Preference } from '$lib/stores/preferenceStore';

	export let label = 'What matters most?';
	export let customClass = '';

	const preferences: Preference[] = ['Balanced', 'Weather-safe', 'Kid-friendly', 'Long walk', 'Cycling-friendly'];
	const preferenceIcon = '⚡'; // Lightning bolt icon for preferences

	let selectedPreference: Preference | null = null;

	// Subscribe to store changes
	preferenceStore.subscribe((state) => {
		selectedPreference = state.selected;
	});

	function handlePreferenceChange(event: CustomEvent<{ value: string }>) {
		const preference = event.detail.value as Preference;
		preferenceStore.set(preference);
	}
</script>

<div class="preference-selector-wrapper" class:extra-class={customClass}>
	<Select
		options={preferences}
		bind:value={selectedPreference}
		{label}
		icon={preferenceIcon}
		on:change={handlePreferenceChange}
		required={true}
	/>
</div>

<style>
	.preference-selector-wrapper {
		width: 100%;
	}

	.select-wrapper {
		width: 100%;
	}

	.select-label {
		display: block;
		font-size: 14px;
		font-weight: 500;
		color: #212121;
		margin-bottom: 4px;
	}

	.required {
		color: #E63946;
		margin-left: 2px;
	}

	.select-input {
		width: 100%;
		padding: 8px 12px;
		font-size: 16px;
		border: 1px solid #BDBDBD;
		border-radius: 4px;
		background-color: white;
		color: #212121;
		transition: border-color 200ms, box-shadow 200ms;
	}

	.select-input:hover {
		border-color: #757575;
	}

	.select-input:focus {
		outline: none;
		border-color: #3C5D4F;
		box-shadow: 0 0 0 2px rgba(60, 93, 79, 0.2);
	}

	.select-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.select-input::-moz-placeholder {
		color: #9E9E9E;
	}

	.select-input::placeholder {
		color: #9E9E9E;
	}

	.select-option {
		color: #212121;
	}
</style>
