<script>
	const slug =
		'https://res.cloudinary.com/thdrstnr/image/upload/v1622961941/MortimerBaltus/ConCorazon/';
</script>

<svelte:head>
	<title>Project 01</title>
	<meta
		name="description"
		content="Con Corazón is a brand supporting artisans from countries at war"
	/>
</svelte:head>
<div class="container">
	<img
		class="hero-image"
		src={`${slug}con_corazon_romanesco_ocq9w6.jpg`}
		alt="handcrafted tumblers, arranged with green vegetables"
	/>
	<p>
		Con Corazón is a brand supporting artisans from countries at war by embracing their cultural
		heritage and distributing the unique goods through an appealing online shop. In close
		coordination with the team at Con Corazón a corporate design and its core values have been
		created and defined to give the artisan goods a competitive visual identity in the world of
		contemporary online shopping.
	</p>
	<a href="https://concorazon-hamburg.com/">concorazon-hamburg.com ↗</a>

	<div
		class="background-image"
		style="background-image: url({`${slug}con_corazon_necklace_ef6uzk.jpg`});"
	>
		<div class="visitenkarten">
			<img class="vk" src={`${slug}con_corazon_vk_ghziwc`} alt="Vorderseite der Visitenkarte" />
			<img class="vk" src={`${slug}con_corazon_vk2_qfwien`} alt="Vorderseite der Visitenkarte" />
		</div>
	</div>
</div>

<style>
	:global(.project_01-subpage-color) {
		background-color: #e8f2ea;
	}

	.container {
		background: #e8f2ea;
		min-height: calc(100vh - 331px);
		margin-top: -33px;
	}

	.hero-image {
		width: 100vw;
		height: auto;
		max-height: 853px;
		object-fit: cover;
		object-position: center bottom;
	}

	.background-image {
		width: 100vw;
		height: 853px;
		display: flex;
		background-size: cover;
		justify-content: center;
		align-items: flex-end;
	}

	.visitenkarten {
		width: 100%;
		height: 50%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.vk {
		max-width: 431px;
		height: calc(50% - 3.6vw);
		max-height: 244px;
		margin: 1.8vw;
		box-shadow: 0px 15px 25px -20px rgba(82, 102, 104, 0.66),
			0px 15px 40px -10px rgba(82, 102, 104, 0.33);
	}

	p {
		padding: 30px 20px 20px 20px;
	}

	a {
		display: inline-block;
		margin: 0px 20px 30px 20px;
		color: #151515;
		font-size: 13px;
		line-height: 17.5px;
		letter-spacing: 0.11px;
		text-decoration: none;
		text-align: center;
	}
</style>
