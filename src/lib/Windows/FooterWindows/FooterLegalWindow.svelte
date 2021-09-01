<script>
	import LegalUI from '$lib/UI/WindowUI/LegalUI.svelte';
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
</script>

<FooterWindowElement
	on:toggle-minimize
	width={268}
	height={158}
	background="#1C6370"
	title="LEGAL NOTICE"
	href="/pages/legal"
>
	<LegalUI />
</FooterWindowElement>
