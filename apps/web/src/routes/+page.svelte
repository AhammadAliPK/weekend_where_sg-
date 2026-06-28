<script lang="ts">
	// Main page component
	// This is the entry point for the WeekendWhere SG application

	import { regionStore } from '$lib/stores/regionStore';
	import { activityStore } from '$lib/stores/activityStore';
	import { preferenceStore } from '$lib/stores/preferenceStore';
	import { recommendationsStore } from '$lib/stores/recommendationsStore';
	import { Card, CardHeader, CardContent, CardTitle } from '@weekend-where-sg/ui/card';
	import { Button } from '@weekend-where-sg/ui/button';
	import { Badge } from '@weekend-where-sg/ui/badge';
	import RegionSelector from '$lib/components/RegionSelector.svelte';
	import ActivitySelector from '$lib/components/ActivitySelector.svelte';
	import PreferenceSelector from '$lib/components/PreferenceSelector.svelte';
	import RecommendationCard from '$lib/components/RecommendationCard.svelte';

	$: currentRegion = $regionStore.selected;
	$: currentActivity = $activityStore.selected;
	$: currentPreference = $preferenceStore.selected;
	$: recommendations = $recommendationsStore.items;
	$: loading = $recommendationsStore.loading;
	$: error = $recommendationsStore.error;

	// Trigger API fetch when any selector changes
	function handleSelectorChange() {
		if (currentRegion && currentActivity && currentPreference) {
			// Debounce is handled by the recommendationsStore
			recommendationsStore.triggerFetch();
		}
	}

	// Reactive trigger when selectors change
	$: if (currentRegion && currentActivity && currentPreference) {
		handleSelectorChange();
	}

	// Scroll to recommendations when they update
	recommendationsStore.subscribe((state) => {
		if (state.items.length > 0 && !state.loading) {
			// Scroll to recommendations section smoothly
			setTimeout(() => {
				const element = document.getElementById('recommendations-section');
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}, 100);
		}
	});
</script>

<div class="max-w-4xl mx-auto p-4">
	<header class="text-center py-8">
		<h1 class="text-3xl font-bold text-primary mb-2">WeekendWhere SG</h1>
		<p class="text-neutral">Discover Singapore's best parks and outdoor activities</p>
	</header>

	<main class="py-8">
		<section class="text-center p-8 bg-neutral-50 rounded-card mb-8">
			<h2 class="text-2xl font-semibold text-primary mb-2">Welcome to WeekendWhere SG</h2>
			<p class="text-base text-neutral">Select your preferences to get personalized park recommendations</p>
		</section>

		<!-- Preference Selectors -->
		<section class="mb-8">
			<Card>
				<CardHeader>
					<CardTitle>Choose Your Preferences</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						<div class="min-w-0">
							<RegionSelector />
						</div>
						<div class="min-w-0">
							<ActivitySelector />
						</div>
						<div class="min-w-0">
							<PreferenceSelector />
						</div>
					</div>

					{#if currentRegion || currentActivity || currentPreference}
						<div class="p-4 bg-blue-50 rounded-card border-2 border-primary">
							{#if currentRegion}
								<p class="mb-1 text-base"><strong class="text-primary">Selected Region:</strong> {currentRegion}</p>
							{/if}
							{#if currentActivity}
								<p class="mb-1 text-base"><strong class="text-primary">Selected Activity:</strong> {currentActivity}</p>
							{/if}
							{#if currentPreference}
								<p class="mb-1 text-base"><strong class="text-primary">Selected Preference:</strong> {currentPreference}</p>
							{/if}
						</div>
					{/if}
				</CardContent>
			</Card>
		</section>

		{#if loading}
			<div class="text-center p-8 text-neutral">
				<p>Finding the best spots for you...</p>
			</div>
		{/if}

		{#if error}
			<div class="p-8 bg-yellow-100 border-2 border-yellow-500 rounded-card mb-8 text-center">
				<p class="text-yellow-800 mb-4">⚠️ {error}</p>
				<Button on:click={handleSelectorChange}>Retry</Button>
			</div>
		{/if}

		{#if recommendations.length > 0}
			<section class="mt-8" id="recommendations-section">
				<h3 class="text-xl font-semibold text-primary mb-4">Recommended Parks</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each recommendations as recommendation}
						<RecommendationCard recommendation={recommendation} />
					{/each}
				</div>
			</section>
		{/if}
	</main>

	<footer class="text-center py-8 text-neutral text-sm">
		<p>&copy; 2026 WeekendWhere SG. Built for Singapore's outdoor enthusiasts.</p>
	</footer>
</div>
