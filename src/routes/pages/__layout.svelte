<script>
	import Navigation from '$lib/UI/Navigation.svelte';
	import { navigating, page } from '$app/stores';
	import navState from '$lib/UX/nav-state';
	import deGallery from '$lib/data/deGallery.json';
	import jpGallery from '$lib/data/jpGallery.json';

	let slug = 'title';

	$: {
		slug = $page.path.split('/')[2];
	}

	const informationPages = ['/pages/privacy', '/pages/legal', '/pages/about'];
	const galleryPages = [];
	const gallery = [...deGallery, ...jpGallery];
	for (const image of gallery) {
		galleryPages.push(`/pages/gallery/${image.name}`);
	}
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
			return nextIndexFromRoute(galleryPages, currentRoute);
		} else if (informationPages.includes(currentRoute)) {
			return nextIndexFromRoute(informationPages, currentRoute);
		} else {
			return '/';
		}
	}

	function reportNavigation(route) {
		if (route?.from?.path) {
			const history = $navState.history;
			if (route?.to?.path === history[history.length - 1]) {
				history.pop();
				navState.setHistory(history);
			} else {
				history.push(route.from.path);
				navState.setHistory(history);
			}
		}
	}

	$: reportNavigation($navigating);

	$: nextLink = getNextSubpage($page.path);
	let slideDirection = 'static';

	function setSlide(direction) {
		slideDirection = direction;
	}
</script>

<Navigation
	previousLink={$navState.history[$navState.history.length - 1]}
	currentPage={slug}
	on:go-previous={() => setSlide('inverse')}
	on:go-next={() => setSlide('normal')}
	{nextLink}
/>
<main
	class:inverse-slide={slideDirection === 'inverse'}
	class:normal-slide={slideDirection === 'normal'}
>
	<slot />
	<!-- Footer is inside the SubpageTransition container -->
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		width: 200vw;
	}

	.inverse-slide {
		width: 200vw;
		position: absolute;
		top: 0;
		left: -100vw;
		flex-direction: row-reverse;
	}
</style>
