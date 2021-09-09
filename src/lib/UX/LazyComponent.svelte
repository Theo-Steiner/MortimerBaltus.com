<script>
	import IntersectionObserver from '$lib/UX/IntersectionObserver.svelte';

	export let componentPath;

	let componentPromise;

	function loadComponent() {
		componentPromise = import(componentPath);
	}
</script>

<IntersectionObserver let:intersecting>
	{#if intersecting}
		<div use:loadComponent />
		{#if componentPromise}
			{#await componentPromise}
				<slot />
			{:then { default: LoadedComponent }}
				<LoadedComponent />
			{/await}
		{/if}
	{/if}
</IntersectionObserver>
