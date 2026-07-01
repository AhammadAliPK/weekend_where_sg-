<script lang="ts">
	// Enhanced Recommendation Card Component with Singapore Context
	// Displays individual park recommendations with garden city theming

	import { Card, CardContent } from '@weekend-where-sg/ui/card';
	import { Badge } from '@weekend-where-sg/ui/badge';
	import { MRTStationBadge } from '@weekend-where-sg/ui/mrt-station-badge';
	import type { Recommendation } from '../../stores/recommendationsStore';

	export let recommendation: Recommendation;

	// Get MRT line color for region
	function getMRTColor(region: string): string {
		const colors = {
			'Central': '#DC0000', // North-South Line (Red)
			'East': '#009645', // East-West Line (Green)
			'West': '#009645', // East-West Line (Green)
			'North': '#DC0000', // North-South Line (Red)
			'South': '#009645' // East-West Line (Green)
		};
		return colors[region as keyof typeof colors] || '#6B7280';
	}

	// Get MRT line name for region
	function getMRTLine(region: string): string {
		const lines = {
			'Central': 'North-South Line',
			'East': 'East-West Line',
			'West': 'East-West Line',
			'North': 'North-South Line',
			'South': 'East-West Line'
		};
		return lines[region as keyof typeof lines] || 'Singapore';
	}

	// Get verdict color based on score
	function getVerdictInfo(score: number) {
		if (score >= 9) {
			return {
				bg: 'bg-green-100',
				text: 'text-green-800',
				border: 'border-green-500',
				gradient: 'from-green-500 to-green-600',
				label: 'Perfect Match',
				icon: '🌟'
			};
		}
		if (score >= 7) {
			return {
				bg: 'bg-primary',
				text: 'text-white',
				border: 'border-primary',
				gradient: 'from-primary to-primary-dark',
				label: 'Great Choice',
				icon: '👍'
			};
		}
		if (score >= 5) {
			return {
				bg: 'bg-yellow-100',
				text: 'text-yellow-800',
				border: 'border-yellow-500',
				gradient: 'from-yellow-500 to-yellow-600',
				label: 'Good Option',
				icon: '👌'
			};
		}
		return {
			bg: 'bg-gray-100',
			text: 'text-gray-800',
			border: 'border-gray-500',
			gradient: 'from-gray-500 to-gray-600',
			label: 'Consider',
			icon: '🤔'
		};
	}

	const verdictInfo = getVerdictInfo(recommendation.score);
	const mrtColor = getMRTColor(recommendation.region);
	const mrtLine = getMRTLine(recommendation.region);
</script>

<div class="recommendation-card">
	<Card customClass="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
		<CardContent customClass="p-0">
			<!-- Score Badge (Top Right) -->
			<div class="absolute top-4 right-4 z-10">
				<div class="flex flex-col items-end">
					<div class="bg-gradient-to-br {verdictInfo.gradient} text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
						<span class="text-2xl font-bold">{recommendation.score}</span>
					</div>
					<Badge overrideVariant={true} customClass="mt-2 {verdictInfo.bg} {verdictInfo.text} text-xs font-semibold">
						{verdictInfo.icon} {verdictInfo.label}
					</Badge>
				</div>
			</div>

			<!-- Card Content -->
			<div class="p-6">
				<!-- Region Badge with MRT Color -->
				<div class="mb-4">
					<span class="text-xs font-semibold px-3 py-1 rounded" style:background-color={mrtColor} style:color="white">
						🚇 {mrtLine}
					</span>
				</div>

				<!-- Park Name -->
				<h3 class="text-xl font-bold text-primary mb-2 pr-20">
					{recommendation.parkName}
				</h3>

				<!-- Region -->
				<div class="flex items-center gap-2 mb-4">
					<span class="text-2xl">📍</span>
					<span class="text-sm text-neutral">{recommendation.region} Region</span>
				</div>

				<!-- Description -->
				<p class="text-sm text-neutral mb-4 line-clamp-2">
					{recommendation.description}
				</p>

				<!-- MRT Stations -->
				{#if recommendation.mrtStations && recommendation.mrtStations.length > 0}
					<div class="mb-4">
						<MRTStationBadge stations={recommendation.mrtStations} />
					</div>
				{/if}

				<!-- Reasons -->
				{#if recommendation.reasons && recommendation.reasons.length > 0}
					<div class="space-y-2 pt-4 border-t border-neutral-200">
						<h4 class="text-sm font-semibold text-primary mb-2">
							Why you'll love it:
						</h4>
						{#each recommendation.reasons.slice(0, 3) as reason}
							<div class="flex items-start gap-2">
								<span class="text-green-500 mt-0.5">✓</span>
								<span class="text-sm text-neutral">{reason}</span>
							</div>
						{/each}
					</div>
				{/if}

				<!-- Activity Fit -->
				<div class="mt-4 pt-4 border-t border-neutral-200">
					<div class="flex items-center justify-between">
						<span class="text-xs text-neutral">Activity Fit:</span>
						<span class="text-sm font-semibold text-primary">{recommendation.activityFit}</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</div>

<style>
	.recommendation-card {
		position: relative;
		transition: transform 300ms ease, box-shadow 300ms ease;
		touch-action: manipulation;
		-webkit-tap-highlight-color: rgba(60, 93, 79, 0.1);
		border-radius: 16px;
	}

	.recommendation-card:hover {
		transform: translateY(-4px);
	}

	.recommendation-card:active {
		transform: scale(0.98);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Touch-friendly interactions */
	.recommendation-card button,
	.recommendation-card [role="button"] {
		min-height: 44px;
		min-width: 44px;
		touch-action: manipulation;
	}

	/* Mobile responsive */
	@media (max-width: 640px) {
		.recommendation-card {
			margin-bottom: 12px;
			padding: 12px;
		}

		.recommendation-card :global(.absolute) {
			position: static;
		}

		.recommendation-card :global(.flex-col) {
			flex-direction: row;
			align-items: center;
			gap: 8px;
			margin-bottom: 12px;
		}

		/* Stack score and content on mobile */
		.recommendation-card :global(.p-6) {
			padding: 12px;
		}

		/* Optimize badge sizes */
		.recommendation-card :global(.text-2xl) {
			font-size: 1.25rem;
		}

		.recommendation-card :global(.text-xl) {
			font-size: 1.125rem;
		}
	}

	/* Landscape mobile */
	@media (max-width: 640px) and (orientation: landscape) {
		.recommendation-card {
			margin-bottom: 8px;
		}
	}
</style>
