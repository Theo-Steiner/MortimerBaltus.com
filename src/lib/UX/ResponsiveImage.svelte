<script>
	export let imageID;
	export let alt;
	export let imageWidth;
	export let imageHeight;
	export let displayWidth = '100vw';
	export let displayHeight = 'auto';
	export let limitHeight = true;
	export let aspectRatio = limitHeight ? '32/19' : 'initial';
	export let objectFit = 'cover';
	export let objectPosition = 'center bottom';
	const slug = 'https://res.cloudinary.com/thdrstnr/image/upload/q_auto:best';

	$: srcset = `${slug}/MortimerBaltus/${imageID} ${imageWidth}w, ${slug},w_1600/MortimerBaltus/${imageID} 1600w, ${slug},w_1366/MortimerBaltus/${imageID} 1366w, ${slug},w_1024/MortimerBaltus/${imageID} 1024w, ${slug},w_768/MortimerBaltus/${imageID} 768w, ${slug},w_640/MortimerBaltus/${imageID} 640w, ${slug},w_320/MortimerBaltus/${imageID} 320w, ${slug},w_160/MortimerBaltus/${imageID} 160w`;
</script>

<img
	src={`${slug}/MortimerBaltus/${imageID}`}
	width={imageWidth}
	height={imageHeight}
	sizes={displayWidth}
	{srcset}
	{alt}
	style="--displayWidth: {displayWidth}; aspect-ratio: {aspectRatio}; --displayHeight: {displayHeight}; --objectFit: {objectFit}; --objectPosition: {objectPosition};"
/>

<style>
	img {
		width: var(--displayWidth);
		height: var(--displayHeight);
		object-fit: var(--objectFit);
		object-position: var(--objectPosition);
		display: block;
	}

	@media (orientation: portrait) {
		img {
			height: auto;
		}
	}
</style>
