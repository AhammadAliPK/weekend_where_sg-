<script lang="ts">
	// Modern WeekendWhere SG - Clean Layout with Proper Icons
	// Using shadcn/ui components instead of emoji icons

	import { regionStore } from '$lib/stores/regionStore';
	import { activityStore } from '$lib/stores/activityStore';
	import { preferenceStore } from '$lib/stores/preferenceStore';
	import { recommendationsStore } from '$lib/stores/recommendationsStore';
	import { Card, CardHeader, CardContent, CardTitle } from '@weekend-where-sg/ui/card';
	import { Button } from '@weekend-where-sg/ui/button';
	import { Badge } from '@weekend-where-sg/ui/badge';
	import { Trees, MapPin, Target, Zap, AlertCircle, Search } from 'lucide-svelte';
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

	let prevRegion: string | null = null;
	let prevActivity: string | null = null;
	let prevPreference: string | null = null;

	$: selectionProgress = [currentRegion, currentActivity, currentPreference].filter(Boolean).length;
	$: isSelectionComplete = selectionProgress === 3;

	$: getMRTColor = (region: string) => {
		const colors = {
			'Central': '#DC0000',
			'East': '#009645',
			'West': '#009645',
			'North': '#DC0000',
			'South': '#009645'
		};
		return colors[region as keyof typeof colors] || '#6B7280';
	};

	function handleSelectorChange() {
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

	$: if (currentRegion && currentActivity && currentPreference) {
		handleSelectorChange();
	}

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

<svelte:head>
	<title>WeekendWhere SG - Discover Singapore's Best Parks</title>
	<meta name="description" content="Find your perfect weekend activity in Singapore's parks and green spaces" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
	<!-- Modern Hero Section -->
	<div class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 text-white">
		<!-- Animated Background Elements -->
		<div class="absolute inset-0">
			<div class="absolute top-20 left-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
			<div class="absolute top-40 right-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style:animation-delay="1s"></div>
			<div class="absolute bottom-20 left-1/3 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style:animation-delay="2s"></div>
		</div>

		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-8">
				<!-- Compact Logo + Title -->
				<div class="flex items-center gap-3 sm:gap-3">
					<div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 backdrop-blur-md rounded-lg shadow-lg border border-white/20 flex items-center justify-center text-emerald-100">
						<Trees size={24} />
					</div>
					<div>
						<h1 class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">WeekendWhere SG</h1>
						<p class="text-xs sm:text-sm text-emerald-100 hidden sm:block">Discover Singapore's Parks</p>
					</div>
				</div>

				<!-- Compact Stats -->
				<div class="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
					<div class="text-center">
						<div class="font-bold text-emerald-200">15+</div>
						<div class="text-emerald-100">Parks</div>
					</div>
					<div class="text-center">
						<div class="font-bold text-emerald-200">5</div>
						<div class="text-emerald-100">Regions</div>
					</div>
					<div class="text-center">
						<div class="font-bold text-emerald-200">5+</div>
						<div class="text-emerald-100">Activities</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Compact Wave -->
		<div class="absolute bottom-0 left-0 right-0">
			<svg class="w-full h-6 sm:h-8 fill-emerald-50" viewBox="0 0 1440 50" preserveAspectRatio="none">
				<path d="M0,25L48,28C96,31,192,37,288,36C384,35,480,31,576,28C672,25,768,23,864,25C960,27,1056,32,1152,35C1248,38,1344,39,1392,40L1440,41L1440,50L1392,50C1344,50,1248,50,1152,50C1056,50,960,50,864,50C768,50,672,50,576,50C480,50,384,50,288,50C192,50,96,50,48,50L0,50Z"></path>
			</svg>
		</div>
	</div>

	<!-- Main Content Area -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
		<!-- Modern Selection Progress -->
		<div class="mb-8 lg:mb-10">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
				<div>
					<h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Plan Your Perfect Weekend</h2>
					<p class="text-lg text-gray-600">Choose your preferences and discover amazing parks</p>
				</div>
				<div class="flex items-center gap-3">
					<span class="text-sm text-gray-600 font-medium bg-gray-100 px-6 py-3 rounded-full text-lg">
						{selectionProgress}/3 selections
					</span>
				</div>
			</div>

			<!-- Modern Progress Bar -->
			<div class="w-full bg-gray-200 rounded-full h-4 shadow-inner">
				<div
					class="bg-gradient-to-r from-emerald-500 to-green-600 h-4 rounded-full transition-all duration-700 shadow-lg"
					style:width={`${(selectionProgress / 3) * 100}%`}
				></div>
			</div>
		</div>

		<!-- Modern Preference Selectors -->
		<section class="mb-20 lg:mb-28">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
				<!-- Region Selector Card -->
				<div class="group">
					<Card customClass="h-full hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-300 transform hover:-translate-y-1">
						<CardHeader customClass="pb-4 space-y-2">
							<div class="flex items-center gap-3">
								<div class="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
									<MapPin size={24} />
								</div>
								<div>
									<CardTitle size="lg" class="text-2xl font-bold">Where to?</CardTitle>
									<p class="text-sm text-gray-500 font-medium mt-1">Choose your region</p>
								</div>
							</div>
						</CardHeader>
						<CardContent customClass="space-y-4">
							<RegionSelector />
							{#if currentRegion}
								<div class="mt-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border-l-4 shadow-sm" style:border-color={getMRTColor(currentRegion)}>
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-3">
											<div class="w-3 h-3 rounded-full" style:background-color={getMRTColor(currentRegion)}></div>
											<span class="text-lg font-bold" style:color={getMRTColor(currentRegion)}>{currentRegion}</span>
										</div>
										<Badge variant="primary" size="md" customClass="shadow-md">Selected</Badge>
									</div>
								</div>
							{/if}
						</CardContent>
					</Card>
				</div>

				<!-- Activity Selector Card -->
				<div class="group">
					<Card customClass="h-full hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-300 transform hover:-translate-y-1">
						<CardHeader customClass="pb-4 space-y-2">
							<div class="flex items-center gap-3">
								<div class="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
									<Target size={24} />
								</div>
								<div>
									<CardTitle size="lg" class="text-2xl font-bold">What to do?</CardTitle>
									<p class="text-sm text-gray-500 font-medium mt-1">Pick your activity</p>
								</div>
							</div>
						</CardHeader>
						<CardContent customClass="space-y-4">
							<ActivitySelector />
							{#if currentActivity}
								<div class="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-emerald-500 shadow-sm">
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-3">
											<div class="w-3 h-3 rounded-full bg-emerald-500"></div>
											<span class="text-lg font-bold text-emerald-700">{currentActivity}</span>
										</div>
										<Badge variant="primary" size="md" customClass="shadow-md">Selected</Badge>
									</div>
								</div>
							{/if}
						</CardContent>
					</Card>
				</div>

				<!-- Preference Selector Card -->
				<div class="group">
					<Card customClass="h-full hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-300 transform hover:-translate-y-1">
						<CardHeader customClass="pb-4 space-y-2">
							<div class="flex items-center gap-3">
								<div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
									<Zap size={24} />
								</div>
								<div>
									<CardTitle size="lg" class="text-2xl font-bold">Your style?</CardTitle>
									<p class="text-sm text-gray-500 font-medium mt-1">Set your preference</p>
								</div>
							</div>
						</CardHeader>
						<CardContent customClass="space-y-4">
							<PreferenceSelector />
							{#if currentPreference}
								<div class="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500 shadow-sm">
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-3">
											<div class="w-3 h-3 rounded-full bg-blue-500"></div>
											<span class="text-lg font-bold text-blue-700">{currentPreference}</span>
										</div>
										<Badge variant="primary" size="md" customClass="shadow-md">Selected</Badge>
									</div>
								</div>
							{/if}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>

		<!-- Loading State -->
		{#if loading}
			<div class="text-center py-20">
				<div class="inline-flex items-center justify-center w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
				<p class="mt-8 text-xl text-gray-600 font-medium">Finding your perfect parks...</p>
			</div>
		{/if}

		<!-- Error State -->
		{#if error}
			<div class="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center">
				<AlertCircle size={48} class="text-red-500 mb-4" />
				<h3 class="text-2xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
				<p class="text-red-600">{error}</p>
			</div>
		{/if}

		<!-- Recommendations Section -->
		{#if recommendations.length > 0}
			<section id="recommendations-section" class="scroll-mt-20">
				<div class="mb-12">
					<h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Your Perfect Parks</h2>
					<p class="text-xl text-gray-600">Based on your preferences, here are {recommendations.length} amazing parks for you</p>
				</div>

				<!-- Modern Recommendation Grid -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
					{#each recommendations as recommendation, index}
						<div class="transform hover:scale-[1.02] transition-transform duration-300">
							<RecommendationCard {recommendation} rank={index + 1} />
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Empty State -->
		{#if !loading && !error && recommendations.length === 0 && isSelectionComplete}
			<div class="text-center py-20">
				<Trees size={48} class="text-emerald-600 mb-6" />
				<h3 class="text-2xl font-bold text-gray-900 mb-2">Make your selections</h3>
				<p class="text-xl text-gray-600">Choose your preferences above to get personalized park recommendations</p>
			</div>
		{/if}
	</main>

	<!-- Modern Footer -->
	<footer class="bg-gray-900 text-white py-16 mt-20">
		<div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
			<div class="text-center space-y-4">
				<div class="flex justify-center items-center gap-3">
					<Trees size={24} />
					<span class="text-xl font-bold">WeekendWhere SG</span>
				</div>
				<p class="text-gray-400 text-lg">Discover Singapore's green spaces</p>
				<p class="text-gray-500 text-sm">© 2024 WeekendWhere SG. Made with ❤️ in Singapore</p>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Custom animations for modern feel */
	@keyframes pulse {
		0%, 100% { opacity: 0.2; transform: scale(1); }
		50% { opacity: 0.3; transform: scale(1.05); }
	}

	.animate-pulse {
		animation: pulse 4s ease-in-out infinite;
	}

	/* Modern focus states */
	*:focus-visible {
		outline: 2px solid #10b981;
		outline-offset: 2px;
	}
</style>