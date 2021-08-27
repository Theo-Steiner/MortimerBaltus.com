<script>
	import ImageMarquee from '$lib/UI/ImageMarquee.svelte';

	import WindowElement from '../UI/WindowElement.svelte';
</script>

<div class="grid-area">
	<WindowElement
		width={499}
		height={392}
		parallax="very-fast"
		background="#888383"
		title="PROJECT_02"
		href={'/pages/project_02'}
		id={2}
		isInForeground={true}
	>
		<ImageMarquee />
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
