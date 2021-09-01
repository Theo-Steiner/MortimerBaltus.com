<script>
	import '../../app.css';
	import Navigation from '$lib/UI/Navigation.svelte';
	import Footer from '$lib/UI/Footer.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	let title = 'title';
	let formattedTitle = 'Title';
	let backLink = '/';
	$: {
		title = $page.path.split('/')[2];
		if (title) {
			formattedTitle = formatTitle(title);
		}
		if (browser) {
			backLink = document.referrer;
		}
	}

	function formatTitle(unformattedTitle) {
		if (unformattedTitle === 'legal') {
			return unformattedTitle.concat(' NOTICE').toUpperCase();
		} else if (unformattedTitle === 'privacy') {
			return unformattedTitle.concat(' POLICY').toUpperCase();
		} else {
			return unformattedTitle.toUpperCase();
		}
	}

	function updateBrowserHistory(_) {
		history.back();
		return false;
	}
</script>

<main>
	<Navigation title={formattedTitle} {backLink} on:click={updateBrowserHistory} />
	<slot />
	<Footer />
</main>
