import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5173,
		host: true
	},
	// Disable problematic features for Railway
	css: {
		devSourcemap: false
	},
	// Conservative dependency optimization for Railway
	optimizeDeps: {
		disable: false,
		include: [],
		force: false
	},
	// Railway-safe build configuration
	build: {
		target: 'es2015', // Lower target for better compatibility
		minify: false, // Disable minification to prevent esbuild crashes
		sourcemap: false,
		rollupOptions: {
			onwarn: (warning, handler) => {
				// Ignore all warnings to prevent build failures
				return;
			}
		}
	},
	// Disable esbuild optimizations that cause crashes
	esbuild: {
		target: 'es2015',
		jsx: 'preserve'
	}
});
