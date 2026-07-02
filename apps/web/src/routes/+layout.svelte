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

	<!-- Akonia Codex Attribution -->
	<div class="fixed bottom-4 right-4 z-50">
		<a href="https://akoniacodex.com" target="_blank" rel="noopener" class="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
			<span>powered by</span>
			<span class="font-bold">akonia codex</span>
		</a>
	</div>
</div>
