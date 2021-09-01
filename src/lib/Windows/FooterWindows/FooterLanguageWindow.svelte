<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import LanguageUI from '../../UI/WindowUI/Language/LanguageUI.svelte';
</script>

<FooterWindowElement
	width={266}
	height={273}
	background="C96161"
	title="LANGUAGE"
	on:toggle-minimize
>
	<LanguageUI />
</FooterWindowElement>
