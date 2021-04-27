<script>
	import PageTransition from '$lib/UX/PageTransition.svelte';
	import Navigation from '$lib/UI/Navigation.svelte';
	import Footer from '$lib/UI/Footer.svelte';
	import { onMount } from 'svelte';

	let innerHeight = 1;
	let nice;
	let niceY = 0;
	let to;
	let toY = 0;
	let meet;
	let meetY = 0;
	let you;
	let youY = 0;

	function textScroll() {
		if (nice && to && meet && you) {
			const newNiceY = nice.getBoundingClientRect().y;
			const deltaNiceY = niceY - newNiceY;
			niceY = (deltaNiceY > 15) | (deltaNiceY < -15) ? newNiceY : niceY;
			const newToY = to.getBoundingClientRect().y;
			const deltaToY = toY - newToY;
			toY = (deltaToY > 15) | (deltaToY < -15) ? newToY : toY;

			const newMeetY = meet.getBoundingClientRect().y;
			const deltaMeetY = meetY - newMeetY;
			meetY = (deltaMeetY > 15) | (deltaMeetY < -15) ? newMeetY : meetY;

			const newYouY = you.getBoundingClientRect().y;
			const deltaYouY = youY - newYouY;
			youY = (deltaYouY > 15) | (deltaYouY < -15) ? newYouY : youY;
			youY = you.getBoundingClientRect().y;
		}
		requestAnimationFrame(textScroll);
	}

	onMount(() => {
		textScroll();
	});
</script>

<svelte:window bind:innerHeight />

<svelte:head>
	<title>ABOUT</title>
	<meta name="description" content="We are MortimerBaltus. Nice to meet you!" />
</svelte:head>

<PageTransition>
	<main>
		<Navigation title="ABOUT" />
		<div class="container">
			<div class="first-paragraph">
				<p>
					MortimerBaltus is a 2021 founded partnership between art director Moritz Müller and web
					developer Theodor Steiner with the purpose of realizing holistic brand experiences by
					utilizing knowledge and techniques from different fields of profession. <br /> We work
					individually or as a team for agencies, companies and start up businesses. <br /> For our clients
					we aspire new concepts and favour the unconventional over the trend. This way we find individual
					solutions that can make lasting impressions in an otherwise boringly standardized world.
				</p>
			</div>
		</div>
		<div class="image-container" />
		<div class="container">
			<p>
				Located in Hamburg and Tokyo we are able to work closely with our partners from both markets
				and can provide intercultural guidance if needed. We are always looking forward to get to
				know new people – and Yes, we also speak Japanese.
			</p>
			<div class="animation-container">
				<h2
					style="--width: 188px; --largeWidth: 376px; --scroll: {Math.min(
						Math.max((niceY - (innerHeight - 300)) / 300, 0),
						1
					)};"
					bind:this={nice}
				>
					NICE
				</h2>
				<h2
					style="--width: 117px; --largeWidth: 233px; --scroll: {Math.min(
						Math.max((toY - (innerHeight - 300)) / 300, 0),
						1
					)};"
					bind:this={to}
				>
					TO
				</h2>
				<h2
					style="--width: 223px; --largeWidth: 445px; --scroll: {Math.min(
						Math.max((meetY - (innerHeight - 300)) / 300, 0),
						1
					)};"
					bind:this={meet}
				>
					MEET
				</h2>
				<h2
					style="--width: 178px; --largeWidth: 336px; --scroll: {Math.min(
						Math.max((youY - (innerHeight - 300)) / 300, 0),
						1
					)};"
					bind:this={you}
				>
					YOU
				</h2>
			</div>
		</div>
		<Footer />
	</main>
</PageTransition>

<style>
	main {
		background-image: linear-gradient(#a25c24, #151515);
	}

	.container {
		background-color: #a25c24;
		position: relative;
		z-index: 1;
	}

	.image-container {
		height: 800px;
		width: 100vw;
		position: sticky;
		top: 0px;
		z-index: 0;
		background-size: 100%;
		background-image: url('https://res.cloudinary.com/thdrstnr/image/upload/v1618455027/MortimerBaltus/About/polaroid_jymdbi.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.first-paragraph {
		padding: 20px 0 20px 0;
	}

	p {
		color: #151515;
		font-size: 22px;
		line-height: 25px;
		letter-spacing: -0.28px;
		padding: 15px 10px 0px 10px;
	}

	h2 {
		color: #151515;
		font-size: 75px;
		letter-spacing: 1.29px;
		line-height: 64.1px;
		transition: transform 0.2s ease-out;
		transform: translateX(
			calc(100vw - var(--width) - ((100vw - var(--width)) * (1 - var(--scroll))))
		);
	}

	.animation-container {
		width: 100vw;
		padding: 90px 10px 50px 10px;
	}

	@media only screen and (min-device-width: 768px) {
		.first-paragraph {
			padding: 30px 0 30px 0;
		}

		p {
			font-size: 44px;
			line-height: 50px;
			letter-spacing: -0.55px;
			padding: 15px 20px 0px 20px;
		}

		h2 {
			font-size: 150px;
			letter-spacing: 2.57px;
			line-height: 128.3px;
			transform: translateX(
				calc(100vw - var(--largeWidth) - ((100vw - var(--largeWidth)) * (1 - var(--scroll))))
			);
		}
	}
</style>
