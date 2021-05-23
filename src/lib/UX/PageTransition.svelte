<script>
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

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

<div transition:slide>
	<slot />
</div>
