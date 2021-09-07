<script>
	import PrivacyUI from '$lib/UI/WindowUI/PrivacyUI.svelte';
	import WindowElement from '../UI/WindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<div class="grid-area">
	<WindowElement
		width={288}
		height={207}
		parallax="very-slow"
		background="#FEC7A3"
		href="/pages/privacy"
		title={$t('windows.privacy.title')}
		id={5}
		isInForeground={true}
	>
		<PrivacyUI />
	</WindowElement>
</div>

<style>
	div {
		grid-column: 142/166;
		grid-row: 175/193;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 143/163;
			grid-row: 170/184;
		}
	}
</style>
