<script>
	import WindowElement from '../UI/WindowElement.svelte';

	let show = 'html';
	let colors = { cyan: '#60d9f1', red: '#e32636', yellow: '#fcff52' };

	function matrix(node, params) {
		const randomChars =
			'<>/(){}ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890アイウエオカキクケコタチツテトサシスセソマミムメモなにぬねのはわを';
		const text = node.textContent.trim();
		const html = node.innerHTML.trim();
		let lastTime = 0;
		return {
			duration: 3000,
			...params,
			tick(t) {
				if (t === 1) {
					node.innerHTML = html;
					return;
				}

				const time = Date.now();
				if (time - lastTime < 32) return;
				lastTime = time;

				let str = '';
				for (let i = 0; i < text.length; i++) {
					const progress = i / text.length;
					if (text[i] === ' ' || progress < t * 0.9) {
						str += text[i];
					} else if (progress < t * 1.5) {
						str += randomChars[Math.floor(Math.random() * randomChars.length)];
					} else if (progress < t * 2) {
						str += '_';
					} else {
						str += ' ';
					}
				}
				node.textContent = str;
			}
		};
	}
	function startTimer(node, string) {
		setTimeout(() => {
			show = string;
		}, 10000);
	}
</script>

<div class="grid-area">
	<WindowElement
		width={378}
		height={273}
		parallax="very-slow"
		background="#151515"
		title="CLEAN.CODE"
		id={10}
		isInForeground={true}
		intersections={[3]}
		distanceFromIntersection={{
			base: 13,
			large: 8
		}}
	>
		<ul>
			{#if show === 'html'}
				<li
					use:startTimer={'transition'}
					on:outroend={() => {
						show = 'css';
					}}
					transition:matrix
				>
					&lt;<span class="highlight-yellow">@MORTIMERBALTUS</span>
					<span class="highlight-cyan">we_think</span>&gt;
				</li>
				<li transition:matrix>
					&lt;<span class="highlight-red">body</span>
					<span class="highlight-cyan">class</span>=<span class="highlight-yellow"
						>"clean_code &amp;&amp; pristine_design"</span
					>&gt;
				</li>
				<li transition:matrix class="indented">&lt;<span class="highlight-red">title</span>&gt;</li>
				<li transition:matrix class="twice-indented">Clean code and pristine design</li>
				<li transition:matrix class="twice-indented">should not be mutually exclusive.</li>
				<li transition:matrix class="indented">
					&lt;/<span class="highlight-red">title</span>&gt;
				</li>
				<li transition:matrix class="indented">&lt;<span class="highlight-red">code</span>&gt;</li>
				<li transition:matrix class="twice-indented">
					We bring to you expertise from both fields,
				</li>
				<li transition:matrix class="twice-indented">so now you no longer have to choose.</li>
				<li transition:matrix class="indented">&lt;/<span class="highlight-red">code</span>&gt;</li>
				<li transition:matrix>&lt;/<span class="highlight-red">body</span>&gt;</li>
			{:else if show === 'css'}
				<li use:startTimer={'transition'} transition:matrix on:outroend={() => (show = 'js')}>
					&lt;<span class="highlight-red">style</span>&gt;
				</li>
				<li transition:matrix class="indented">
					<span class="highlight-yellow">.pristine-design</span> &#123;
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-cyan">generic-templates</span>: none;
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-cyan">instead</span>: hand-crafted-designs;
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-cyan">typography</span>: on-fleek;
				</li>
				<li transition:matrix class="indented">&#125;</li>
				<li transition:matrix class="indented">
					<span class="highlight-yellow">.clean-code</span> &#123;
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-cyan">maintainable-code</span>: our-priority;
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-cyan">implementations</span>: state-of-the-art;
				</li>
				<li transition:matrix class="indented">&#125;</li>
				<li transition:matrix>&lt;/<span class="highlight-red">style</span>&gt;</li>
			{:else if show === 'js'}
				<li use:startTimer={'transition'} transition:matrix on:outroend={() => (show = 'html')}>
					&lt;<span class="highlight-red">script</span>&gt;
				</li>
				<li transition:matrix class="indented">
					<span class="highlight-yellow">const</span>
					<span class="highlight-cyan">technologyStack</span> &#123;
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-red">builtOn</span>: "Cloud-infrastructure and CDNs",
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-red">this.provides</span>: "Performance and reliability",
				</li>
				<li transition:matrix class="twice-indented">
					<span class="highlight-red">this.allowsFor</span>: scalability&amp;&amp;globalDeployment
				</li>
				<li transition:matrix class="indented">&#125;</li>
				<li transition:matrix class="indented">
					<span class="highlight-yellow">for</span> each (<span class="highlight-yellow">const</span
					> <span class="highlight-cyan">requirement</span> <span class="highlight-yellow">of</span>
					<span class="highlight-cyan">client</span>) &#123;
				</li>
				<li transition:matrix class="twice-indented">solutions.find(() =&gt; ideal == solution)</li>
				<li transition:matrix class="indented">&#125;</li>
				<li transition:matrix class="indented">
					<span class="highlight-yellow">return</span>
					<span class="highlight-cyan">comprehensiveConsulting</span>
				</li>
				<li transition:matrix>&lt;/<span class="highlight-red">script</span>&gt;</li>
			{/if}
		</ul>
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
		font-family: monospace;
		list-style: none;
		font-size: 14px;
		margin: 0px;
		line-height: 20px;
		letter-spacing: 0.4px;
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
