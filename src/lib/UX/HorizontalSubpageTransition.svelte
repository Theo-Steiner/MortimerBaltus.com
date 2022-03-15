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
	in:fly={{
		delay: 300,
		duration: 500,
		x: -$navState.flightPath,
		opacity: 1,
		easing: quartInOut
	}}
	style="--backgroundColor: {backgroundColor};"
>
	<div>
		<slot />
	</div>
	<Footer {currentPage} />
</article>

<style>
	div {
		min-height: calc(100vh - 333px);
		min-height: calc(100dvh - 333px);
		background-color: var(--backgroundColor);
	}

	article {
		position: absolute;
		height: 100vh;
		height: 100dvh;
		overflow: scroll;
	}
</style>
