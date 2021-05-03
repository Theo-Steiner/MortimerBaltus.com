<script>
	let contentAccountability = false;
</script>

<h1>INFORMATION PURSUANT TO SEC. 5 TMG AND ART. 13 DSGVO</h1>
<div class="contact-container">
	<ul class="col-left">
		<li>MortimerBaltus is represented by</li>
		<li>Moritz Mortimer Müller</li>
		<li>Schlankreye 11</li>
		<li>20144 Hamburg</li>
		<li>Germany</li>
		<li>+49(0)15170031937</li>
		<li>moritz@mortimerbaltus.com</li>
	</ul>
	<ul class="col-right">
		<li />
		<li>Theodor Baltus Steiner</li>
		<li>Shinjuku-ku Wakaba 3-9, Kōpo Sato 101</li>
		<li>160-0011 Tokyo</li>
		<li>Japan</li>
		<li>+81(0)43421663</li>
		<li>theo@mortimerbaltus.com</li>
	</ul>
</div>

<hr />
<section
	class="content-accountability"
	on:click={() => (contentAccountability = !contentAccountability)}
>
	<h2>Accountability for content</h2>
	{#if contentAccountability}
		<p>
			The contents of our pages have been created with the utmost care. However, we cannot guarantee
			the contents' accuracy, completeness or topicality. According to statutory provisions, we are
			furthermore responsible for our own content on these web pages. In this context, please note
			that we are accordingly not obliged to monitor merely the transmitted or saved information of
			third parties, or investigate circumstances pointing to illegal activity. Our obligations to
			remove or block the use of information under generally applicable laws remain unaffected by
			this as per §§ 8 to 10 of the Telemedia Act (TMG).
		</p>
	{/if}
</section>
<hr />
<h2>Accountability for links</h2>
<hr />
<h2>Copyright</h2>
<hr />

<style>
	:global(.legal-subpage-color) {
		background-color: #1c6370;
	}

	section:hover {
		background-color: #151515;
	}

	h1 {
		color: #fefefe;
		font-size: 40px;
		line-height: 42px;
		letter-spacing: -0.23px;
		padding: 73px 10px 30px 10px;
	}

	h2 {
		color: #fefefe;
		font-size: 24px;
		letter-spacing: -0.55px;
		padding: 15px 10px 15px 10px;
	}

	.contact-container {
		display: flex;
		flex-direction: column;
		padding: 0 10px 30px 10px;
	}

	li {
		color: #fefefe;
		line-height: 24px;
		font-size: 18px;
		letter-spacing: -0.55px;
	}

	li:first-child,
	li:nth-child(5) {
		padding-bottom: 24px;
	}

	hr {
		color: #fefefe;
	}
</style>
