import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from './hooks.js';

const template = ({ head, body }) =>
	'<!DOCTYPE html />\n<html lang="en">\n\n<head>\n\t<meta charset="utf-8" />\n\t<link rel="icon" href="/Favicon.ico" />\n\t<meta name="viewport"\n\t\tcontent="width=device-width, height=device-height, initial-scale=0.86, minimum-scale=0.86, maximum-scale=5.0"\n\t\tid="viewportmetatag" />\n\t<link rel="preload" href="/fonts/MabryPro-Regular.woff2" as="font" type="font/woff2" crossorigin />\n\t<style>\n\t\t* {\n\t\t\tpadding: 0;\n\t\t\tmargin: 0;\n\t\t\tfont-family: \'MabryPro\';\n\t\t\tfont-weight: 400;\n\t\t}\n\n\t\tbody {\n\t\t\tbackground-color: #151515;\n\t\t}\n\n\t\t@font-face {\n\t\t\tfont-family: \'MabryPro\';\n\t\t\tsrc: url(\'/fonts/MabryPro-Regular.woff2\') format(\'woff\');\n\t\t\tfont-display: block;\n\t\t}\n\t</style>\n\t' +
	head +
	'\n</head>\n\n<body id="svelte">\n\t' +
	body +
	'\n</body>\n\n</html>';

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: '/./_app/start-72ff6937.js',
			css: ['/./_app/assets/start-a8cd1609.css'],
			js: ['/./_app/start-72ff6937.js', '/./_app/chunks/vendor-783391f4.js']
		},
		fetched: undefined,
		floc: false,
		get_component_path: (id) => '/./_app/' + entry_lookup[id],
		get_stack: (error) => String(error), // for security
		handle_error: (error) => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: '#svelte',
		template,
		trailing_slash: 'never'
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [
		{ file: 'Favicon.ico', size: 93062, type: 'image/vnd.microsoft.icon' },
		{ file: 'Images/Logopedia.svg', size: 330015, type: 'image/svg+xml' },
		{ file: 'Images/moritzmemoji.jpg', size: 5142, type: 'image/jpeg' },
		{ file: 'Images/theomemoji.png', size: 11308, type: 'image/png' },
		{ file: 'fonts/MabryPro-Regular.woff2', size: 52000, type: 'font/woff2' },
		{ file: 'robots.txt', size: 67, type: 'text/plain' }
	],
	layout: 'src/routes/__layout.svelte',
	error: '.svelte-kit/build/components/error.svelte',
	routes: [
		{
			type: 'page',
			pattern: /^\/$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/index.svelte'],
			b: ['.svelte-kit/build/components/error.svelte']
		},
		{
			type: 'page',
			pattern: /^\/pages\/privacy\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/pages/__layout.svelte',
				'src/routes/pages/privacy.svelte'
			],
			b: ['.svelte-kit/build/components/error.svelte']
		},
		{
			type: 'page',
			pattern: /^\/pages\/about\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/pages/__layout.svelte',
				'src/routes/pages/about.svelte'
			],
			b: ['.svelte-kit/build/components/error.svelte']
		},
		{
			type: 'page',
			pattern: /^\/pages\/legal\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/pages/__layout.svelte',
				'src/routes/pages/legal.svelte'
			],
			b: ['.svelte-kit/build/components/error.svelte']
		}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = (hooks) => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	'src/routes/__layout.svelte': () => import('../../src/routes/__layout.svelte'),
	'.svelte-kit/build/components/error.svelte': () => import('./components/error.svelte'),
	'src/routes/index.svelte': () => import('../../src/routes/index.svelte'),
	'src/routes/pages/__layout.svelte': () => import('../../src/routes/pages/__layout.svelte'),
	'src/routes/pages/privacy.svelte': () => import('../../src/routes/pages/privacy.svelte'),
	'src/routes/pages/about.svelte': () => import('../../src/routes/pages/about.svelte'),
	'src/routes/pages/legal.svelte': () => import('../../src/routes/pages/legal.svelte')
};

const metadata_lookup = {
	'src/routes/__layout.svelte': {
		entry: '/./_app/pages/__layout.svelte-3e30925b.js',
		css: ['/./_app/assets/app-be9576c1.css'],
		js: ['/./_app/pages/__layout.svelte-3e30925b.js', '/./_app/chunks/vendor-783391f4.js'],
		styles: null
	},
	'.svelte-kit/build/components/error.svelte': {
		entry: '/./_app/error.svelte-325339d2.js',
		css: [],
		js: ['/./_app/error.svelte-325339d2.js', '/./_app/chunks/vendor-783391f4.js'],
		styles: null
	},
	'src/routes/index.svelte': {
		entry: '/./_app/pages/index.svelte-d5e70978.js',
		css: [
			'/./_app/assets/pages/index.svelte-2b40e9d6.css',
			'/./_app/assets/PageTransition-da9d1173.css'
		],
		js: [
			'/./_app/pages/index.svelte-d5e70978.js',
			'/./_app/chunks/vendor-783391f4.js',
			'/./_app/chunks/PageTransition-919305e0.js'
		],
		styles: null
	},
	'src/routes/pages/__layout.svelte': {
		entry: '/./_app/pages/pages/__layout.svelte-ea81f765.js',
		css: [
			'/./_app/assets/pages/pages/__layout.svelte-a9658f10.css',
			'/./_app/assets/app-be9576c1.css',
			'/./_app/assets/PageTransition-da9d1173.css'
		],
		js: [
			'/./_app/pages/pages/__layout.svelte-ea81f765.js',
			'/./_app/chunks/vendor-783391f4.js',
			'/./_app/chunks/PageTransition-919305e0.js'
		],
		styles: null
	},
	'src/routes/pages/privacy.svelte': {
		entry: '/./_app/pages/pages/privacy.svelte-8c7742dc.js',
		css: ['/./_app/assets/pages/pages/privacy.svelte-944cd50c.css'],
		js: ['/./_app/pages/pages/privacy.svelte-8c7742dc.js', '/./_app/chunks/vendor-783391f4.js'],
		styles: null
	},
	'src/routes/pages/about.svelte': {
		entry: '/./_app/pages/pages/about.svelte-c5f5007e.js',
		css: ['/./_app/assets/pages/pages/about.svelte-6a41c218.css'],
		js: ['/./_app/pages/pages/about.svelte-c5f5007e.js', '/./_app/chunks/vendor-783391f4.js'],
		styles: null
	},
	'src/routes/pages/legal.svelte': {
		entry: '/./_app/pages/pages/legal.svelte-15303387.js',
		css: ['/./_app/assets/pages/pages/legal.svelte-03e25539.css'],
		js: ['/./_app/pages/pages/legal.svelte-15303387.js', '/./_app/chunks/vendor-783391f4.js'],
		styles: null
	}
};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: { base: '', assets: '/.' } });

export function render(request, { prerender } = {}) {
	const host = request.headers['host'];
	return respond({ ...request, host }, options, { prerender });
}
