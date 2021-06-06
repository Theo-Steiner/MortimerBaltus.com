<script>
	import '../../app.css';
	import PageTransition from '$lib/UX/PageTransition.svelte';
	import Navigation from '$lib/UI/Navigation.svelte';
	import Footer from '$lib/UI/Footer.svelte';
	import { page } from '$app/stores';

	let title = 'title';
	let formattedTitle = 'Title';
	$: {
		title = $page.path.split('/')[2];
		if (title) {
			formattedTitle = formatTitle(title);
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
</script>

<PageTransition>
	<main>
		<div class="{title}-subpage-color">
			<Navigation title={formattedTitle} />
			<slot />
			<Footer />
		</div>
	</main>
</PageTransition>
