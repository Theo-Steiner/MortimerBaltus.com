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

	<div class="visitenkarten-container">
		<img
			class="vk-image"
			src={`${slug}con_corazon_necklace_ef6uzk.jpg`}
			alt="Beautiful chain dangling from a woman's neck"
		/>
		<div class="visitenkarten stack">
			<img class="vk" src={`${slug}con_corazon_vk_ghziwc`} alt="Vorderseite der Visitenkarte" />
			<img class="vk" src={`${slug}con_corazon_vk2_qfwien`} alt="Rückseite der Visitenkarte" />
		</div>
	</div>
	<div class="two-cards">
		<img
			class="half-image"
			src={`${slug}con_corazon_ear_dekidu`}
			alt="Golden earrings with a blue gem"
		/>
		<img class="half-image" src={`${slug}con_corazon_iPhone_01_zz1cvk`} alt="iPhone App design" />
	</div>
	<img
		class="hero-image"
		src={`${slug}con_corazon_banner_iungvl`}
		alt="Banner design for Con Corazón"
	/>
	<img
		class="hero-image"
		src={`${slug}con_corazon_artisan_urpfhn`}
		alt="An artisan working with hemp strings"
	/>
	<img class="hero-image" src={`${slug}con_corazon_emblem_p70r28`} alt="Emblem for Con Corazón" />
	<div class="two-cards">
		<img
			class="half-image"
			src={`${slug}con_corazon_iPhone_02_w0mhgy`}
			alt="The shop application designed for Con Corazón"
		/>
		<img
			class="half-image"
			src={`${slug}con-corazon_craftsman_m0ssbe`}
			alt="A craftsman focused on his pottery work"
		/>
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

	.vk-image {
		width: 100vw;
		height: 180vw;
		max-height: 853px;
		object-fit: cover;
		object-position: center top;
	}

	.visitenkarten-container {
		position: relative;
		overflow: hidden;
		min-height: 400px;
	}

	.stack {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.visitenkarten {
		z-index: 1;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding-bottom: 20vw;
	}

	.vk {
		width: 90vw;
		height: 51vw;
		max-width: 431px;
		max-height: 244px;
		margin: 1.8vw;
		box-shadow: 0px 15px 25px -20px rgba(82, 102, 104, 0.66),
			0px 15px 40px -10px rgba(82, 102, 104, 0.33);
	}

	.two-cards {
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
	}

	.half-image {
		width: 100%;
		height: 70vh;
		max-height: 853px;
		object-fit: cover;
	}

	p {
		padding: 30px 20px 20px 20px;
	}

	a {
		display: inline-block;
		margin: 0px 20px 30px 20px;
		color: #151515;
		font-size: min(1vw, 13px);
		line-height: 17.5px;
		letter-spacing: 0.11px;
		text-decoration: none;
		text-align: center;
	}

	@media only screen and (min-device-width: 768px) {
		.vk-image {
			width: 100vw;
			height: auto;
		}

		.visitenkarten {
			padding-bottom: min(10vh, 182px);
		}

		.vk {
			width: 30vw;
			height: 17vw;
			max-width: none;
			max-height: none;
		}

		.half-image {
			width: 50%;
			height: auto;
		}
	}
</style>
