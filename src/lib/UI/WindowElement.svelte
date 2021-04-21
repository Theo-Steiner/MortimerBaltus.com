<script>
	import { onDestroy, onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import windowHandler from '../UX/window-state';
	import Button from './Button.svelte';

	export let height;
	export let width;
	export let parallax;
	export let background = '';
	export let title;
	export let enlargeable = true;
	export let id;
	export let isInForeground = true;
	export let intersections = [];
	export let distanceFromIntersection = 20;
	export let href = '/about';

	let minimized = false;

	let touched = false;
	let thisWindowObject;
	windowHandler.registerWindow({
		id: id,
		parallax: parallax,
		isInForeground: isInForeground,
		intersections: intersections,
		touched: touched
	});

	const unsubscribe = windowHandler.subscribe((windows) => {
		thisWindowObject = windows.find((wdws) => wdws.id === id);
		isInForeground = thisWindowObject.isInForeground;
		parallax = thisWindowObject.parallax;
		touched = thisWindowObject.touched;
	});

	function handleWindowClick() {
		if (isInForeground) {
		} else {
			windowHandler.bringToForeground(id);
		}
	}

	function toggleMinimize() {
		minimized = !minimized;
	}

	onMount(() => {
		touched = false;
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<section
	in:scale={{
		duration: 2000,
		delay: 100
	}}
	class={parallax}
	style="--windowWidth: {width}; --windowHeight: {height};
    --baseShuffleDistance: {distanceFromIntersection.base}; --largeShuffleDistance: {distanceFromIntersection.large};"
	on:click={handleWindowClick}
	class:trigger-shuffle={!isInForeground && touched}
>
	<header>
		<Button buttonType="minimize" on:toggleMinimize={toggleMinimize} />
		{#if title}
			<h1>{title}</h1>
		{:else}
			<h1>Title</h1>
		{/if}
		{#if enlargeable}
			<Button buttonType="subpage" {href} />
		{:else}
			<Button buttonType="hidden" />
		{/if}
	</header>
	{#if !minimized}
		<div
			class:no-events={!isInForeground}
			style="background: {background}; background-size: cover;"
		>
			<slot><p>Content goes here</p></slot>
		</div>
	{/if}
</section>

<style>
	section {
		pointer-events: auto;
		user-select: none;
		position: relative;
		top: 0px;
		width: calc(var(--windowWidth) * 1px);
		height: calc(var(--windowHeight) * 1px);
		border: 1px solid #fefefe;
		border-radius: 6px;
		color: #fefefe;
		overflow: hidden;
		margin: 0px;
		padding: 0px;
		transition: transform 0.5s;
		box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.66);
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #fefefe;
		background-color: #151515;
		padding: 0px;
		margin: 0px;
	}

	h1 {
		margin: 0;
		font-size: 13px;
	}
	div {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding: 0px;
		margin: 0px;
		border-radius: 0px 0px 6px 6px;
	}

	.no-events {
		pointer-events: none;
	}

	@keyframes shuffle {
		0% {
			right: 0;
		}
		50% {
			right: calc((var(--baseShuffleDistance) * max(2550px, 250vmax) / 200 * 2));
		}
		100% {
			right: 0;
		}
	}

	.trigger-shuffle {
		animation-name: shuffle;
		animation-duration: 0.8s;
		animation-timing-function: ease-in-out;
	}

	/* Different parallax speeds. translateZ has to be a positive value in order to prevent Safari rendering bug*/

	.very-slow {
		transform: translateZ(1.2px) scale(0.88);
		transform-origin: center;
	}

	.slowish {
		transform: translateZ(1px) scale(0.9);
		transform-origin: center;
	}

	.slow {
		transform: translateZ(0.8px) scale(0.92);
		transform-origin: center;
	}
	.medium {
		transform: translateZ(0.6px) scale(0.94);
		transform-origin: center;
	}
	.fast {
		transform: translateZ(0.4px) scale(0.96);
		transform-origin: center;
	}
	.very-fast {
		transform: translateZ(0.2px) scale(0.98);
		transform-origin: center;
	}

	@media only screen and (min-width: 1440px) {
		@keyframes shuffle {
			0% {
				right: 0;
			}
			50% {
				right: calc((var(--largeShuffleDistance) * max(2880px, 120vmax) / 200 * 1.25));
			}
			100% {
				right: 0;
			}
		}
	}
</style>
