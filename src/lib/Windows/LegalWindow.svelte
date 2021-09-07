<script>
	import LegalUI from '$lib/UI/WindowUI/LegalUI.svelte';
	import WindowElement from '../UI/WindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<div class="grid-area">
	<WindowElement
		width={268}
		height={158}
		parallax="very-slow"
		background="#1C6370"
		title={$t('windows.legal.title')}
		href="pages/legal"
		id={7}
		isInForeground={true}
	>
		<LegalUI />
	</WindowElement>
</div>

<style>
	div {
		grid-column: 16/38;
		grid-row: 173/187;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 15/33;
			grid-row: 172/183;
		}
	}
</style>
