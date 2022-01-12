<script context="module">
	import {
		addMessages,
		init,
		getLocaleFromNavigator /*, register */
	} from 'svelte-intl-precompile';
	import en from '$locales/en';
	import ja from '$locales/ja';
	addMessages('en', en);
	addMessages('ja', ja);
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
</script>

<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="canonical" href="https://mortimerbaltus.com{$page.url.pathname}" />
	<meta
		name="viewport"
		content="width=device-width, height=device-height, initial-scale=0.86, minimum-scale=0.86"
		id="viewportmetatag"
	/>
</svelte:head>
<slot />
