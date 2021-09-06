<script>
	import '../app.css';
	import {
		addMessages,
		init,
		getLocaleFromNavigator /*, register */
	} from 'svelte-intl-precompile';
	import en from '../../locales/en.js';
	import ja from '../../locales/ja.js';
	addMessages('en', en);
	addMessages('ja', ja);
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
</script>

<slot />
