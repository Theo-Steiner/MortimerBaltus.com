<script>
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	let slug =
		'https://res.cloudinary.com/thdrstnr/image/upload/v1623308059/MortimerBaltus/EberhardM%C3%BCller/';
</script>

<svelte:head>
	<title>Project 03</title>
	<meta
		name="description"
		content="Eberhard Müller develops sophis­ti­cated textile interiors at the highest leve"
	/>
</svelte:head>
<div class="container">
	<ResponsiveImage
		imageWidth="960"
		imageHeight="960"
		imageID="EberhardM%C3%BCller/EberhardMueller_v2tpxi_qg6up9"
		alt="Business cards in a new corporate design language"
	/>
	<p>^this image needs to be replaced before going live</p>
	<p>
		Eberhard Müller develops sophis­ti­cated textile interiors at the highest level. For this, the
		small agency from Lake Starnberg near Munich needed a corporate design resembling their high
		standards across all media platforms.
	</p>
</div>

<style>
	:global(.project_03-subpage-color) {
		background-color: #151515;
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
</style>
