<script>
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	import HorizontalSubpageTransition from '$lib/UX/HorizontalSubpageTransition.svelte';
	import { t } from 'precompile-intl-runtime';
</script>

<svelte:head>
	<title>Project_02 - PRODUKT</title>
	<meta
		name="description"
		content="PRODUKT is a multi-area brand we helped establish in 2020 & 2021. For this, we designed the products, created a brand identity and built a online shop complete with shipping, payments and a easy to use CMS."
	/>
</svelte:head>
<HorizontalSubpageTransition currentPage="project_02" backgroundColor="#faf7f2">
	<div class="sticky-image">
		<ResponsiveImage
			imageWidth="2880"
			imageHeight="1706"
			displayHeight="100vh"
			imageID="Produkt/Produkt_Hero_fbs3q6"
			alt="In addition to establishing the brand itself, we also organized photoshoots to showcase the products."
		/>
	</div>
	<div class="lower-container">
		<p>
			{$t('pages.project_02.introduction')}
			<a lang="en" class="outside-link" href="https://produkt.jp">produkt.jp ↗&#xFE0E;</a>
		</p>
		<ResponsiveImage
			imageWidth="2326"
			imageHeight="1494"
			imageID="Produkt/Produkt_Home_e3txec"
			alt="We developed the online shop to accept payments from countless vendors and ship globally"
		/>
		<div class="bottom-sticky-image">
			<ResponsiveImage
				imageWidth="2000"
				imageHeight="2507"
				limitHeight={false}
				displayHeight="200vh"
				imageID="Produkt/Produkt_Tshirt_o85iqs"
				alt="We envisiond 'PRODUKT' as a lifestyle brand with stylish products from multiple areas"
			/>
		</div>
		<div class="lower-container">
			<ResponsiveImage
				imageWidth="2326"
				imageHeight="1494"
				imageID="Produkt/Produkt_Item_twhvhf"
				alt="To keep the maintenance cost of our client low, we built the shop around a CMS for easy inventory, administration and expansion."
			/>
			<div class="bottom-sticky-image">
				<ResponsiveImage
					imageWidth="2000"
					imageHeight="2507"
					limitHeight={false}
					imageID="Produkt/Produkt_Perfume_l4cdvk"
					alt="A perfume flask we designed for the brand."
				/>
			</div>
			<div class="logo-container lower-container">
				<img
					src="https://res.cloudinary.com/thdrstnr/image/upload/v1630052982/MortimerBaltus/Produkt/ProduktLogo_gawypn.svg"
					alt="Logo for the brand: PRODUKT"
				/>
			</div>
		</div>
	</div>
</HorizontalSubpageTransition>

<style>
	.lower-container {
		background: #faf7f2;
	}

	.bottom-sticky-image {
		position: sticky;
		top: -100vh;
	}

	.logo-container {
		width: 100vw;
		padding: 11vw;
		max-height: 853px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #151515;
	}
	img {
		width: 100%;
	}

	@media (orientation: portrait) {
		.bottom-sticky-image {
			top: 0;
		}
	}
</style>
