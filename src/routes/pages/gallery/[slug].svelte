<script context="module">
	import deGallery from '$lib/data/deGallery.json';
	import jpGallery from '$lib/data/jpGallery.json';
	export async function load({ params }) {
		let { slug } = params;
		let image =
			deGallery.find((el) => el.name === slug) || jpGallery.find((el) => el.name === slug);
		return {
			props: { image }
		};
	}
</script>

<script>
	import HorizontalSubpageTransition from '$lib/UX/HorizontalSubpageTransition.svelte';
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	export let image;
	let currentImage = image;
	function updateCurrentImage() {
		currentImage = image;
	}
</script>

<svelte:head>
	<title>Gallery - {image.name.toUpperCase()}</title>
	<meta name="description" content={image.alt} />
</svelte:head>

{#key image}
	<HorizontalSubpageTransition>
		<section use:updateCurrentImage>
			<ResponsiveImage
				limitHeight={false}
				objectFit="contain"
				imageHeight={currentImage.height}
				imageWidth={currentImage.width}
				imageID={currentImage.src}
				alt={currentImage.alt}
			/>
		</section>
	</HorizontalSubpageTransition>
{/key}

<style>
	section {
		display: flex;
		align-items: center;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
</style>
