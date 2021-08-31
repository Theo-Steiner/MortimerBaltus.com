<script>
	import { slide } from 'svelte/transition';

	export let inDelay = 600;
	export let outDelay = 0;
	import { quartInOut } from 'svelte/easing';
</script>

<div
	in:slide={{ delay: inDelay, easing: quartInOut }}
	out:slide={{ delay: outDelay, easing: quartInOut }}
>
	<slot />
</div>
