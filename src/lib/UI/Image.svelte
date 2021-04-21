<script>
	export let srcset;
	export let src;
	export let alt;
	export let sizes;

	import { onMount } from 'svelte';

	let loaded = false;
	let thisImage;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
		};
	});
</script>

<img
	{sizes}
	{srcset}
	{alt}
	{src}
	class:loaded
	bind:this={thisImage}
	draggable="false"
	loading="lazy"
/>

<style>
	img {
		width: 100%;
		height: 100%;
		display: block;
		opacity: 0;
		object-fit: cover;
	}
	img.loaded {
		opacity: 1;
	}
</style>
