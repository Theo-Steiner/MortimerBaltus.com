<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import LanguageUI from '../../UI/Language/LanguageUI.svelte';
</script>

<FooterWindowElement
	width={266}
	height={273}
	background="C96161"
	title="LANGUAGE"
	on:toggleMinimize
>
	<LanguageUI />
</FooterWindowElement>
