<script>
	import SlidingText from '$lib/UI/SlidingText.svelte';
	import HorizontalSubpageTransition from '$lib/UX/HorizontalSubpageTransition.svelte';
</script>

<svelte:head>
	<title>Legal Notice</title>
	<meta
		name="description"
		content="This page (together with the documents referred to on it) 
describes the terms on the basis of which you may make use of our website (“Terms of Use”)."
	/>
</svelte:head>
<HorizontalSubpageTransition currentPage="legal">
	<div lang="en" class="container">
		<h1>INFORMATION PURSUANT TO SEC. 5 TMG AND ART. 13 DSGVO</h1>
		<div class="contact-container">
			<ul>
				<li>MortimerBaltus is represented by:</li>
				<li>Moritz Mortimer Müller</li>
				<li>Schlankreye 11</li>
				<li>20144 Hamburg</li>
				<li>Germany</li>
				<li>+49(0)15170031937</li>
				<li>moritz@mortimerbaltus.com</li>
			</ul>
			<ul>
				<li><br /></li>
				<li>Theodor Baltus Steiner</li>
				<li>Shinjuku-ku Wakaba 3-9, Kōpo Sato 101</li>
				<li>160-0011 Tokyo</li>
				<li>Japan</li>
				<li>+81(0)43421663</li>
				<li>theo@mortimerbaltus.com</li>
			</ul>
		</div>

		<hr />
		<SlidingText header="Accountability for Content">
			<p class="intro">
				The contents of our pages have been created with the utmost care. However, we cannot
				guarantee the contents' accuracy, completeness or topicality. According to statutory
				provisions, we are furthermore responsible for our own content on these web pages. In this
				context, please note that we are accordingly not obliged to monitor merely the transmitted
				or saved information of third parties, or investigate circumstances pointing to illegal
				activity. Our obligations to remove or block the use of information under generally
				applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
			</p>
		</SlidingText>
		<hr />
		<SlidingText header="Accountability for Links">
			<p>
				Responsibility for the content of external links (to web pages of third parties) lies solely
				with the operators of the linked pages. No violations were evident to us at the time of
				linking. Should any legal infringement become known to us, we will remove the respective
				link immediately.
			</p>
		</SlidingText>
		<hr />
		<SlidingText header="Copyright">
			<p>
				Our web pages and their contents are subject to German copyright law. Unless expressly
				permitted by law (§ 44a et seq. of the copyright law), every form of utilizing, reproducing
				or processing works subject to copyright protection on our web pages requires the prior
				consent of the respective owner of the rights. Individual reproductions of a work are
				allowed only for private use, so must not serve either directly or indirectly for earnings.
				Unauthorized utilization of copyrighted works is punishable (§ 106 of the copyright law). <br
				/> <br />© {new Date().getFullYear()} MortimerBaltus. All rights reserved.
			</p>
		</SlidingText>
		<hr />
	</div>
</HorizontalSubpageTransition>

<style>
	.container {
		background: #1c6370;
		min-height: calc(100vh - 331px);
		color: #fefefe;
	}

	h1 {
		font-size: 40px;
		line-height: 42px;
		letter-spacing: -0.23px;
		padding: 73px 10px 30px 10px;
	}

	.contact-container {
		display: flex;
		flex-flow: row wrap;
		padding: 0 10px 30px 10px;
	}

	p {
		color: inherit;
		font-size: inherit;
		line-height: inherit;
		letter-spacing: inherit;
		padding: 0;
	}

	li {
		white-space: nowrap;
		line-height: 24px;
		font-size: 18px;
		letter-spacing: -0.55px;
		list-style: none;
	}

	ul {
		margin-right: auto;
	}

	li:first-child,
	li:nth-child(5) {
		padding-bottom: 24px;
	}

	@media only screen and (min-device-width: 768px) {
		h1 {
			font-size: clamp(40px, 6.7vw, 96px);
			line-height: 1.05;
			letter-spacing: -0.55px;
			padding: 83px 20px 30px 20px;
		}

		.contact-container {
			padding: 0 20px 80px 20px;
		}

		li {
			line-height: 26px;
			font-size: 22px;
		}

		li:first-child,
		li:nth-child(5) {
			padding-bottom: 26px;
		}
	}
	@media only screen and (min-device-width: 1440px) {
		h1,
		.contact-container,
		.intro {
			max-width: 1200px;
		}
	}
</style>
