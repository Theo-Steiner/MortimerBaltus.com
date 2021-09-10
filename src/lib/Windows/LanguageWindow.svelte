<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import LanguageLetter from '../UI/WindowUI/Language/LanguageLetter.svelte';
	import { t } from 'svelte-intl-precompile';
	import LazyComponent from '$lib/UX/LazyComponent.svelte';
</script>

<div class="wrapper grid-area">
	<WindowElement
		width={266}
		height={273}
		parallax="very-slow"
		background="C96161"
		title={$t('windows.language')}
		id={13}
		enlargeable={false}
	>
		<LazyComponent componentImport={() => import('../UI/WindowUI/Language/LanguageUI.svelte')}>
			<figure>
				<LanguageLetter languageSelected="en" />
			</figure>
		</LazyComponent>
	</WindowElement>
</div>

<style>
	.wrapper {
		grid-column: 113/135;
		grid-row: 33/55;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	figure {
		background-color: #151515;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
