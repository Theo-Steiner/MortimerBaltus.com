<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
</script>

<div class="grid-area">
	<WindowElement
		width={376}
		height={408}
		parallax="medium"
		background="#151515"
		title={$t('windows.references')}
		enlargeable={false}
		id={4}
		isInForeground={true}
	>
		<div class="pause-animation">
			<ul lang="en" style="--th: 390px;">
				<li>Bureau Johannes Erler</li>
				<li>CarlNann</li>
				<li>Con Corazón</li>
				<li>Düsseldorfer Schauspielhaus</li>
				<li>Eberhard Müller Consulting</li>
				<li>Fargo</li>
				<li>Konica Minolta</li>
				<li>Morgenbladet</li>
				<li>Otto Group</li>
				<li>Staatsschauspielhaus Dresden</li>
				<li>Steiner Am Fluss</li>
				<li>Suhrkamp</li>
				<li>Zoeva</li>
			</ul>
		</div>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 162/190;
		grid-row: 116/142;
		display: flex;
		justify-content: center;
	}

	li {
		vertical-align: middle;
		text-align: center;
		padding: 6px 0;
		color: #fefefe;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: -0.17px;
		text-transform: uppercase;
		text-decoration: none;
	}

	ul {
		list-style-type: none;
		margin: 0px;
		text-shadow: 0 var(--th) #fefefe, 0 calc(var(--th) * 2) #fefefe, 0 calc(var(--th) * 3) #fefefe,
			0 calc(var(--th) * 4) #fefefe;
		will-change: transform;
		animation: marquee 10s linear infinite;
		animation-play-state: running;
	}

	.pause-animation:hover ul {
		animation-play-state: paused;
	}

	@keyframes marquee {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 154/178;
			grid-row: 116/137;
		}
	}
</style>
