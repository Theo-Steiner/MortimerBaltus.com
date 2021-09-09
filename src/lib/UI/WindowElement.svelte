<script>
	import { goto } from '$app/navigation';
	import grabState from '$lib/UX/grab-state';
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
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
	export let href = undefined;

	let isMinimized = false;
	let intersectionIsMinimized = false;

	let touched = false;
	let thisWindowObject;

	let enlargeButton;

	let triggerIntroAnimation = false;

	let subpageActive = false;

	windowHandler.registerWindow({
		id: id,
		parallax: parallax,
		isInForeground: isInForeground,
		intersections: intersections,
		intersectionIsMinimized: false,
		touched: touched
	});

	const unsubscribe = windowHandler.subscribe((windows) => {
		thisWindowObject = windows.find((wdws) => wdws.id === id);
		isInForeground = thisWindowObject.isInForeground;
		parallax = thisWindowObject.parallax;
		touched = thisWindowObject.touched;
		intersectionIsMinimized = thisWindowObject.intersectionIsMinimized;
	});

	function toggleMinimize() {
		isMinimized = !isMinimized;
		if (intersections.length != 0) {
			windowHandler.updateIsMinimized(id);
		}
	}

	function triggerGrab(evt) {
		grabState.set(evt);
	}

	let isGrabbing = false;

	// Plain event handler to process clicks (Or currently double clicks) on the window-content
	function handleContentClick() {
		if (href && !isGrabbing) {
			subpageActive = true;
			goto(href);
		}
	}

	function handleContentMousedown(evt) {
		triggerGrab(evt);
		isGrabbing = false;
		setTimeout(() => {
			isGrabbing = true;
		}, 200);
	}

	// Plain event handler to process clicks on the window in general and bring them to the foreground
	// if they are in the background and not minimized or on the enlargeButton
	function handleWindowClick(evt) {
		if (!isInForeground && !isMinimized) {
			if (!href) {
				windowHandler.bringToForeground(id);
			} else if (!enlargeButton.contains(evt.target)) {
				windowHandler.bringToForeground(id);
			}
		}
	}

	function handleWindowMousedown(evt) {
		if (!enlargeButton?.contains(evt.target)) {
			triggerGrab(evt);
		}
	}

	onMount(() => {
		touched = false;
		triggerIntroAnimation = true;
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<div
	class:fly-out={subpageActive}
	style="--fly-animation: fly-{parallax};"
	class="parallax-wrapper {parallax}"
>
	<div
		style="width: {width}px; height: {height}px; --baseShuffleDistance: {isMinimized |
		intersectionIsMinimized
			? 0
			: distanceFromIntersection.base}; --largeShuffleDistance: {isMinimized |
		intersectionIsMinimized
			? 0
			: distanceFromIntersection.large};"
		class:trigger-forward-shuffle={!isInForeground && touched}
		class:minimized-notransition={isMinimized | intersectionIsMinimized}
	>
		<section
			style="--windowWidth: {width}; --windowHeight: {height}; --order: {id / 10};"
			on:mousedown={handleWindowMousedown}
			on:click={handleWindowClick}
			class:grabbing={$grabState}
			class:blur-intro={triggerIntroAnimation}
		>
			<header>
				<Button buttonType="minimize" on:toggle-minimize={toggleMinimize} />
				{#if title}
					<h1>{title.toUpperCase()}</h1>
				{:else}
					<h1>Title</h1>
				{/if}
				{#if enlargeable}
					<div bind:this={enlargeButton}>
						<Button on:enlarge={() => (subpageActive = true)} buttonType="subpage" {href} />
					</div>
				{:else}
					<Button buttonType="hidden" />
				{/if}
			</header>
			{#if !isMinimized}
				<div
					transition:slide|local
					class:no-events={!isInForeground}
					on:mousedown|stopPropagation={handleContentMousedown}
					on:click={handleContentClick}
					class="content-wrapper"
					style="height: {height - 36}px; background: {background}; background-size: cover;"
				>
					<slot><p>Content goes here</p></slot>
				</div>
			{/if}
		</section>
	</div>
</div>

<style>
	.parallax-wrapper {
		transition: 0.8s;
		position: relative;
		overflow: visible;
	}
	.minimized-notransition {
		transition: transform 0.2s;
	}

	section {
		pointer-events: auto;
		cursor: grab;
		user-select: none;
		position: relative;
		width: calc(var(--windowWidth) * 1px);
		max-height: calc(var(--windowHeight) * 1px);
		border: 1px solid #fefefe;
		border-radius: 6px;
		color: #fefefe;
		overflow: hidden;
		margin: 0px;
		padding: 0px;
		box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.66);
		filter: blur(0px);
		transform: scale(1);
		opacity: 0;
	}

	.grabbing {
		cursor: grabbing;
	}

	.blur-intro {
		animation: 0.5s cubic-bezier(0.22, 1, 0.36, 1) calc(1.5s + 1s * var(--order)) 1 normal forwards
			running blur-effect;
	}

	@keyframes blur-effect {
		0% {
			filter: blur(5px);
			transform: scale(1.2);
			opacity: 0;
		}

		100% {
			filter: blur(0px);
			transform: scale(1);
			opacity: 1;
		}
	}

	header {
		cursor: default;
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

	.no-events {
		pointer-events: none;
	}

	.trigger-forward-shuffle {
		animation: 0.8s ease-in-out 0s forward-shuffle;
	}

	@keyframes forward-shuffle {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(calc((var(--baseShuffleDistance) * max(2550px, 250vmax) / 200 * -2)));
		}
		100% {
			transform: translateX(0);
		}
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
		@keyframes forward-shuffle {
			0% {
				transform: translateX(0);
			}
			50% {
				transform: translateX(
					calc((var(--largeShuffleDistance) * max(2880px, 120vmax) / 200 * -1))
				);
			}
			100% {
				transform: translateX(0);
			}
		}
	}

	.fly-out {
		animation: var(--fly-animation) 800ms forwards;
		animation-timing-function: cubic-bezier(0.7, 0, 0.84, 0);
	}

	@keyframes -global-fly-very-slow {
		from {
			transform: translateZ(1.2px) translateY(0px) scale(0.88);
		}
		to {
			transform: translateZ(1.2px) translateY(60vh) scale(0.88);
		}
	}

	@keyframes -global-fly-slowish {
		from {
			transform: translateZ(1px) translateY(0px) scale(0.9);
		}
		to {
			transform: translateZ(1px) translateY(60vh) scale(0.9);
		}
	}

	@keyframes -global-fly-slow {
		from {
			transform: translateZ(0.8px) translateY(0px) scale(0.92);
		}
		to {
			transform: translateZ(0.8px) translateY(60vh) scale(0.92);
		}
	}
	@keyframes -global-fly-medium {
		from {
			transform: translateZ(0.6px) translateY(0px) scale(0.94);
		}
		to {
			transform: translateZ(0.6px) translateY(60vh) scale(0.94);
		}
	}
	@keyframes -global-fly-fast {
		from {
			transform: translateZ(0.4px) translateY(0px) scale(0.96);
		}
		to {
			transform: translateZ(0.4px) translateY(60vh) scale(0.96);
		}
	}
	@keyframes -global-fly-very-fast {
		from {
			transform: translateZ(0.2px) translateY(0px) scale(0.98);
		}
		to {
			transform: translateZ(0.2px) translateY(60vh) scale(0.98);
		}
	}
</style>
