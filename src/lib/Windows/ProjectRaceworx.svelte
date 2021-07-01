<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import ImageLoader from '../UX/ImageLoader.svelte';

	const slug = 'MortimerBaltus/Projects/Raceworx_wfjyou';
</script>

<div class="grid-area">
	<WindowElement
		width={499}
		height={392}
		parallax="very-fast"
		background="#888383"
		title="PROJECT_02"
		id={2}
		isInForeground={true}
	>
		<ImageLoader
			sizes="497px"
			srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug} 1280w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_497,f_auto,q_auto:best/{slug} 497w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_312,f_auto,q_auto:best/{slug} 312w,"
			alt="Raceworx"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug}"
		/>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 34/75;
		grid-row: 124/156;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 35/69;
			grid-row: 124/151;
		}
	}
</style>
