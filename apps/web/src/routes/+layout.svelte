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

<svelte:head>
	<!-- Additional head elements if needed -->
</svelte:head>

<div class="app-container">
	<slot />
</div>
