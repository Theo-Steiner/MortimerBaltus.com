<script>
	import viewport from './useViewportAction.js';
	export let once = false;
	let intersecting = false;

	const exitHandler = () => {
		if (!once) {
			intersecting = false;
		}
	};
</script>

<div use:viewport on:viewport-enter={() => (intersecting = true)} on:viewport-exit={exitHandler}>
	<slot {intersecting} />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
