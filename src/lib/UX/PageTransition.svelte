<script>
	import { slide } from 'svelte/transition';

	export let direction = 'up';
</script>

<div class={direction} transition:slide>
	<slot />
</div>

<style>
	.down {
		display: flex;
		flex-direction: column-reverse;
	}

	.up {
		display: flex;
		flex-direction: column;
	}
</style>
