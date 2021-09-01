<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import ContactUI from '../../UI/WindowUI/ContactUI.svelte';
</script>

<FooterWindowElement
	width={378}
	height={313}
	on:toggle-minimize
	background="#EFEFEF"
	title="CONTACT"
>
	<ContactUI />
</FooterWindowElement>
