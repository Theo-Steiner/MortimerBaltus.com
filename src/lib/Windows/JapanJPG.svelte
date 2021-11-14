<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import ImageLoader from '../UX/ImageLoader.svelte';
	import jpGallery from '../data/jpGallery.json';
	var randomIndex = Math.floor(Math.random() * jpGallery.length);
	const slug = jpGallery[randomIndex].src;
</script>

<div class="grid-area">
	<WindowElement
		width={600}
		height={436}
		parallax="very-fast"
		href="/pages/gallery/{jpGallery[randomIndex].name.toLowerCase()}"
		background={`url("https://res.cloudinary.com/thdrstnr/image/upload/c_pad,w_iw_div_2,ar_1,b_auto:predominant/c_crop,w_5,g_north_west/MortimerBaltus/${slug}")`}
		title={`${jpGallery[randomIndex].name}.jpg`}
		id={8}
		isInForeground={true}
	>
		<ImageLoader
			sizes="598px"
			srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/MortimerBaltus/{slug} 1280w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_598,f_auto,q_auto:best/MortimerBaltus/{slug} 598w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_376,f_auto,q_auto:best/MortimerBaltus/{slug} 376w,"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/MortimerBaltus/{slug}"
			alt={jpGallery[randomIndex].alt}
		/>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 7/56;
		grid-row: 79/114;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 12/53;
			grid-row: 80/110;
		}
	}
</style>
