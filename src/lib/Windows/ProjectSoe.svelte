<script>
	import ImageLoader from '../UX/ImageLoader.svelte';
	import WindowElement from '../UI/WindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
	const slug = 'MortimerBaltus/Projects/Soe_04_so0xle';
</script>

<div class="grid-area">
	<WindowElement
		width={472}
		height={344}
		parallax="slowish"
		title={$t('windows.project_04')}
		enlargeable={true}
		background={`url("https://res.cloudinary.com/thdrstnr/image/upload/c_pad,w_iw_div_2,ar_1,b_auto:predominant/c_crop,w_5,g_north_west/${slug}")`}
		href={'/pages/project_04'}
		id={6}
		isInForeground={true}
	>
		<ImageLoader
			sizes="470px"
			alt="A design proposal for luxury scents"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_470,f_auto,q_auto:best/{slug}"
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
