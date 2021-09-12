<script>
	import ResponsiveImage from '$lib/UX/ResponsiveImage.svelte';
	import HorizontalSubpageTransition from '$lib/UX/HorizontalSubpageTransition.svelte';
	import { t } from 'precompile-intl-runtime';
	let videoSlug =
		'https://res.cloudinary.com/thdrstnr/video/upload/ac_none,c_scale,q_auto:best,w_1280/MortimerBaltus/Soe/Soe_02_ai4z59';
</script>

<svelte:head>
	<title>Project_04</title>
	<meta
		name="description"
		content="Proposal for a visual identity for a perfume startup from Germany - now succesfully launched under the name Soèm"
	/>
</svelte:head>
<HorizontalSubpageTransition currentPage="project_04" backgroundColor="#dadcd3">
	<div class="sticky-image">
		<ResponsiveImage
			imageWidth="2400"
			imageHeight="1800"
			displayHeight="100vh"
			objectPosition="center center"
			imageID="Soe/Soe_01_ethymr"
			alt="How we envisioned the final packaging of the product."
		/>
	</div>
	<div class="lower-container">
		<p>
			{$t('pages.project_04.introduction')}
			<a lang="en" class="outside-link" href="https://so-em.com">so-em.com ↗</a>
		</p>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video class="sticky-video" muted autoplay loop playsinline>
			<source src={`${videoSlug}.webm`} type="video/webm" />
			<source src={`${videoSlug}.mp4`} type="video/mp4" />
			<source src={`${videoSlug}.ogg`} type="video/ogg" />
			Sorry, your browser doesn't support embedded videos
		</video>
		<div class="lower-container">
			<div class="logo-container">
				<svg viewBox="0 0 240.88 67.479" xmlns="http://www.w3.org/2000/svg">
					<path
						class="cls-1"
						d="M151.829,59.862H87.831v7.167h63.998ZM9.658,32.163c0-4.195,8.488-5.951,24.975-5.951a106.92673,106.92673,0,0,1,34.145,5.561l2.926-6.536c-2.536-2.049-16.681-8.487-37.071-8.487-18.731,0-32.78,4.097-32.78,15.315,0,11.122,11.708,12.683,33.658,13.951,16.878.976,30.34.293,30.34,5.951,0,4.878-12.292,6.147-25.755,6.147-19.511,0-31.316-5.171-36.584-7.708L0,56.942c4.097,2.537,16.488,10.537,41.267,10.537,19.023,0,32.291-4.097,32.291-15.512,0-11.414-12.487-13.072-34.34-14.34-18.633-1.074-29.56-.586-29.56-5.464M151.829,28.64c0,9.756-13.56,15.608-31.999,15.608-18.438,0-31.999-5.852-31.999-15.608s13.561-15.61,31.999-15.61c18.439,0,31.999,5.854,31.999,15.61m7.61,0c0-14.926-16.097-25.365-39.609-25.365-23.511,0-39.608,10.439-39.608,25.365S96.319,54.005,119.83,54.005c23.512,0,39.609-10.439,39.609-25.365m21.006-15.788,42.281-5.75L221.76,0,179.479,5.75Zm52.141,23.994h-58.73c1.757-5.951,12.487-10.536,31.511-10.536,16.389,0,25.658,3.512,27.219,10.536m7.999,8.975a21.64867,21.64867,0,0,0,.293-3.61c0-15.023-11.61-25.461-36.877-25.461-24.682,0-38.828,11.413-38.828,25.461,0,15.122,12.585,25.268,38.438,25.268,14.049,0,25.072-2.927,34.731-9.561l-3.61-5.658c-8.975,3.902-16.878,5.756-29.462,5.756-18.439,0-31.999-4.196-32.292-12.195Z"
					/>
				</svg>
			</div>
			<ResponsiveImage
				imageWidth="2400"
				imageHeight="1800"
				imageID="Soe/Soe_04_zc06pa"
				alt="The engraved logo conveys the luxurious feel of the brand"
			/>
		</div>
	</div>
</HorizontalSubpageTransition>

<style>
	.outside-link {
		color: #fefefe;
	}

	.lower-container {
		background: #dadcd3;
	}

	.logo-container {
		width: 100vw;
		height: calc((19 / 32) * 100vw);
		max-height: 853px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	svg {
		width: 43vw;
		height: auto;
		margin: auto;
	}

	path {
		fill: #ffffff;
	}

	.sticky-video {
		position: sticky;
		top: min(0px, calc(100vh - (700 / 934) * 100vw));
	}

	video {
		object-fit: cover;
		height: calc((19 / 32) * 100vw);
		width: 100vw;
	}

	p {
		color: #fefefe;
	}
</style>
