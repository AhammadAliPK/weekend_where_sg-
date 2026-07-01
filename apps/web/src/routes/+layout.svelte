<script lang="ts">
	// Root layout component
	// This wraps all pages in the application
	import '../lib/css/app.css';
	import { logConfig } from '$lib/config/env';
	import { onMount } from 'svelte';

	// Log environment configuration on app load
	onMount(() => {
		logConfig();
	});
</script>

<div class="app-container">
	<slot />
</div>

<style>
	.app-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}
</style>
