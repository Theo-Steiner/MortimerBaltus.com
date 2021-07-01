<script>
	import ImageLoader from '../UX/ImageLoader.svelte';
	import WindowElement from '../UI/WindowElement.svelte';
	const slug = 'MortimerBaltus/Projects/Soe_04_so0xle';
</script>

<div class="grid-area">
	<WindowElement
		width={472}
		height={344}
		parallax="slowish"
		title="PROJECT_04"
		enlargeable={true}
		background="#f4f6f0"
		href={'/pages/project_04'}
		id={6}
		isInForeground={true}
	>
		<ImageLoader
			sizes="470px"
			srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug} 1280w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_497,f_auto,q_auto:best/{slug} 470w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_312,f_auto,q_auto:best/{slug} 312w,"
			alt="Raceworx"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug}"
		/>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 125/163;
		grid-row: 59/87;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 127/159;
			grid-row: 61/84;
		}
	}
</style>
