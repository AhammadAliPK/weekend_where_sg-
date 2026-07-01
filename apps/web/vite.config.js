import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5173,
		host: true
	},
	// Optimize for Railway deployment
	css: {
		devSourcemap: true
	},
	// Railway-specific optimizations
	optimizeDeps: {
		include: ['@sveltejs/kit'],
		force: false
	},
	// Build optimizations for Railway
	build: {
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: false,
		rollupOptions: {
			onwarn: (warning, handler) => {
				// Ignore specific warnings that don't affect functionality
				if (warning.code === 'THIS_IS_UNDEFINED') return;
				handler(warning);
			}
		}
	}
});
