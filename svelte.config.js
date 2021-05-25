import adapterStatic from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapterStatic(),
		target: '#svelte'
	}
};

export default config;
