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

	// Trigger API calls when all three selectors have values
	$: {
		if (currentRegion && currentActivity && currentPreference) {
			// Debounce the API call to avoid excessive requests
			const timeout = setTimeout(() => {
				recommendationsStore.triggerFetch();
			}, 300);

			return () => clearTimeout(timeout);
		}
	}

	// Trigger API fetch when any selector changes
	function handleSelectorChange() {
		if (currentRegion && currentActivity && currentPreference) {
			recommendationsStore.triggerFetch();
		}
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

<div class="container">
	<header class="header">
		<h1>WeekendWhere SG</h1>
		<p>Discover Singapore's best parks and outdoor activities</p>
	</header>

	<main class="main-content">
		<section class="welcome-section">
			<h2>Welcome to WeekendWhere SG</h2>
			<p>Select your preferences to get personalized park recommendations</p>
		</section>

		<!-- Preference Selectors -->
		<section class="selectors-section">
			<Card>
				<CardHeader>
					<CardTitle>Choose Your Preferences</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="selectors-grid">
						<div class="selector-item">
							<RegionSelector />
						</div>
						<div class="selector-item">
							<ActivitySelector />
						</div>
						<div class="selector-item">
							<PreferenceSelector />
						</div>
					</div>

					{#if currentRegion || currentActivity || currentPreference}
						<div class="current-selection">
							{#if currentRegion}
								<p><strong>Selected Region:</strong> {currentRegion}</p>
							{/if}
							{#if currentActivity}
								<p><strong>Selected Activity:</strong> {currentActivity}</p>
							{/if}
							{#if currentPreference}
								<p><strong>Selected Preference:</strong> {currentPreference}</p>
							{/if}
						</div>
					{/if}
				</CardContent>
			</Card>
		</section>

		{#if loading}
			<div class="loading">
				<p>Finding the best spots for you...</p>
			</div>
		{/if}

		{#if error}
			<div class="error">
				<p>⚠️ {error}</p>
				<button on:click={handleSelectorChange} class="retry-button">Retry</button>
			</div>
		{/if}

		{#if recommendations.length > 0}
			<section class="recommendations" id="recommendations-section">
				<h3 class="recommendations-title">Recommended Parks</h3>
				<div class="recommendations-grid">
					{#each recommendations as recommendation}
						<RecommendationCard recommendation={recommendation} />
					{/each}
				</div>
			</section>
		{/if}
	</main>

	<footer class="footer">
		<p>&copy; 2026 WeekendWhere SG. Built for Singapore's outdoor enthusiasts.</p>
	</footer>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	.header {
		text-align: center;
		padding: 2rem 0;
	}

	.header h1 {
		color: #3C5D4F;
		margin: 0 0 0.5rem 0;
	}

	.header p {
		color: #666;
		margin: 0;
	}

	.main-content {
		padding: 2rem 0;
	}

	.welcome-section {
		text-align: center;
		padding: 2rem;
		background: #f5f5f5;
		border-radius: 8px;
		margin-bottom: 2rem;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	.error {
		padding: 2rem;
		background: #fff3cd;
		border: 1px solid #ffc107;
		border-radius: 8px;
		margin-bottom: 2rem;
		text-align: center;
	}

	.error p {
		color: #856404;
		margin-bottom: 1rem;
	}

	.retry-button {
		padding: 8px 16px;
		background: #3C5D4F;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
	}

	.retry-button:hover {
		background: #2a4539;
	}

	.footer {
		text-align: center;
		padding: 2rem 0;
		color: #999;
		font-size: 0.875rem;
	}

	.component-demo {
		margin-bottom: 2rem;
	}

	.selectors-section {
		margin-bottom: 2rem;
	}

	.selectors-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.selector-item {
		min-width: 0;
	}

	.current-selection {
		padding: 1rem;
		background: #f0f8ff;
		border-radius: 8px;
		border: 1px solid #3C5D4F;
	}

	.current-selection p {
		margin: 0;
		color: #212121;
		font-size: 16px;
	}

	.demo-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		align-items: center;
	}

	.recommendations {
		margin-top: 2rem;
	}

	.recommendations-title {
		font-size: 20px;
		font-weight: 600;
		color: #3C5D4F;
		margin-bottom: 1rem;
	}

	.recommendations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	/* Mobile responsive */
	@media (max-width: 640px) {
		.recommendations-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
