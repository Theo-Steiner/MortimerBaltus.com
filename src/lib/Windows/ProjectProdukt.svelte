<script>
	import ImageLoader from '$lib/UX/ImageLoader.svelte';
	import WindowElement from '../UI/WindowElement.svelte';

	const slug = 'MortimerBaltus/Produkt/Produkt_Hero_fbs3q6';
</script>

<div class="grid-area">
	<WindowElement
		width={499}
		height={392}
		parallax="very-fast"
		background={`url("https://res.cloudinary.com/thdrstnr/image/upload/c_pad,w_iw_div_2,ar_1,b_auto:predominant/c_crop,w_5,g_north_west/${slug}")`}
		title="PROJECT_02"
		href={'/pages/project_02'}
		id={2}
		isInForeground={true}
	>
		<ImageLoader
			sizes="497px"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_497,f_auto,q_auto:best/{slug}"
			alt="Produkt is a lifestyle brand we helped establish"
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
