<script>
	import Button from './Button.svelte';
</script>

<nav>
	<Button buttonType="minimize" href="/" />
	<h1>Title</h1>
	<Button buttonType="next" />
</nav>

<style>
	nav {
		margin: 0px;
		width: calc(100vw - 40px);
		background-color: #151515;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: solid #fefefe;
		border-radius: 6px;
		border-width: 1px;
	}

	h1 {
		font-size: 13px;
		color: #fefefe;
	}
</style>
