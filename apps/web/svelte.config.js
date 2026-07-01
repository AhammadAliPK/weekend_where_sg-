import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Railway deployment requires these settings
			out: 'build',
			precompress: false
		}),
		alias: {
			$lib: 'src/lib',
			$app: 'src/app'
		}
	}
};

export default config;
