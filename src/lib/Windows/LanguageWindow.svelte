<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import LanguageUI from '../UI/LanguageUI.svelte';
</script>

<div class="wrapper grid-area">
	<WindowElement
		width={266}
		height={273}
		parallax="very-slow"
		background="C96161"
		title="LANGUAGE"
		id={13}
		enlargeable={false}
	>
		<LanguageUI />
	</WindowElement>
</div>

<style>
	.wrapper {
		grid-column: 113/135;
		grid-row: 33/55;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
