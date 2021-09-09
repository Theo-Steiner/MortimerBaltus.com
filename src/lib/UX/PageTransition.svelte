<script>
	export let innerHeight;

	function wait(_, { duration = 400 }) {
		return {
			duration
		};
	}

	let isTransitioning = false;
</script>

<main
	on:touchstart|passive
	out:wait
	on:outrostart={() => (isTransitioning = true)}
	class:is-transitioning={isTransitioning}
	style="--windowInnerHeight: {innerHeight}px;"
>
	<slot />
</main>

<style>
	main {
		height: 100vh;
		height: var(--windowInnerHeight);
		opacity: 1;
		width: 100%;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		transition: all 400ms cubic-bezier(0.76, 0, 0.24, 1);
		transition-delay: 600ms;
	}

	.is-transitioning {
		height: 0px;
		opacity: 0;
	}
</style>
