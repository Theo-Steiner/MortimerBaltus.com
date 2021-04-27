<script>
	import Button from './Button.svelte';

	export let title = 'TITLE';
</script>

<nav>
	<Button buttonType="previous" href="/" />
	<h1>{title}</h1>
	<Button buttonType="next" />
</nav>

<style>
	nav {
		position: sticky;
		z-index: 9999;
		top: 15px;
		margin: 0 10px 0 10px;
		width: calc(100vw - 20px);
		background-color: #151515;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: solid #fefefe;
		border-radius: 6px;
		border-width: 1px;
		box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.66);
	}

	h1 {
		font-size: 13px;
		color: #fefefe;
	}

	@media screen and (min-device-width: 768px) {
		nav {
			top: 20px;
			margin: 0 20px 0 20px;
			width: calc(100vw - 40px);
		}
	}
</style>
