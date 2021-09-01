<script>
	import { createEventDispatcher } from 'svelte';

	import Button from './Button.svelte';

	export let height;
	export let width;
	export let background = '';
	export let title;
	export let href = '';

	const dispatch = createEventDispatcher();
	function clickOutside(node) {
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click-outside', node));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<section
	use:clickOutside
	on:click-outside={() => dispatch('toggle-minimize')}
	style="width: {width}px; height: {height}px;"
>
	<header>
		<Button buttonType="minimize" on:toggle-minimize />
		{#if title}
			<h1>{title}</h1>
		{:else}
			<h1>Title</h1>
		{/if}
		{#if href}
			<Button buttonType="subpage" {href} />
		{:else}
			<Button buttonType="hidden" />
		{/if}
	</header>
	<div class="content-wrapper" style="background: {background}; background-size: cover;">
		<slot><p>Content goes here</p></slot>
	</div>
</section>

<style>
	section {
		pointer-events: auto;
		user-select: none;
		position: relative;
		border: 1px solid #fefefe;
		border-radius: 6px;
		color: #fefefe;
		overflow: hidden;
		margin: 0px;
		padding: 0px;
		box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.66);
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #151515;
		padding: 0px;
		margin: 0px;
	}

	h1 {
		margin: 0;
		font-size: 13px;
	}

	.content-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding: 0px;
		margin: 0px;
		border-top: 1px solid #fefefe;
		border-radius: 0px 0px 6px 6px;
	}
</style>
