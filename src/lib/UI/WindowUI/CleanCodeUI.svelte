<script>
	export let intersecting = false;

	let hovered = false;
	let show = 'html';

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

	let lastCall;

	function showNext(nextState) {
		if (intersecting && !hovered) {
			show = nextState;
		} else {
			lastCall = nextState;
		}
	}

	function startTimer(_, nextState) {
		if (intersecting && !hovered) {
			if (!lastCall) {
				setTimeout(() => {
					showNext(nextState);
				}, 10000);
			} else {
				show = nextState;
			}
		} else {
			lastCall = nextState;
		}
	}

	function restart() {
		startTimer(undefined, lastCall);
	}

	$: if (intersecting && !hovered && lastCall) {
		restart();
		lastCall = undefined;
	}
</script>

<ul on:mouseenter={() => (hovered = true)} on:mouseleave={() => (hovered = false)} lang="en">
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
		<li transition:matrix class="twice-indented">We bring to you expertise from both fields,</li>
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
			<span class="highlight-red">builtOn</span>: 'Cloud-Infrastructure',
		</li>
		<li transition:matrix class="twice-indented">
			<span class="highlight-red">this.enables</span>: ['Performance', 'Reliability'],
		</li>
		<li transition:matrix class="twice-indented">
			<span class="highlight-red">this.scalability</span>: globalDeployment
		</li>
		<li transition:matrix class="indented">&#125;</li>
		<li transition:matrix class="indented">
			<span class="highlight-yellow">for</span> each (<span class="highlight-yellow">const</span>
			<span class="highlight-cyan">requirement</span> <span class="highlight-yellow">of</span>
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

<style>
	li,
	span {
		color: #fefefe;
		font-family: 'Courier New', Courier, monospace;
		list-style: none;
		font-size: 13px;
		font-weight: 600;
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
		margin-top: 8px;
		margin-left: 8px;
		padding: 0px;
	}

	.indented {
		margin-left: 10px;
	}

	.twice-indented {
		margin-left: 20px;
	}
</style>
