<script>
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	import { t } from 'precompile-intl-runtime';
</script>

<svelte:head>
	<title>Project_03</title>
	<meta
		name="description"
		content="Eberhard Müller develops sophis­ti­cated textile interiors at the ghest level."
	/>
</svelte:head>
<div class="container">
	<div class="sticky-image">
		<ResponsiveImage
			imageWidth="2786"
			imageHeight="2786"
			imageID="EberhardMueller/EM_Thumb_wv3jdv"
			alt="Redesigned business cards were part of brand's face lift."
		/>
	</div>
	<div class="lower-container">
		<p>
			{$t('pages.project_03.introduction')}
			<a lang="en" class="outside-link" href="https://eberhard-mueller.de">eberhard-mueller.de ↗</a>
		</p>
		<ResponsiveImage
			imageWidth="2326"
			imageHeight="1494"
			imageID="EberhardMueller/EM_Portrait_fmlj3x"
			alt="A portrait shot of Eberhard Mueller."
		/>
		<div class="sticky-image">
			<ResponsiveImage
				imageWidth="1438"
				imageHeight="1200"
				imageID="EberhardMueller/EM_Bathtub_dark_f2skh4"
				alt="Sophistication both in interior design and the face lifted brand identity."
			/>
		</div>
		<div class="lower-container">
			<figure>
				<ResponsiveImage
					imageWidth="2480"
					imageHeight="3508"
					limitHeight={false}
					displayWidth="70.7vw"
					imageID="EberhardMueller/EM_Page_iwsane"
					alt="The finished page showcases highlights of interior design by Eberhard Mueller"
				/>
			</figure>
			<div class="sticky-image">
				<ResponsiveImage
					imageWidth="2000"
					imageHeight="1355"
					imageID="EberhardMueller/EM_Bathtub_light_bpknz3"
					alt="A bathroom created by Eberhard Mueller."
				/>
			</div>
			<div class="lower-container">
				<div class="image-padding lower-container">
					<ResponsiveImage
						imageWidth="2326"
						imageHeight="1494"
						imageID="EberhardMueller/EM_Page_Menu_tlkvyw"
						alt="Simplicity was the key paradigm to for this rebranding - as with interior design: less is more"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.outside-link {
		color: #fefefe;
	}

	.container {
		background: #151515;
		min-height: calc(100vh - 331px);
	}

	.lower-container {
		background: #151515;
	}

	p {
		color: #fefefe;
	}

	figure {
		padding: 14.65vw;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
			drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.5));
	}

	.image-padding {
		padding: 20px 0;
	}
</style>
