<script>
	import { fly } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';

	let innerHeight;
	export let innerWidth;
</script>

<!-- for some reason, having this svelte:window inside here and not the layout makes this work -->
<svelte:window bind:innerHeight bind:innerWidth />

<main
	out:fly={{ delay: 300, duration: 500, y: innerHeight, opacity: 1, easing: quartInOut }}
	in:fly={{ delay: 300, duration: 500, y: innerHeight, opacity: 1, easing: quartInOut }}
	style="--innerHeight: {innerHeight}px;"
>
	<slot />
</main>

<style>
	main {
		height: 100vh;
		height: var(--innerHeight);
		overflow: hidden;
		width: 100vw;
	}
</style>
