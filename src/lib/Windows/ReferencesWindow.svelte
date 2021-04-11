<script>
	import WindowElement from '../UI/WindowElement.svelte';
</script>

<div class="grid-area">
	<WindowElement
		width={347}
		height={314}
		parallax="medium"
		background="#5F583D"
		title="References"
		enlargeable={false}
		id={4}
		isInForeground={true}
	>
		<ul>
			<li><a href="/">Bureau Johannes Erler</a></li>
			<li><a href="/">CarlNann</a></li>
			<li><a href="/">Con Corazón</a></li>
			<li>
				<a href="/">Düsseldorfer Schauspielhaus</a>
			</li>
			<li><a href="/">Eberhard Müller Consulting</a></li>
			<li><a href="/">Fargo</a></li>
			<li><a href="/">Konica Minolta</a></li>
			<li><a href="/">Morgenbladet</a></li>
			<li><a href="/">Otto Group</a></li>
			<li>
				<a href="/">Staatsschauspielhaus Dresden</a>
			</li>
			<li><a href="/">Steiner Am Fluss</a></li>
			<li><a href="/">Suhrkamp</a></li>
			<li><a href="/">Zoeva</a></li>
		</ul>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 162/190;
		grid-row: 116/142;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	a {
		color: #151515;
		font-size: 15px;
		margin: 0px;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline #a25c24;
	}

	ul {
		list-style-type: none;
		padding: 10px 0px 13px 11px;
		margin: 0;
	}
	li {
		padding-top: 1px;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 154/178;
			grid-row: 116/137;
		}
	}
</style>
