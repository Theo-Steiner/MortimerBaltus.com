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
		<p>
			MortimerBaltus is a 2021 founded partnership between art director Moritz and web developer
			Theo with the purpose of realizing holistic brand experiences by utilizing knowledge and
			techniques from different fields of profession. We work individually or as a team for
			agencies, companies and start up businesses. <br /> For our clients we aspire new concepts and
			favour the unconventional over the trend. This way we find individual solutions that can make lasting
			impressions in an otherwise boringly standardized world.
		</p>
		<p>
			Located in Hamburg and Tokyo we are able to work closely with our partners from both markets
			and can provide intercultural guidance if needed. We are always looking forward to get to know
			new people – and Yes, we also speak Japanese.
		</p>
	</main>
</PageTransition>

<style>
	p {
		color: #151515;
		font-size: 44px;
		line-height: 50px;
		letter-spacing: -0.55px;
		margin-top: 10px;
		margin: 10px 20px 30px 20px;
	}

	main {
		width: 100vw;
		min-height: 100vw;
		background-color: #a35d24;
	}
</style>
