<script lang="ts">
	// Root layout component
	// This wraps all pages in the application
	import { logConfig } from '$lib/config/env';
	import { onMount } from 'svelte';

	// Log environment configuration on app load
	onMount(() => {
		logConfig();
	});
</script>

<svelte:head>
	<!-- Global CSS will be handled by SvelteKit bundling -->
</svelte:head>

<div class="app-container">
	<slot />
</div>
