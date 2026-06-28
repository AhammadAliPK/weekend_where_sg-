<script lang="ts">
	// Recommendation Card Component
	// Displays individual park recommendations with visual hierarchy
	// Part of Phase 2: Selectors & UI

	import { Card, CardContent } from '@weekend-where-sg/ui/card';
	import { Badge } from '@weekend-where-sg/ui/badge';
	import type { Recommendation } from '@weekend-where-sg/types';

	export let recommendation: Recommendation;

	// Get verdict color based on score
	function getVerdictColor(score: number): string {
		if (score >= 9) return 'success';
		if (score >= 7) return 'primary';
		if (score >= 5) return 'warning';
		return 'error';
	}

	// Get verdict text based on score
	function getVerdictText(score: number): string {
		if (score >= 9) return 'Excellent Choice';
		if (score >= 7) return 'Great Match';
		if (score >= 5) return 'Good Option';
		return 'Consider';
	}

	const verdictColor = getVerdictColor(recommendation.score);
	const verdictText = getVerdictText(recommendation.score);

	// Custom colors for badges that need specific Singapore colors
	const verdictBadgeColor = verdictColor === 'primary' ? '#3C5D4F' :
		verdictColor === 'warning' ? '#FF9800' :
		verdictColor === 'error' ? '#F44336' : '#4CAF50';
</script>

<div class="recommendation-card">
	<Card>
		<CardContent class="card-content">
			<!-- Verdict Badge - Highest visual hierarchy -->
			<div class="verdict-section">
				{#if verdictColor === 'success'}
					<Badge variant="success" class="verdict-badge">{verdictText}</Badge>
				{:else if verdictColor === 'primary'}
					<div class="custom-verdict-badge" style:background-color={verdictBadgeColor}>{verdictText}</div>
				{:else if verdictColor === 'warning'}
					<Badge variant="warning" class="verdict-badge">{verdictText}</Badge>
				{:else}
					<Badge variant="error" class="verdict-badge">{verdictText}</Badge>
				{/if}
			</div>

			<!-- Score - Large numeric display -->
			<div class="score-section">
				<span class="score-value">{recommendation.score}</span>
				<span class="score-label">out of 10</span>
			</div>

			<!-- Park Name - Medium weight, prominent -->
			<h3 class="park-name">{recommendation.park.name}</h3>

			<!-- Region Badge - Location context -->
			<div class="region-section">
				<div class="custom-region-badge" style:background-color="#D4A574">
					{recommendation.park.region}
				</div>
			</div>

			<!-- Reasons - Bullet list with secondary prominence -->
			{#if recommendation.reasons && recommendation.reasons.length > 0}
				<div class="reasons-section">
					<h4 class="reasons-title">Why this park:</h4>
					<ul class="reasons-list">
						{#each recommendation.reasons as reason}
							<li class="reason-item">{reason}</li>
						{/each}
					</ul>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>

<style>
	.recommendation-card {
		transition: box-shadow 300ms ease;
	}

	.recommendation-card:hover {
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}

	.card-content {
		padding: 16px;
	}

	.verdict-section {
		margin-bottom: 12px;
	}

	.verdict-badge {
		font-size: 14px;
		font-weight: 600;
		padding: 4px 12px;
		border-radius: 12px;
	}

	.custom-verdict-badge {
		font-size: 14px;
		font-weight: 600;
		padding: 4px 12px;
		border-radius: 12px;
		color: white;
		display: inline-block;
	}

	.custom-region-badge {
		font-size: 14px;
		font-weight: 500;
		padding: 4px 12px;
		border-radius: 12px;
		color: white;
		display: inline-block;
	}

	.score-section {
		display: flex;
		align-items: baseline;
		gap: 4px;
		margin-bottom: 8px;
	}

	.score-value {
		font-size: 28px;
		font-weight: 700;
		color: #3C5D4F;
		line-height: 1;
	}

	.score-label {
		font-size: 14px;
		color: #666;
		font-weight: 400;
	}

	.park-name {
		font-size: 18px;
		font-weight: 500;
		color: #212121;
		margin: 0 0 8px 0;
		line-height: 1.3;
	}

	.region-section {
		margin-bottom: 12px;
	}

	.reasons-section {
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid #E0E0E0;
	}

	.reasons-title {
		font-size: 14px;
		font-weight: 600;
		color: #424242;
		margin: 0 0 8px 0;
	}

	.reasons-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.reason-item {
		font-size: 14px;
		color: #666;
		padding-left: 16px;
		margin-bottom: 4px;
		position: relative;
		line-height: 1.4;
	}

	.reason-item:before {
		content: '•';
		position: absolute;
		left: 0;
		color: #9E9E9E;
		font-weight: bold;
	}

	.reason-item:last-child {
		margin-bottom: 0;
	}

	/* Mobile responsive */
	@media (max-width: 640px) {
		.card-content {
			padding: 12px;
		}

		.score-value {
			font-size: 24px;
		}

		.park-name {
			font-size: 16px;
		}

		.reason-item {
			font-size: 13px;
		}
	}
</style>
