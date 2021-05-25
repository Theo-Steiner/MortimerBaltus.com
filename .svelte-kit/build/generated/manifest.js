const c = [
	() => import('../../../src/routes/__layout.svelte'),
	() => import('../components/error.svelte'),
	() => import('../../../src/routes/index.svelte'),
	() => import('../../../src/routes/pages/__layout.svelte'),
	() => import('../../../src/routes/pages/privacy.svelte'),
	() => import('../../../src/routes/pages/about.svelte'),
	() => import('../../../src/routes/pages/legal.svelte')
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/pages/privacy.svelte
	[/^\/pages\/privacy\/?$/, [c[0], c[3], c[4]], [c[1]]],

	// src/routes/pages/about.svelte
	[/^\/pages\/about\/?$/, [c[0], c[3], c[5]], [c[1]]],

	// src/routes/pages/legal.svelte
	[/^\/pages\/legal\/?$/, [c[0], c[3], c[6]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];
