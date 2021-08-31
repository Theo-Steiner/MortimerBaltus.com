<script>
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	let slug =
		'https://res.cloudinary.com/thdrstnr/image/upload/v1623308059/MortimerBaltus/EberhardM%C3%BCller/';
</script>

<svelte:head>
	<title>Project 03</title>
	<meta
		name="description"
		content="Eberhard Müller develops sophis­ti­cated textile interiors at the ghest level."
	/>
</svelte:head>
<div class="container">
	<ResponsiveImage
		imageWidth="2786"
		imageHeight="2786"
		imageID="EberhardMueller/EM_Thumb_wv3jdv"
		alt="Redesigned business cards were part of brand's face lift."
	/>
	<p>
		Eberhard Müller develops sophis­ti­cated interiors at the highest level. For this, the small
		agency from Lake Starnberg near Munich needed a corporate design fitting their high standards
		across all media platforms.
	</p>
	<a href="https://eberhard-mueller.de">eberhard-mueller.de ↗</a>
	<ResponsiveImage
		imageWidth="2326"
		imageHeight="1494"
		imageID="EberhardMueller/EM_Portrait_fmlj3x"
		alt="A portrait shot of Eberhard Mueller."
	/>
	<ResponsiveImage
		imageWidth="1438"
		imageHeight="1200"
		imageID="EberhardMueller/EM_Bathtub_dark_f2skh4"
		alt="Sophistication both in interior design and the face lifted brand identity."
	/>
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
	<ResponsiveImage
		imageWidth="2000"
		imageHeight="1355"
		imageID="EberhardMueller/EM_Bathtub_light_bpknz3"
		alt="A bathroom created by Eberhard Mueller."
	/>
	<div class="image-padding">
		<ResponsiveImage
			imageWidth="2326"
			imageHeight="1494"
			imageID="EberhardMueller/EM_Page_Menu_tlkvyw"
			alt="Simplicity was the key paradigm to for this rebranding - as with interior design: less is more"
		/>
	</div>
</div>

<style>
	:global(.project_03-subpage-color) {
		background-color: #151515;
	}

	a {
		display: inline-block;
		margin: 10px 30px 30px;
		color: #fefefe;
		font-size: min(1vw, 13px);
		line-height: 17.5px;
		letter-spacing: 0.11px;
		text-decoration: none;
		text-align: center;
	}

	.container {
		background: #151515;
		min-height: calc(100vh - 331px);
		margin-top: -33px;
	}

	p {
		color: #fefefe;
		padding: 30px 20px 20px 20px;
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
