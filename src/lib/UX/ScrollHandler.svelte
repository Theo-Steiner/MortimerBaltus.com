<script>
	import { onDestroy, onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import navState from './nav-state';
	import { vh, vw, getScrollTo } from './css_utils.js';
	import grabState from './grab-state';

	let hasTouchScreen = false;
	export let scroll_element;
	let navStart = false;

	$: if ($navigating?.from?.path == '/') {
		navState.reportNavigation(scroll_element.scrollLeft, scroll_element.scrollTop);
		navStart = true;
	}

	onMount(() => {
		window.addEventListener('wheel', wheelHandler, { passive: false });
		navStart = false;

		if (!$navState.location) {
			if (history.scrollRestoration) {
				window.history.scrollRestoration = 'manual';
			}
			if (window.matchMedia('(orientation: portrait)').matches) {
				scroll_element.scrollTop = getScrollTo(vh(130));
				scroll_element.scrollLeft = getScrollTo(vw(70));
			} else {
				scroll_element.scrollTop = getScrollTo(vh(100));
				scroll_element.scrollLeft = getScrollTo(vw(100));
			}
		} else {
			scroll_element.scrollTop = $navState.location[1];
			scroll_element.scrollLeft = $navState.location[0];
		}

		if ('maxTouchPoints' in navigator) {
			hasTouchScreen = navigator.maxTouchPoints > 0;
		} else if ('msMaxTouchPoints' in navigator) {
			hasTouchScreen = navigator.msMaxTouchPoints > 0;
		} else {
			var mQ = window.matchMedia && matchMedia('(pointer:coarse)');
			if (mQ && mQ.media === '(pointer:coarse)') {
				hasTouchScreen = !!mQ.matches;
			} else if ('orientation' in window) {
				hasTouchScreen = true; // deprecated, but good fallback
			} else {
				// Only as a last resort, fall back to user agent sniffing
				var UA = navigator.userAgent;
				hasTouchScreen =
					/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
			}
		}
	});

	onDestroy(() => {
		window.removeEventListener('wheel', wheelHandler, { passive: false });
	});

	let isMousedown = false;
	let initialM = { x: 0, y: 0 };
	let currentM = { x: 0, y: 0 };
	let scrollVelocityX = 0;
	let scrollVelocityY = 0;
	let momentumID;
	let scrollInertia = 1;

	function beginMomentumTracking() {
		cancelMomentumTracking();
		momentumID = requestAnimationFrame(momentumLoop);
	}

	function cancelMomentumTracking() {
		cancelAnimationFrame(momentumID);
		scrollInertia = 1;
	}

	function momentumLoop() {
		scrollVelocityX *= scrollInertia; // Slow the velocity slightly
		scrollVelocityY *= scrollInertia; // Slow the velocity slightly
		scroll(scrollVelocityX, scrollVelocityY);
		scrollInertia = scrollInertia - 0.01;
		if (Math.abs(scrollVelocityX) > 0.5 || Math.abs(scrollVelocityY) > 0.5) {
			momentumID = requestAnimationFrame(momentumLoop); // Keep looping
		}
	}

	function scroll(x, y) {
		scrollVelocityX = Math.min(70, x);
		scrollVelocityY = Math.min(70, y);
		scroll_element.scrollLeft = scroll_element.scrollLeft + scrollVelocityX;
		scroll_element.scrollTop = scroll_element.scrollTop + scrollVelocityY;
	}

	// Slow down scroll speed with mousewheel
	function wheelHandler(event) {
		if (!navStart) {
			cancelMomentumTracking();
			event.preventDefault();
			event.stopPropagation();
			let reducedDeltaY = Math.round(event.deltaY / 2);
			let reducedDeltaX = Math.round(event.deltaX / 2);
			scroll_element.scrollLeft = scroll_element.scrollLeft + reducedDeltaX;
			scroll_element.scrollTop = scroll_element.scrollTop + reducedDeltaY;
		}
	}

	// The following functions take care of the grab handling

	$: if ($grabState) {
		handleMousedown();
	}

	function handleMousedown(event) {
		window.addEventListener('mouseup', handleMouseup);
		isMousedown = true;
		cancelMomentumTracking();
		initialM.x = event?.clientX || $grabState.clientX;
		initialM.y = event?.clientY || $grabState.clientY;
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseleave', handleMouseup);
		let selection = window.getSelection();
		selection.removeAllRanges();
	}

	function handleMouseup() {
		isMousedown = false;
		beginMomentumTracking();
		window.removeEventListener('mouseup', handleMouseup);
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseleave', handleMouseup);
		grabState.set(undefined);
	}

	function handleMousemove(event) {
		currentM.x = event.clientX;
		currentM.y = event.clientY;
		const deltaX = initialM.x - currentM.x;
		const deltaY = initialM.y - currentM.y;
		scroll(deltaX, deltaY);
		initialM.x = event.clientX;
		initialM.y = event.clientY;
	}
</script>

{#if !hasTouchScreen}
	<div class="grabbable" on:mousedown={handleMousedown} class:grabbing={isMousedown} />
{/if}

<style>
	.grabbable {
		position: absolute;
		width: max(2550px, 250vmax);
		height: max(2550px, 250vmax);
		transform: translateZ(0px) scale(1);
		transform-origin: center;
		cursor: grab;
		top: 0;
		left: 0;
	}

	.grabbing {
		cursor: grabbing;
		user-select: none;
	}

	@media only screen and (min-width: 1440px) {
		.grabbable {
			width: max(2880px, 120vmax);
			height: max(2880px, 120vmax);
		}
	}
</style>
