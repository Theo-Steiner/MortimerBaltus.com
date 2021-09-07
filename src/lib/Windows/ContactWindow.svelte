<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import ContactUI from '../UI/WindowUI/ContactUI.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<div class="wrapper grid-area">
	<WindowElement
		width={378}
		height={315}
		parallax="very-slow"
		background="#EFEFEF"
		title={$t('windows.contact.title')}
		id={14}
		enlargeable={false}
	>
		<ContactUI />
	</WindowElement>
</div>

<style>
	.wrapper {
		grid-column: 11/42;
		grid-row: 11/37;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
