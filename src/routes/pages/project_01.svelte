<script>
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	import HorizontalSubpageTransition from '$lib/UX/HorizontalSubpageTransition.svelte';
	import { t } from 'precompile-intl-runtime';
</script>

<svelte:head>
	<title>Project_01</title>
	<meta
		name="description"
		content="Con Corazón is a brand supporting artisans from countries at war"
	/>
</svelte:head>
<HorizontalSubpageTransition currentPage="project_01" backgroundColor="#e8f2ea">
	<div class="sticky-image">
		<ResponsiveImage
			imageWidth="1280"
			imageHeight="898"
			displayHeight="100vh"
			imageID="ConCorazon/con_corazon_romanesco_ocq9w6"
			alt="handcrafted tumblers, arranged with green vegetables"
		/>
	</div>
	<div class="lower-container">
		<p>
			{$t('pages.project_01.introduction')}
			<a lang="en" class="outside-link" href="https://concorazon-hamburg.com/"
				>concorazon-hamburg.com ↗&#xFE0E;</a
			>
		</p>

		<div class="visitenkarten-container sticky-image">
			<img
				class="vk-image"
				src="https://res.cloudinary.com/thdrstnr/image/upload/MortimerBaltus/ConCorazon/con_corazon_necklace_ef6uzk.jpg"
				width="2160"
				height="1440"
				sizes="100vw"
				srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1024/MortimerBaltus/ConCorazon/con_corazon_necklace_ef6uzk.jpg 1024w, https://res.cloudinary.com/thdrstnr/image/upload/w_768/MortimerBaltus/ConCorazon/con_corazon_necklace_ef6uzk.jpg 768w, https://res.cloudinary.com/thdrstnr/image/upload/w_640/MortimerBaltus/ConCorazon/con_corazon_necklace_ef6uzk.jpg 640w, https://res.cloudinary.com/thdrstnr/image/upload/w_320/MortimerBaltus/ConCorazon/con_corazon_necklace_ef6uzk.jpg 320w, https://res.cloudinary.com/thdrstnr/image/upload/w_160/MortimerBaltus/ConCorazon/con_corazon_necklace_ef6uzk.jpg 160w"
				alt="Beautiful chain dangling from a woman's neck"
			/>
			<div class="visitenkarten stack">
				<img
					class="vk"
					src="https://res.cloudinary.com/thdrstnr/image/upload/MortimerBaltus/ConCorazon/con_corazon_vk_ghziwc"
					width="2953"
					height="1671"
					sizes="30vw"
					srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1024/MortimerBaltus/ConCorazon/con_corazon_vk_ghziwc 1024w, https://res.cloudinary.com/thdrstnr/image/upload/w_768/MortimerBaltus/ConCorazon/con_corazon_vk_ghziwc 768w, https://res.cloudinary.com/thdrstnr/image/upload/w_640/MortimerBaltus/ConCorazon/con_corazon_vk_ghziwc 640w, https://res.cloudinary.com/thdrstnr/image/upload/w_320/MortimerBaltus/ConCorazon/con_corazon_vk_ghziwc 320w, https://res.cloudinary.com/thdrstnr/image/upload/w_160/MortimerBaltus/ConCorazon/con_corazon_vk_ghziwc 160w"
					alt="Vorderseite der Visitenkarte"
				/>
				<img
					class="vk"
					src="https://res.cloudinary.com/thdrstnr/image/upload/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien"
					width="2953"
					height="1671"
					sizes="30vw"
					srcset="https://res.cloudinary.com/thdrstnr/image/upload/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien 2160w, https://res.cloudinary.com/thdrstnr/image/upload/w_1600/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien 1600w, https://res.cloudinary.com/thdrstnr/image/upload/w_1366/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien 1366w, https://res.cloudinary.com/thdrstnr/image/upload/w_1024/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien 1024w, https://res.cloudinary.com/thdrstnr/image/upload/w_768/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien 768w, https://res.cloudinary.com/thdrstnr/image/upload/w_640/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien 640w, https://res.cloudinary.com/thdrstnr/image/upload/w_320/MortimerBaltus/ConCorazon/con_corazon_vk2_qfwien 320w"
					alt="Rückseite der Visitenkarte"
				/>
			</div>
		</div>
		<div class="lower-container">
			<div class="two-cards">
				<ResponsiveImage
					imageWidth="1080"
					imageHeight="1350"
					aspectRatio="16 / 19"
					imageID="ConCorazon/con_corazon_ear_dekidu"
					displayWidth="50vw"
					alt="Golden earrings with a blue gem"
				/>
				<ResponsiveImage
					imageWidth="2000"
					imageHeight="2000"
					aspectRatio="16 / 19"
					imageID="ConCorazon/con_corazon_iPhone_01_zz1cvk"
					displayWidth="50vw"
					alt="Design for an eCommerce shopping app"
				/>
			</div>

			<div class="sticky-image">
				<ResponsiveImage
					imageWidth="2160"
					imageHeight="1440"
					imageID="ConCorazon/con_corazon_banner_iungvl"
					alt="Banner design for Con Corazón"
				/>
			</div>
			<div class="lower-container">
				<ResponsiveImage
					imageWidth="1200"
					imageHeight="802"
					imageID="ConCorazon/con_corazon_artisan_urpfhn"
					alt="An artisan working with hemp strings"
				/>
				<div class="two-cards sticky-image">
					<ResponsiveImage
						imageWidth="2000"
						imageHeight="2000"
						imageID="ConCorazon/con_corazon_iPhone_02_w0mhgy"
						aspectRatio="16 / 19"
						displayWidth="50vw"
						alt="The shop application designed for Con Corazón"
					/>
					<ResponsiveImage
						imageWidth="1080"
						imageHeight="1350"
						imageID="ConCorazon/con-corazon_craftsman_m0ssbe"
						aspectRatio="16 / 19"
						displayWidth="50vw"
						alt="A craftsman focused on his pottery work"
					/>
				</div>
				<div class="lower-container">
					<ResponsiveImage
						imageWidth="2160"
						imageHeight="1440"
						imageID="ConCorazon/con_corazon_emblem_p70r28"
						alt="Emblem design for Con Corazón"
					/>
				</div>
			</div>
		</div>
	</div>
</HorizontalSubpageTransition>

<style>
	.lower-container {
		background: #e8f2ea;
	}

	.vk-image {
		width: 100vw;
		height: auto;
		aspect-ratio: 29/ 17;
		display: block;
		object-fit: cover;
		object-position: center top;
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
		justify-content: center;
		padding-bottom: 12vw;
	}

	.vk {
		width: 30vw;
		height: 17vw;
		margin: 1.8vw;
		box-shadow: 0px 15px 25px -20px rgba(82, 102, 104, 0.66),
			0px 15px 40px -10px rgba(82, 102, 104, 0.33);
	}

	.two-cards {
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
	}
</style>
