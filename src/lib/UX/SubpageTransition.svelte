<script>
	import { slide } from 'svelte/transition';

	export let backgroundColor = 'transparent';
</script>

<div transition:slide={{ duration: 800, delay: 200 }} style="--backgroundColor: {backgroundColor}">
	<slot />
</div>

<style>
	div {
		background-color: var(--backgroundColor);
	}
</style>
