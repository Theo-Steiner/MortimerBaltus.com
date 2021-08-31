<script>
	import PageTransition from '$lib/UX/PageTransition.svelte';

	import '../app.css';
</script>

<PageTransition reverse inDelay={400} outDelay={400}>
	<slot />
</PageTransition>
