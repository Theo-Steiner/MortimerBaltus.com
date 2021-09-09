<script>
	import SubpageTransition from '$lib/UX/SubpageTransition.svelte';
	import { onMount } from 'svelte';
	import { t } from 'svelte-intl-precompile';

	let innerHeight = 1;
	let innerWidth = 1;
	let nice;
	let to;
	let meet;
	let you;
	let niceY = 0;
	let lineHeight = 64;
	let offsetWidth = { nice: 188, to: 177, meet: 223, you: 178 };

	function textScroll() {
		if (nice) {
			niceY = nice.getBoundingClientRect().y;
			nice.style.transform = `translateX(${
				innerWidth - offsetWidth.nice - (innerWidth - offsetWidth.nice) * (1 - getScroll())
			}px)`;
			to.style.transform = `translateX(${
				innerWidth - offsetWidth.to - (innerWidth - offsetWidth.to) * (1 - getScroll(1))
			}px)`;
			meet.style.transform = `translateX(${
				innerWidth - offsetWidth.meet - (innerWidth - offsetWidth.meet) * (1 - getScroll(2))
			}px)`;
			you.style.transform = `translateX(${
				innerWidth - offsetWidth.you - (innerWidth - offsetWidth.you) * (1 - getScroll(3))
			}px)`;
		}
		requestAnimationFrame(textScroll);
	}
	function getScroll(lineCount = 0) {
		const lineOffset = lineCount * lineHeight;
		return Math.min(Math.max((niceY + lineOffset - (innerHeight - 300)) / 300, 0), 1);
	}

	onMount(() => {
		lineHeight = window.matchMedia('(min-width: 768px)').matches ? 128 : lineHeight;
		offsetWidth = window.matchMedia('(min-width: 768px)').matches
			? { nice: 376, to: 233, meet: 445, you: 336 }
			: offsetWidth;
		textScroll();
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<svelte:head>
	<title>ABOUT</title>
	<meta name="description" content="We are MortimerBaltus. Nice to meet you!" />
</svelte:head>
<SubpageTransition currentPage="about" backgroundColor="#a25c24">
	<div class="first-paragraph">
		<p>
			{$t('pages.about.introduction')}
			<br />
			<a lang="en" class="outside-link" href="https://concorazon-hamburg.com/"
				>moritzmortimer.de ↗</a
			>
			<a lang="en" class="outside-link" href="https://concorazon-hamburg.com/">theosteiner.de ↗</a>
		</p>
	</div>
	<div class="image-container sticky-image">
		<img
			src="https://res.cloudinary.com/thdrstnr/image/upload/h_800/q_auto:low/v1618455027/MortimerBaltus/About/polaroid_jymdbi.png"
			width="100vw"
			height="800px"
			alt="Polaroid Photograph"
		/>
	</div>
	<div class="lower-container">
		<p>
			{@html $t('pages.about.location')}
		</p>
		<div lang="en" class="animation-container">
			<h2 bind:this={nice}>NICE</h2>
			<h2 bind:this={to}>TO</h2>
			<h2 bind:this={meet}>MEET</h2>
			<h2 bind:this={you}>YOU</h2>
		</div>
	</div>
</SubpageTransition>

<style>
	.outside-link {
		display: inline;
	}

	.lower-container {
		background-color: #a25c24;
		position: relative;
	}

	img {
		height: 800px;
		margin: 0 auto;
		display: block;
		width: 100vw;
		overflow: hidden;
		object-fit: cover;
	}

	.image-container {
		height: 800px;
		width: 100vw;
		background-color: #e1e2e4;
	}

	.first-paragraph {
		padding-top: 53px;
	}

	h2 {
		color: #151515;
		font-size: 75px;
		letter-spacing: 1.29px;
		line-height: 64.1px;
		transition: transform 200ms ease-out;
	}

	.animation-container {
		width: 100vw;
		padding: 40px 10px 30px 10px;
		overflow: hidden;
	}

	@media only screen and (min-device-width: 768px) {
		h2 {
			font-size: 150px;
			letter-spacing: 2.57px;
			line-height: 128.3px;
		}

		.animation-container {
			padding: 80px 20px 50px 20px;
		}
	}
</style>
