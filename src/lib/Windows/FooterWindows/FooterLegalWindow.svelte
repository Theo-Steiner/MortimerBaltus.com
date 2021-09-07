<script>
	import LegalUI from '$lib/UI/WindowUI/LegalUI.svelte';
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
	export let currentPage;

	$: href = currentPage === 'legal' ? undefined : '/pages/legal';
</script>

<FooterWindowElement
	on:toggle-minimize
	width={268}
	height={158}
	background="#1C6370"
	title={$t('windows.legal.title')}
	{href}
>
	<LegalUI />
</FooterWindowElement>
