<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import ImageLoader from '../UX/ImageLoader.svelte';
	import deGallery from '../data/deGallery.json';

	var randomIndex = Math.floor(Math.random() * deGallery.length);
	const slug = deGallery[randomIndex].src;
</script>

<div class="grid-area">
	<WindowElement
		width={600}
		height={436}
		parallax="very-fast"
		href="/pages/gallery/{deGallery[randomIndex].name}"
		background={`url("https://res.cloudinary.com/thdrstnr/image/upload/c_pad,w_iw_div_2,ar_1,b_auto:predominant/c_crop,w_5,g_north_west/MortimerBaltus/${slug}")`}
		title={deGallery[randomIndex].name}
		id={11}
		isInForeground={true}
	>
		<ImageLoader
			srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/MortimerBaltus/{slug} 1280w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto,q_auto:best/MortimerBaltus/{slug} 598w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_376,f_auto,q_auto:best/MortimerBaltus/{slug} 376w,"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/MortimerBaltus/{slug}"
			sizes="598px"
			alt={deGallery[randomIndex].alt}
		/>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 145/194;
		grid-row: 11/47;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 148/189;
			grid-row: 14/44;
		}
	}
</style>
