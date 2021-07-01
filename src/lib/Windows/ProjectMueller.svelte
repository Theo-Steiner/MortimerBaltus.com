<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import ImageLoader from '../UX/ImageLoader.svelte';

	const slug = 'MortimerBaltus/Projects/EberhardMueller_v2tpxi';
</script>

<div class="grid-area">
	<WindowElement
		width={465}
		height={497}
		parallax="very-fast"
		background={'#0c0c0b'}
		title="PROJECT_03"
		id={3}
		href={'/pages/project_03'}
		isInForeground={false}
		intersections={[10]}
		distanceFromIntersection={{
			base: -13,
			large: -8
		}}
	>
		<ImageLoader
			sizes="463px"
			srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto,q_auto:best/{slug} 463w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_291,f_auto,q_auto:best/{slug} 291w,"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug}"
			alt="Eberhard Müller develops sophisticated textile interiors at the highest level"
		/>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 68/106;
		grid-row: 28/68;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 69/101;
			grid-row: 30/64;
		}
	}
</style>
