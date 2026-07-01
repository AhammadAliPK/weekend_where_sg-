<script lang="ts">
	// Main page component - Enhanced with Singapore context
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

	// Track previous values to prevent duplicate fetches
	let prevRegion: string | null = null;
	let prevActivity: string | null = null;
	let prevPreference: string | null = null;

	// Calculate selection progress
	$: selectionProgress = [currentRegion, currentActivity, currentPreference].filter(Boolean).length;
	$: isSelectionComplete = selectionProgress === 3;

	// Get MRT line color for region
	$: getMRTColor = (region: string) => {
		const colors = {
			'Central': '#DC0000', // North-South Line (Red)
			'East': '#009645', // East-West Line (Green)
			'West': '#009645', // East-West Line (Green)
			'North': '#DC0000', // North-South Line (Red)
			'South': '#009645' // East-West Line (Green)
		};
		return colors[region as keyof typeof colors] || '#6B7280';
	};

	// Trigger API fetch when any selector changes
	function handleSelectorChange() {
		// Only fetch if values have actually changed
		if (currentRegion === prevRegion && currentActivity === prevActivity && currentPreference === prevPreference) {
			return;
		}

		if (currentRegion && currentActivity && currentPreference) {
			prevRegion = currentRegion;
			prevActivity = currentActivity;
			prevPreference = currentPreference;
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
			setTimeout(() => {
				const element = document.getElementById('recommendations-section');
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}, 100);
		}
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
	<!-- Mobile-Optimized Hero Section -->
	<div class="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-green-800 text-white touch-optimized">
		<!-- Decorative Elements -->
		<div class="absolute inset-0 opacity-10">
			<div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
			<div class="absolute top-20 right-20 w-48 h-48 bg-green-300 rounded-full blur-3xl"></div>
			<div class="absolute bottom-10 left-1/4 w-40 h-40 bg-green-200 rounded-full blur-3xl"></div>
		</div>

		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
			<div class="text-center">
				<!-- Logo/Icon - Touch friendly -->
				<div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 sm:mb-6 touch-feedback">
					<span class="text-3xl sm:text-4xl">🌳</span>
				</div>

				<h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 px-4">
					WeekendWhere SG
				</h1>

				<p class="text-lg sm:text-xl lg:text-2xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
					Discover Singapore's Best Parks & Outdoor Activities
				</p>

				<!-- Mobile-First Stats -->
				<div class="flex justify-center gap-4 sm:gap-8 lg:gap-16 text-center">
					<div class="stat-item">
						<div class="text-2xl sm:text-3xl font-bold text-green-200">15+</div>
						<div class="text-xs sm:text-sm text-green-100">Parks</div>
					</div>
					<div class="stat-item">
						<div class="text-2xl sm:text-3xl font-bold text-green-200">5</div>
						<div class="text-xs sm:text-sm text-green-100">Regions</div>
					</div>
					<div class="stat-item">
						<div class="text-2xl sm:text-3xl font-bold text-green-200">5+</div>
						<div class="text-xs sm:text-sm text-green-100">Activities</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Wave decoration -->
		<div class="absolute bottom-0 left-0 right-0">
			<svg class="w-full h-12 sm:h-16 lg:h-24 fill-green-50" viewBox="0 0 1440 120" preserveAspectRatio="none">
				<path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
			</svg>
		</div>
	</div>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Selection Progress -->
		<div class="mb-8">
			<div class="flex items-center justify-between mb-2">
				<h2 class="text-2xl font-semibold text-primary">Plan Your Weekend</h2>
				<span class="text-sm text-neutral">{selectionProgress}/3 selections</span>
			</div>
			<div class="w-full bg-neutral-200 rounded-full h-2">
				<div
					class="bg-primary h-2 rounded-full transition-all duration-500"
					style:width={`${(selectionProgress / 3) * 100}%`}
				></div>
			</div>
		</div>

		<!-- Preference Selectors -->
		<section class="mb-12">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<!-- Region Selector -->
				<div class="relative">
					<Card customClass="h-full hover:shadow-lg transition-shadow duration-300">
						<CardHeader customClass="pb-4">
							<div class="flex items-center gap-3 mb-2">
								<div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
									<span class="text-lg">🗺️</span>
								</div>
								<CardTitle size="md">Where to?</CardTitle>
							</div>
							<p class="text-sm text-neutral">Choose your region</p>
						</CardHeader>
						<CardContent>
							<RegionSelector />
							{#if currentRegion}
								<div class="mt-4 p-3 bg-green-50 rounded-lg border-l-4" style:border-color={getMRTColor(currentRegion)}>
									<div class="flex items-center gap-2">
										<span class="text-sm font-semibold" style:color={getMRTColor(currentRegion)}>{currentRegion}</span>
										<Badge variant="primary" size="sm" customClass="text-xs">Selected</Badge>
									</div>
								</div>
							{/if}
						</CardContent>
					</Card>
				</div>

				<!-- Activity Selector -->
				<div class="relative">
					<Card customClass="h-full hover:shadow-lg transition-shadow duration-300">
						<CardHeader customClass="pb-4">
							<div class="flex items-center gap-3 mb-2">
								<div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
									<span class="text-lg">🎯</span>
								</div>
								<CardTitle size="md">What to do?</CardTitle>
							</div>
							<p class="text-sm text-neutral">Pick your activity</p>
						</CardHeader>
						<CardContent>
							<ActivitySelector />
							{#if currentActivity}
								<div class="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-primary">
									<div class="flex items-center gap-2">
										<span class="text-sm font-semibold text-primary">{currentActivity}</span>
										<Badge variant="primary" size="sm" customClass="text-xs">Selected</Badge>
									</div>
								</div>
							{/if}
						</CardContent>
					</Card>
				</div>

				<!-- Preference Selector -->
				<div class="relative">
					<Card customClass="h-full hover:shadow-lg transition-shadow duration-300">
						<CardHeader customClass="pb-4">
							<div class="flex items-center gap-3 mb-2">
								<div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
									<span class="text-lg">⚡</span>
								</div>
								<CardTitle size="md">How to explore?</CardTitle>
							</div>
							<p class="text-sm text-neutral">Your exploration style</p>
						</CardHeader>
						<CardContent>
							<PreferenceSelector />
							{#if currentPreference}
								<div class="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-primary">
									<div class="flex items-center gap-2">
										<span class="text-sm font-semibold text-primary">{currentPreference}</span>
										<Badge variant="primary" size="sm" customClass="text-xs">Selected</Badge>
									</div>
								</div>
							{/if}
						</CardContent>
					</Card>
				</div>
			</div>

			<!-- Call to Action when selections incomplete -->
			{#if !isSelectionComplete}
				<div class="mt-6 text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-dashed border-green-200">
					<p class="text-lg font-semibold text-primary mb-2">
						{#if selectionProgress === 0}
							👋 Let's start planning! Choose your preferences above.
						{:else if selectionProgress === 1}
							👍 Great start! Choose 2 more preferences.
						{:else if selectionProgress === 2}
							🎯 Almost there! Choose 1 more preference.
						{/if}
					</p>
				</div>
			{/if}
		</section>

		<!-- Loading State -->
		{#if loading}
			<div class="text-center py-16">
				<div class="inline-block">
					<div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
				</div>
				<p class="mt-4 text-lg font-semibold text-primary">Finding the best spots for you...</p>
				<p class="text-sm text-neutral mt-2">Exploring Singapore's garden city 🌿</p>
			</div>
		{/if}

		<!-- Error State -->
		{#if error}
			<div class="p-8 bg-red-50 border-2 border-red-200 rounded-2xl mb-8 text-center">
				<div class="text-4xl mb-4">😔</div>
				<p class="text-lg font-semibold text-red-800 mb-4">Unable to get recommendations</p>
				<Button on:click={handleSelectorChange}>Try Again</Button>
			</div>
		{/if}

		<!-- Recommendations Section -->
		{#if recommendations.length > 0}
			<section class="mt-8" id="recommendations-section">
				<!-- Section Header -->
				<div class="flex items-center justify-between mb-6">
					<div>
						<h3 class="text-2xl font-bold text-primary mb-1">Your Perfect Match 🎉</h3>
						<p class="text-neutral">Found {recommendations.length} park{recommendations.length !== 1 ? 's' : ''} perfect for you</p>
					</div>
					<div class="hidden sm:block">
						<Badge variant="success" size="md">Based on your preferences</Badge>
					</div>
				</div>

				<!-- Top Recommendation Highlight -->
				{#if recommendations[0]}
					<div class="mb-8">
						<div class="relative bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-1">
							<Card customClass="bg-white h-full">
								<CardContent customClass="p-0">
									<div class="grid md:grid-cols-3 gap-0">
										<!-- Score Section -->
										<div class="bg-gradient-to-br from-primary to-primary-dark text-white p-6 md:p-8 flex flex-col items-center justify-center">
											<div class="text-6xl font-bold mb-2">{recommendations[0].score}</div>
											<div class="text-green-200 text-sm uppercase tracking-wide">Score</div>
											<Badge variant="primary" size="md" customClass="mt-4">
												{recommendations[0].verdict}
											</Badge>
										</div>

										<!-- Info Section -->
										<div class="p-6 md:p-8">
											<div class="flex items-start justify-between mb-4">
												<div>
													<h4 class="text-2xl font-bold text-primary mb-1">{recommendations[0].parkName}</h4>
													<div class="flex items-center gap-2">
														<span class="text-xs px-2 py-1 rounded text-white font-medium" style:background-color={getMRTColor(recommendations[0].region)}>{recommendations[0].region}</span>
														<span class="text-sm text-neutral">Singapore</span>
													</div>
												</div>
											</div>

											<p class="text-neutral mb-4 line-clamp-2">{recommendations[0].description}</p>

											<div class="space-y-2">
												{#each recommendations[0].reasons as reason}
													<div class="flex items-center gap-2 text-sm">
														<span class="text-green-500">✓</span>
														<span>{reason}</span>
													</div>
												{/each}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				{/if}

				<!-- Other Recommendations -->
				{#if recommendations.length > 1}
					<div>
						<h4 class="text-lg font-semibold text-primary mb-4">Other Great Options</h4>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{#each recommendations.slice(1) as recommendation}
								<RecommendationCard recommendation={recommendation} />
							{/each}
						</div>
					</div>
				{/if}
			</section>
		{/if}
	</main>

	<!-- Footer -->
	<footer class="bg-primary text-white py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid md:grid-cols-3 gap-8">
				<div>
					<div class="flex items-center gap-2 mb-4">
						<span class="text-2xl">🌳</span>
						<span class="font-bold text-lg">WeekendWhere SG</span>
					</div>
					<p class="text-green-200 text-sm">
						Your guide to Singapore's best parks and outdoor activities. Built with 🌴 for our garden city.
					</p>
				</div>

				<div>
					<h4 class="font-semibold mb-4">Quick Links</h4>
					<ul class="space-y-2 text-sm text-green-200">
						<li>All Parks</li>
						<li>About Us</li>
						<li>Contact</li>
						<li>Privacy Policy</li>
					</ul>
				</div>

				<div>
					<h4 class="font-semibold mb-4">Connect With Us</h4>
					<div class="flex gap-4 text-2xl">
						<span class="cursor-pointer hover:text-green-200">📷</span>
						<span class="cursor-pointer hover:text-green-200">🐦</span>
						<span class="cursor-pointer hover:text-green-200">📘</span>
					</div>
					<p class="text-green-200 text-sm mt-4">Made with ❤️ in Singapore</p>
				</div>
			</div>

			<div class="border-t border-green-600 mt-8 pt-8 text-center text-sm text-green-200">
				<p>&copy; 2026 WeekendWhere SG. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Smooth animations */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Add fade-in animation to sections */
	section {
		animation: fadeIn 0.5s ease-out;
	}

	/* Custom scrollbar for webkit browsers */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	::-webkit-scrollbar-thumb {
		background: #3C5D4F;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #2A4138;
	}

	/* ===== MOBILE-FIRST OPTIMIZATIONS ===== */

	/* Touch-friendly base styles */
	* {
		-webkit-tap-highlight-color: rgba(60, 93, 79, 0.1);
	}

	/* Mobile card grid */
	@media (max-width: 640px) {
		.grid-cols-3 {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		/* Touch-friendly buttons */
		button,
		[role="button"] {
			min-height: 44px;
			min-width: 44px;
			touch-action: manipulation;
		}

		/* Optimize text sizes */
		h1 {
			font-size: 1.5rem !important;
		}

		p {
			font-size: 0.875rem !important;
		}
	}

	/* Touch feedback */
	.touch-feedback:active {
		transform: scale(0.98);
		opacity: 0.8;
	}

	/* Mobile progress display */
	@media (max-width: 640px) {
		.mobile-progress {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 8px 12px;
		}
	}

	/* Safe area support */
	@supports (padding: max(0px)) {
		.touch-optimized {
			padding-left: max(16px, env(safe-area-inset-left));
			padding-right: max(16px, env(safe-area-inset-right));
		}
	}

	/* Touch-friendly interactions */
	@media (max-width: 640px) {
		.recommendation-card,
		.card,
		button,
		[role="button"] {
			touch-action: manipulation;
			min-height: 44px;
		}

		/* Make badges touch-friendly */
		.badge,
		[class*="badge"] {
			min-height: 32px;
			display: inline-flex;
			align-items: center;
		}
	}
</style>
