<script>
	import { createEventDispatcher } from 'svelte';

	import viewport from './useViewportAction.js';
	export let once = false;
	const dispatch = createEventDispatcher();
	let intersecting = false;

	const enterHandler = () => {
		intersecting = true;
		dispatch('intersect');
	};
	const exitHandler = () => {
		if (!once) {
			intersecting = false;
		}
	};
</script>

<div use:viewport on:viewport-enter={enterHandler} on:viewport-exit={exitHandler}>
	<slot {intersecting} />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
