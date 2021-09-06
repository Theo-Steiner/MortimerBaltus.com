import adapterStatic from '@sveltejs/adapter-static';
import precompileIntl from 'svelte-intl-precompile/sveltekit-plugin.js';

const config = {
	kit: {
		adapter: adapterStatic(),
		target: '#svelte',
		vite: {
			plugins: [precompileIntl('locales')]
		}
	}
};

export default config;
