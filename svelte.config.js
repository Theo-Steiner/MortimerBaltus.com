import adapterStatic from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapterStatic(),
		target: '#svelte',
		prerender: { pages: ['*', '/404'] }
	}
};

export default config;
