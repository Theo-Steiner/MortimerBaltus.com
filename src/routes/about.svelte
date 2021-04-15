<script>
	import PageTransition from '$lib/UX/PageTransition.svelte';
	import Navigation from '$lib/UI/Navigation.svelte';
	import Footer from '$lib/UI/Footer.svelte';
	import { onMount } from 'svelte';

	let main;
	let mainHeight = 1;
	let scrollTop = 0;
	let nice;
	let niceOffset = 0;
	let relativeScrollToNice = 0;
	let to;
	let toOffset = 0;
	let relativeScrollToTo = 0;
	let meet;
	let meetOffset = 0;
	let relativeScrollToMeet = 0;
	let you;
	let youOffset = 0;
	let relativeScrollToYou = 0;

	function textScroll() {
		if (main && nice && to && meet && you) {
			scrollTop = main.scrollTop + main.clientHeight;
			relativeScrollToNice = Math.max(
				(scrollTop - niceOffset + 300) / (mainHeight - niceOffset),
				0
			);
			relativeScrollToTo = Math.max((scrollTop - toOffset + 200) / (mainHeight - toOffset), 0);
			relativeScrollToMeet = Math.max(
				(scrollTop - meetOffset + 100) / (mainHeight - meetOffset),
				0
			);
			relativeScrollToYou = Math.max((scrollTop - youOffset) / (mainHeight - youOffset), 0);
		}
		requestAnimationFrame(textScroll);
	}

	onMount(() => {
		mainHeight = main.scrollHeight;
		niceOffset = nice.offsetTop;
		toOffset = to.offsetTop;
		meetOffset = to.offsetTop;
		youOffset = to.offsetTop;
		textScroll();
	});
</script>

<svelte:head>
	<title>ABOUT</title>
</svelte:head>
<PageTransition>
	<main bind:this={main}>
		<Navigation />
		<div class="first-paragraph static">
			<p>
				MortimerBaltus is a 2021 founded partnership between art director Moritz Müller and web
				developer Theodor Steiner with the purpose of realizing holistic brand experiences by
				utilizing knowledge and techniques from different fields of profession. <br /> We work
				individually or as a team for agencies, companies and start up businesses. <br /> For our clients
				we aspire new concepts and favour the unconventional over the trend. This way we find individual
				solutions that can make lasting impressions in an otherwise boringly standardized world.
			</p>
		</div>
		<div class="parallax" />
		<div class="static">
			<p>
				Located in Hamburg and Tokyo we are able to work closely with our partners from both markets
				and can provide intercultural guidance if needed. We are always looking forward to get to
				know new people – and Yes, we also speak Japanese.
			</p>
			<div class="animation-container">
				<h2 style="--width: 376px; --scroll: {Math.min(relativeScrollToNice, 1)};" bind:this={nice}>
					NICE
				</h2>
				<h2 style="--width: 233px; --scroll: {Math.min(relativeScrollToTo, 1)};" bind:this={to}>
					TO
				</h2>
				<h2 style="--width: 445px; --scroll: {Math.min(relativeScrollToMeet, 1)};" bind:this={meet}>
					MEET
				</h2>
				<h2 style="--width: 336px; --scroll: {Math.min(relativeScrollToYou, 1)};" bind:this={you}>
					YOU
				</h2>
			</div>
		</div>
		<Footer />
	</main>
</PageTransition>

<style>
	main {
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
		perspective: 2px;
		background-color: #a35d24;
	}

	.parallax {
		height: 800px;
		position: relative;
	}

	.parallax::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateZ(-1px) scale(1.5);
		z-index: -1;
		background-size: 100%;
		background-image: url('https://res.cloudinary.com/thdrstnr/image/upload/v1618455027/MortimerBaltus/About/polaroid_jymdbi.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.first-paragraph {
		padding: 30px 0 30px 0;
	}

	.static {
		background-color: #a35d24;
	}

	p {
		color: #151515;
		font-size: 44px;
		line-height: 50px;
		letter-spacing: -0.55px;
		padding: 15px 20px 0px 20px;
	}

	h2 {
		color: #151515;
		font-size: 150px;
		letter-spacing: 2.57px;
		line-height: 128.3px;
		transform: translateX(calc(100vw - var(--width) - ((100vw - var(--width)) * var(--scroll))));
	}

	.animation-container {
		margin: 150px 0 30px 0;
	}
</style>
