<script>
	import { t } from 'svelte-intl-precompile';
	import CleanCodeUI from '../UI/WindowUI/CleanCodeUI.svelte';
	import WindowElement from '../UI/WindowElement.svelte';
</script>

<div class="grid-area">
	<WindowElement
		width={378}
		height={273}
		parallax="very-slow"
		background="#151515"
		title={$t('windows.clean-code')}
		id={10}
		enlargeable={false}
		isInForeground={true}
		intersections={[3]}
		distanceFromIntersection={{
			base: 13,
			large: 8
		}}
	>
		<CleanCodeUI isPaused={false} />
	</WindowElement>
</div>

<style>
	div {
		grid-column: 50/81;
		grid-row: 40/62;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 51/77;
			grid-row: 41/60;
		}
	}
</style>
