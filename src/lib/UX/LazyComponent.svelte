<script>
	import IntersectionObserver from '$lib/UX/IntersectionObserver.svelte';

	export let componentImport;
	export let exposesIntersecting = false;

	let componentPromise;
	let componentLoaded = false;

	function loadComponent() {
		if (!componentLoaded) {
			componentPromise = componentImport();
			componentLoaded = true;
		}
	}
</script>

<IntersectionObserver let:intersecting>
	{#if intersecting}
		<div use:loadComponent />
	{/if}
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
