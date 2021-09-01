<script>
	import Button from './Button.svelte';
	import { fly } from 'svelte/transition';

	export let title = 'TITLE';
	export let nextLink = '/';
	export let fromRoute;

	function goBack(_) {
		history.back();
		return false;
	}
</script>

<nav in:fly={{ y: -300, delay: 600 }}>
	<div>
		{#if fromRoute !== '/'}
			<Button buttonType="home" />
		{/if}
		<Button buttonType="previous" on:history-back={goBack} />
	</div>
	<h1>{title}</h1>
	<Button buttonType="next" href={nextLink} />
</nav>

<style>
	div {
		display: flex;
	}
	p {
		color: white;
	}
	nav {
		transform: translateZ(999px);
		position: fixed;
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
