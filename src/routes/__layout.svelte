<script>
	import PageTransition from '$lib/UX/PageTransition.svelte';
	import { setContext } from 'svelte';

	import '../app.css';

	let innerHeight;
	$: setContext('innerHeight', innerHeight);
</script>

<svelte:window bind:innerHeight />
<PageTransition {innerHeight}>
	<slot />
</PageTransition>
