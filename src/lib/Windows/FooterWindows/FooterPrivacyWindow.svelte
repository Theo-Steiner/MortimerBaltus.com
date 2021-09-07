<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import PrivacyUI from '../../UI/WindowUI/PrivacyUI.svelte';
	import { t } from 'svelte-intl-precompile';
	export let currentPage;
	$: href = currentPage === 'privacy' ? undefined : '/pages/privacy';
</script>

<FooterWindowElement
	on:toggle-minimize
	width={288}
	height={207}
	background="#FEC7A3"
	title={$t('windows.privacy.title')}
	{href}
>
	<PrivacyUI />
</FooterWindowElement>
