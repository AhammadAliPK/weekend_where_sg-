<script lang="ts">
	import '../lib/css/app.css';

	// Root layout component
	// This wraps all pages in the application and imports global styles
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
