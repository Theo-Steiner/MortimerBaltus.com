<script>
	import PageTransition from '$lib/UX/PageTransition.svelte';
	import Navigation from '$lib/UI/Navigation.svelte';
</script>

<svelte:head>
	<title>ABOUT</title>
</svelte:head>
<PageTransition direction="down">
	<main>
		<Navigation />
		<h1>ABOUT</h1>
		<a href="/">GO HOME</a>
	</main>
</PageTransition>

<style>
	* {
		color: red;
	}

	main {
		width: 100vw;
		min-height: 100vw;
		background-color: #a35d24;
	}
</style>
