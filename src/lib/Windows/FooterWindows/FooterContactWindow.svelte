<script>
	import FooterWindowElement from '../../UI/FooterWindowElement.svelte';
	import ContactUI from '../../UI/ContactUI.svelte';
</script>

<FooterWindowElement
	width={378}
	height={313}
	on:toggleMinimize
	background="#EFEFEF"
	title="CONTACT"
>
	<ContactUI />
</FooterWindowElement>
