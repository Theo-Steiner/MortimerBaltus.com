<script>
	import { horizontalSlide } from './css_utils';
	import Footer from '$lib/UI/Footer.svelte';

	export let backgroundColor = 'transparent';
	export let currentPage = '';
</script>

<div out:horizontalSlide={{ duration: 600 }} style="--backgroundColor: {backgroundColor}">
	<article>
		<slot />
	</article>
	<Footer {currentPage} />
</div>

<style>
	div {
		overflow: hidden;
		background-color: var(--backgroundColor);
	}
	article {
		width: 100vw;
	}
</style>
