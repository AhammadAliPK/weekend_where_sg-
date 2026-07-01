import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Default output directory for Railway
			out: 'build'
		}),
		alias: {
			$lib: 'src/lib',
			$app: 'src/app'
		}
	}
};

export default config;
