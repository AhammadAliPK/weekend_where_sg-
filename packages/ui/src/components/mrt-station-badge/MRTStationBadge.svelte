<script lang="ts">
	import Badge from '../badge/Badge.svelte';
	import type { MRTStation } from '@weekend-where-sg/types';

	export let stations: MRTStation[];
	export let showWalkingTime = true;
	export let customClass = '';

	// Singapore MRT line colors
	const mrtLineColors: Record<string, { color: string; name: string }> = {
		'EW': { color: '#009645', name: 'East-West Line' }, // Green
		'NS': { color: '#DC0000', name: 'North-South Line' }, // Red
		'CC': { color: '#FF9800', name: 'Circle Line' }, // Orange
		'DT': { color: '#0077C0', name: 'Downtown Line' }, // Blue
		'NE': { color: '#8D26C1', name: 'North-East Line' }, // Purple
		'CE': { color: '#FF9800', name: 'Circle Extension' }, // Orange
		'CG': { color: '#009645', name: 'Changi Airport Branch' }, // Green
		'PTC': { color: '#6C5CE7', name: 'Punggol LRT' }, // Purple
		'STC': { color: '#00A6A6', name: 'Sengkang LRT' } // Teal
	};

	function getLineInfo(lineCode: string) {
		return mrtLineColors[lineCode] || { color: '#6B7280', name: 'MRT' };
	}

	function formatWalkingTime(minutes: number): string {
		if (minutes < 5) return '5 min';
		if (minutes < 10) return '5-10 min';
		return `${minutes} min`;
	}
</script>

<div class="mrt-stations-wrapper {customClass}">
	{#if stations && stations.length > 0}
		<div class="mrt-stations-container">
			<div class="mrt-header">
				<span class="mrt-icon">🚇</span>
				<span class="mrt-label">Nearest MRT Stations</span>
			</div>
			<div class="stations-list">
				{#each stations.slice(0, 3) as station}
					<div class="station-item">
						<div
							class="station-badge"
							style:background-color={getLineInfo(station.lineCode).color}
						>
							<span class="station-code">{station.lineCode}</span>
							<span class="station-name">{station.name}</span>
						</div>
						{#if showWalkingTime}
							<span class="walking-time">
								{formatWalkingTime(station.walkingTimeMinutes)} walk
							</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.mrt-stations-wrapper {
		width: 100%;
	}

	.mrt-stations-container {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.mrt-header {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 4px;
	}

	.mrt-icon {
		font-size: 14px;
	}

	.mrt-label {
		font-size: 12px;
		font-weight: 600;
		color: #6B7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stations-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.station-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.station-badge {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		border-radius: 6px;
		color: white;
		font-size: 11px;
		font-weight: 600;
		white-space: nowrap;
	}

	.station-code {
		background-color: rgba(255, 255, 255, 0.3);
		padding: 2px 4px;
		border-radius: 3px;
		font-size: 10px;
		font-weight: 700;
	}

	.station-name {
		flex: 1;
	}

	.walking-time {
		font-size: 11px;
		color: #6B7280;
		font-weight: 500;
		white-space: nowrap;
	}

	/* Mobile responsive */
	@media (max-width: 640px) {
		.station-item {
			flex-wrap: wrap;
		}

		.walking-time {
			font-size: 10px;
		}
	}
</style>
