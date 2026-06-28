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

	let currentRegion = $regionStore.selected;
	let currentActivity = $activityStore.selected;
	let currentPreference = $preferenceStore.selected;
	let recommendations = $recommendationsStore.items;
	let loading = $recommendationsStore.loading;

	// Subscribe to store changes
	regionStore.subscribe(value => {
		currentRegion = value.selected;
	});

	activityStore.subscribe(value => {
		currentActivity = value.selected;
	});

	preferenceStore.subscribe(value => {
		currentPreference = value.selected;
	});

	recommendationsStore.subscribe(value => {
		recommendations = value.items;
		loading = value.loading;
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

		<!-- UI Components Demo -->
		<section class="component-demo">
			<Card>
				<CardHeader>
					<CardTitle>UI Components Test</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="demo-row">
						<Button variant="primary">Primary Button</Button>
						<Button variant="secondary">Secondary Button</Button>
						<Button variant="accent">Accent Button</Button>
					</div>
					<div class="demo-row">
						<Badge variant="success">Success</Badge>
						<Badge variant="primary">Primary</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="error">Error</Badge>
					</div>
				</CardContent>
			</Card>
		</section>

		{#if loading}
			<div class="loading">
				<p>Finding the best spots for you...</p>
			</div>
		{/if}

		{#if recommendations.length > 0}
			<section class="recommendations">
				<h3>Recommended Parks</h3>
				<!-- Recommendation cards will be displayed here -->
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

	.footer {
		text-align: center;
		padding: 2rem 0;
		color: #999;
		font-size: 0.875rem;
	}

	.component-demo {
		margin-bottom: 2rem;
	}

	.demo-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		align-items: center;
	}
</style>
