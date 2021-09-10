<script>
	import { fly } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';
	import Footer from '$lib/UI/Footer.svelte';
	import navState from './nav-state';

	export let backgroundColor = 'transparent';
	export let currentPage = '';
</script>

<!-- Previous is positive x value, next positive -->
<article
	out:fly|local={{
		delay: 300,
		duration: 500,
		x: $navState.flightPath,
		opacity: 1,
		easing: quartInOut
	}}
	in:fly|local={{
		delay: 300,
		duration: 500,
		x: -$navState.flightPath,
		opacity: 1,
		easing: quartInOut
	}}
	style="--backgroundColor: {backgroundColor};"
>
	<slot />
	<Footer {currentPage} />
</article>

<style>
	article {
		position: absolute;
		height: 100%;
		overflow: scroll;

		background-color: var(--backgroundColor);
	}
</style>
