<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import LanguageUI from '../../UI/WindowUI/Language/LanguageUI.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<FooterWindowElement
	width={266}
	height={273}
	background="#151515"
	title={$t('windows.language')}
	on:toggle-minimize
>
	<LanguageUI />
</FooterWindowElement>
