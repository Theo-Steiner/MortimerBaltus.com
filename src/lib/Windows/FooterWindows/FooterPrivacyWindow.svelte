<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import PrivacyUI from '../../UI/WindowUI/PrivacyUI.svelte';
</script>

<FooterWindowElement
	on:toggle-minimize
	width={288}
	height={207}
	background="#FEC7A3"
	href="/pages/privacy"
	title="PRIVACY POLICY"
>
	<PrivacyUI />
</FooterWindowElement>
