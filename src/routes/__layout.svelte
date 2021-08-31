<script>
	import PageTransition from '$lib/UX/PageTransition.svelte';

	import '../app.css';
</script>

<PageTransition inDelay={400} outDelay={600}>
	<slot />
</PageTransition>
