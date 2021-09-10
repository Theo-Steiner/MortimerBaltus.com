<script>
	import LazyComponent from '$lib/UX/LazyComponent.svelte';
	import { t } from 'svelte-intl-precompile';
	import WindowElement from '../UI/WindowElement.svelte';
</script>

<div class="grid-area">
	<WindowElement
		width={378}
		height={273}
		parallax="very-slow"
		background="#151515"
		title={$t('windows.clean-code')}
		id={10}
		enlargeable={false}
		isInForeground={true}
		intersections={[3]}
		distanceFromIntersection={{
			base: 13,
			large: 8
		}}
	>
		<LazyComponent
			exposesIntersecting
			componentImport={() => import('$lib/UI/WindowUI/CleanCodeUI.svelte')}
		>
			<ul lang="en">
				<li>
					&lt;<span class="highlight-yellow">@MORTIMERBALTUS</span>
					<span class="highlight-cyan">we_think</span>&gt;
				</li>
				<li>
					&lt;<span class="highlight-red">body</span>
					<span class="highlight-cyan">class</span>=<span class="highlight-yellow"
						>"clean_code &amp;&amp; pristine_design"</span
					>&gt;
				</li>
				<li class="indented">&lt;<span class="highlight-red">title</span>&gt;</li>
				<li class="twice-indented">Clean code and pristine design</li>
				<li class="twice-indented">should not be mutually exclusive.</li>
				<li class="indented">
					&lt;/<span class="highlight-red">title</span>&gt;
				</li>
				<li class="indented">&lt;<span class="highlight-red">code</span>&gt;</li>
				<li class="twice-indented">We bring to you expertise from both fields,</li>
				<li class="twice-indented">so now you no longer have to choose.</li>
				<li class="indented">&lt;/<span class="highlight-red">code</span>&gt;</li>
				<li>&lt;/<span class="highlight-red">body</span>&gt;</li>
			</ul>
		</LazyComponent>
	</WindowElement>
</div>

<style>
	div {
		grid-column: 50/81;
		grid-row: 40/62;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	li,
	span {
		color: #fefefe;
		font-family: 'Courier New', Courier, monospace;
		list-style: none;
		font-size: 13px;
		margin: 0px;
		line-height: 20px;
		letter-spacing: -0.2px;
		height: 20px;
		overflow: hidden;
		transition: 0.2s;
	}

	.highlight-yellow {
		animation: yellow 0.2s forwards;
	}

	@keyframes yellow {
		0% {
			color: #fefefe;
		}
		100% {
			color: #fcff52;
		}
	}

	.highlight-red {
		animation: red 0.2s forwards;
	}

	@keyframes red {
		0% {
			color: #fefefe;
		}
		100% {
			color: #e32636;
		}
	}

	.highlight-cyan {
		animation: cyan 0.2s forwards;
	}

	@keyframes cyan {
		0% {
			color: #fefefe;
		}
		100% {
			color: #60d9f1;
		}
	}

	ul {
		margin: 9px;
		padding: 0px;
	}

	.indented {
		margin-left: 15px;
	}

	.twice-indented {
		margin-left: 30px;
	}

	@media only screen and (min-width: 1440px) {
		div {
			grid-column: 51/77;
			grid-row: 41/60;
		}
	}
</style>
