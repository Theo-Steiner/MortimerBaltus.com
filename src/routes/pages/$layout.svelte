<script>
	import '../../app.css';
	import PageTransition from '$lib/UX/PageTransition.svelte';
	import Navigation from '$lib/UI/Navigation.svelte';
	import Footer from '$lib/UI/Footer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let title = 'title';
	let formattedTitle = 'title';
	onMount(() => {
		title = $page.path.split('/')[2];
		formattedTitle =
			title === 'legal' ? title.concat(' NOTICE').toUpperCase() : title.toUpperCase();
	});
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
