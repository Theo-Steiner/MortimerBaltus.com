<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import ContactUI from '../../UI/WindowUI/ContactUI.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<FooterWindowElement
	width={378}
	height={315}
	on:toggle-minimize
	background="#EFEFEF"
	title={$t('windows.contact.title')}
>
	<ContactUI />
</FooterWindowElement>
