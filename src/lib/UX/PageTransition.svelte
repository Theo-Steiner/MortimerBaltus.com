<script>
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let inDelay = 400;
	export let outDelay = 0;
	export let reverse = null;

	onMount(() => {
		if (reverse) {
			document.body.style.display = 'flex';
			document.body.style.flexDirection = 'column-reverse';
		} else {
			document.body.style.display = 'flex';
			document.body.style.flexDirection = 'column';
		}
	});
</script>

<div in:slide={{ delay: inDelay }} out:slide={{ delay: outDelay }}>
	<slot />
</div>
