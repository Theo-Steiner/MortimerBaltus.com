<script>
	import '../../app.css';
	import Navigation from '$lib/UI/Navigation.svelte';
	import Footer from '$lib/UI/Footer.svelte';
	import { navigating, page } from '$app/stores';
	import navState from '$lib/UX/nav-state';

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

	const informationPages = ['/pages/privacy', '/pages/legal', '/pages/about'];
	const galleryPages = [];
	const projectPages = [
		'/pages/project_01',
		'/pages/project_02',
		'/pages/project_03',
		'/pages/project_04'
	];

	function nextIndexFromRoute(routeGroup, currentRoute) {
		const currentIndex = routeGroup.findIndex((el) => el === currentRoute);
		const nextIndex = (currentIndex + 1) % routeGroup.length;
		return routeGroup[nextIndex];
	}

	function getNextSubpage(currentRoute) {
		if (projectPages.includes(currentRoute)) {
			return nextIndexFromRoute(projectPages, currentRoute);
		} else if (galleryPages.includes(currentRoute)) {
		} else if (informationPages.includes(currentRoute)) {
			return nextIndexFromRoute(informationPages, currentRoute);
		} else {
			return '/';
		}
	}

	function reportNavigation(route) {
		if (route !== undefined) {
			navState.setFrom(route);
		}
	}

	$: reportNavigation($navigating?.from?.path);

	$: nextLink = getNextSubpage($page.path);
</script>

<main>
	<Navigation fromRoute={$navState.from} title={formattedTitle} {nextLink} />
	<slot />
	<Footer />
</main>
