<script>
	import '../app.css';
	import {
		addMessages,
		init,
		getLocaleFromNavigator /*, register */
	} from 'svelte-intl-precompile';
	import en from '../../locales/en.js';
	import ja from '../../locales/ja.js';
	import { page } from '$app/stores';
	addMessages('en', en);
	addMessages('ja', ja);
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
</script>

<svelte:head>
	<link rel="canonical" href="https://mortimerbaltus.com{$page.path}" />
	<meta
		name="viewport"
		content="width=device-width, height=device-height, initial-scale=0.86, minimum-scale=0.86"
		id="viewportmetatag"
	/>
</svelte:head>
<slot />
