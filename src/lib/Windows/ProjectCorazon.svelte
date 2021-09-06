<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import ImageLoader from '../UX/ImageLoader.svelte';
	import { t } from 'svelte-intl-precompile';

	const slug = 'MortimerBaltus/Projects/ConCorazon_mksjj0';
</script>

<div class="grid-area">
	<WindowElement
		width={465}
		height={616}
		parallax="very-fast"
		background={`url("https://res.cloudinary.com/thdrstnr/image/upload/c_pad,w_iw_div_2,ar_1,b_auto:predominant/c_crop,w_5,g_north_west/${slug}")`}
		title={$t('windows.project_01')}
		id={1}
		isInForeground={false}
		href={'/pages/project_01'}
		intersections={[0]}
		distanceFromIntersection={{
			base: 13,
			large: 12
		}}
	>
		<ImageLoader
			sizes="463px"
			src="https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto,q_auto:best/{slug}"
			alt="Con Corazón is embracing artisans from countries at war"
		/>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 91/129;
		grid-row: 116/166;
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 91/129;
			grid-row: 117/159;
		}
	}
</style>
