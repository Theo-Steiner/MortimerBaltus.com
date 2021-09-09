<script>
	import { horizontalSlide } from './css_utils';
	import { quartInOut } from 'svelte/easing';
	import Footer from '$lib/UI/Footer.svelte';

	export let backgroundColor = 'transparent';
	export let currentPage = '';
	let flexOrder = 1;
</script>

<div
	on:outrostart={() => (flexOrder = 0)}
	out:horizontalSlide={{ duration: 600, easing: quartInOut }}
	style="--backgroundColor: {backgroundColor}; --flexOrder: {flexOrder};"
>
	<article>
		<slot />
	</article>
	<Footer {currentPage} />
</div>

<style>
	div {
		background-color: var(--backgroundColor);
		order: var(--flexOrder);
	}
	article {
		width: 100vw;
	}
</style>
