import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5173,
		host: true
	},
	// Optimize CSS processing for Railway deployment
	css: {
		devSourcemap: true
	},
	// Ensure proper parsing of Svelte files
	optimizeDeps: {
		include: ['@sveltejs/kit']
	}
});
