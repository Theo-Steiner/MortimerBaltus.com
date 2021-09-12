<script>
	import IntersectionObserver from '$lib/UX/IntersectionObserver.svelte';

	export let componentImport;
	export let exposesIntersecting = false;

	let componentPromise;
	let componentLoaded = false;

	const loadComponent = () => {
		if (!componentLoaded) {
			componentPromise = componentImport();
			componentLoaded = true;
		}
	};
</script>

<IntersectionObserver on:intersect={loadComponent} let:intersecting>
	{#if componentPromise}
		{#await componentPromise}
			<slot />
		{:then { default: LoadedComponent }}
			{#if exposesIntersecting}
				<LoadedComponent {intersecting} />
			{:else}
				<LoadedComponent />
			{/if}
		{/await}
	{/if}
</IntersectionObserver>
