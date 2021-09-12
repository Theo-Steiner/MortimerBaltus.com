<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<div class="grid-area">
	<WindowElement
		width={300}
		height={164}
		parallax="very-slow"
		background="#5E4B1B"
		title={$t('windows.cookies.title')}
		enlargeable={false}
		id={9}
		isInForeground={true}
	>
		<p>
			{$t('windows.cookies.text')}
		</p>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 58/82;
		grid-row: 105/119;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	p {
		white-space: pre-line;
		color: #151515;
		font-size: 16px;
		line-height: 18.5px;
		letter-spacing: -0.17px;
		margin: 0px;
		padding: 6px;
	}

	p:lang(ja) {
		font-size: 16px;
		line-height: 145%;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 60/81;
			grid-row: 105/116;
		}
	}
</style>
