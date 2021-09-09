<script context="module">
	import deGallery from '$lib/data/deGallery.json';
	import jpGallery from '$lib/data/jpGallery.json';
	export async function load({ page }) {
		let slug = page.params.slug;
		let image =
			deGallery.find((el) => el.name === slug) || jpGallery.find((el) => el.name === slug);
		return {
			props: { image }
		};
	}
</script>

<script>
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	import SubpageTransition from '$lib/UX/SubpageTransition.svelte';
	export let image;
</script>

<SubpageTransition>
	<section>
		<ResponsiveImage
			limitHeight={false}
			objectFit="contain"
			imageHeight={image.height}
			imageWidth={image.width}
			imageID={image.src}
			alt={image.alt}
		/>
	</section>
</SubpageTransition>

<style>
	section {
		display: flex;
		align-items: center;
		height: 100vh;
		overflow: hidden;
	}
</style>
