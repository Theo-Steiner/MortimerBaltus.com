<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<div class="wrapper grid-area">
	<WindowElement
		width={378}
		height={392}
		parallax="very-slow"
		background="#A25C24"
		title={$t('windows.about')}
		href="pages/about"
		id={0}
		isInForeground={true}
		intersections={[1]}
		distanceFromIntersection={{
			base: -13,
			large: -12
		}}
	>
		<div class="container">
			<p lang="en" style="--animation-order: 0; --left-offset: 110">NICE</p>
			<p lang="en" style="--animation-order: 1; --left-offset: 208">TO</p>
			<p lang="en" style="--animation-order: 2; --left-offset: 62">MEET</p>
			<p lang="en" style="--animation-order: 3; --left-offset: 136">YOU</p>
		</div>
	</WindowElement>
</div>

<style>
	.wrapper {
		grid-column: 116/147;
		grid-row: 100/132;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.container {
		padding-top: 15px;
		padding-left: 10px;
	}

	p {
		color: #151515;
		font-size: 100px;
		line-height: 85.5px;
		letter-spacing: 1.72px;
		padding: 0;
		margin: 0px;
		animation: shuffle 16s cubic-bezier(0.83, 0, 0.15, 1) calc(var(--animation-order) * 200ms)
			infinite;
	}

	@keyframes shuffle {
		0% {
			transform: translateX(0);
		}
		5% {
			transform: translateX(calc(var(--left-offset) * 1px));
		}
		10% {
			transform: translateX(calc(var(--left-offset) * 1px));
		}
		20% {
			transform: translateX(0);
		}
		35% {
			transform: translateX(0);
		}
		40% {
			transform: translateX(calc(var(--left-offset) * 1px));
		}
		65% {
			transform: translateX(calc(var(--left-offset) * 1px));
		}
		70% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(0);
		}
	}

	@media (hover: hover) {
		p {
			animation: none;
			transition: 0.8s cubic-bezier(0.83, 0, 0.15, 1);
			transition-delay: calc(var(--animation-order) * 200ms);
		}
		.container:hover p {
			transform: translateX(calc(var(--left-offset) * 1px));
		}
	}

	@media only screen and (min-width: 1440px) {
		.wrapper {
			grid-column: 117/143;
			grid-row: 102/129;
		}
	}
</style>
