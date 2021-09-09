<script>
	import { createEventDispatcher } from 'svelte';
	import { horizontalSlide } from '$lib/UX/css_utils';

	export let buttonType;
	export let href = '/';

	const dispatch = createEventDispatcher();
</script>

{#if buttonType === 'subpage'}
	<a
		aria-label="Go to the subpage for this window"
		on:click={() => dispatch('enlarge')}
		sveltekit:prefetch
		class={buttonType}
		{href}
	>
		<svg aria-hidden="true" version="1.1" viewBox="0 0 54 15" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" fill-rule="evenodd">
				<rect
					id="box"
					x=".5"
					y=".5"
					width="53"
					height="14"
					rx="3"
					fill="#151515"
					stroke="#FEFEFE"
				/>
				<g id="upper">
					<rect x="12" y="6" width="20" height="1" fill="#FEFEFE" />
					<polygon points="42 7 32 4 32 7" fill="#FEFEFE" />
				</g>
				<g id="lower">
					<rect x="22" y="8" width="20" height="1" fill="#FEFEFE" />
					<polygon points="12 8 22 8 22 11" fill="#FEFEFE" />
				</g>
			</g>
		</svg>
	</a>
{:else if buttonType === 'minimize'}
	<button
		class={buttonType}
		on:click={() => {
			dispatch('toggle-minimize');
		}}
		aria-label="Shrink this window"
	>
		<svg aria-hidden="true" version="1.1" viewBox="0 0 54 15" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" fill-rule="evenodd">
				<rect
					id="box"
					x=".5"
					y=".5"
					width="53"
					height="14"
					rx="3"
					fill="#151515"
					stroke="#FEFEFE"
				/>
				<rect id="upper" x="17" y="5" width="20" height="1" fill="#FEFEFE" />
				<rect id="lower" x="17" y="9" width="20" height="1" fill="#FEFEFE" />
			</g>
		</svg>
	</button>
{:else if buttonType === 'next'}
	<a on:click aria-label="Go to the next subpage!" class={buttonType} {href}>
		<svg aria-hidden="true" version="1.1" viewBox="0 0 54 15" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" fill-rule="evenodd">
				<rect
					id="box"
					x=".5"
					y=".5"
					width="53"
					height="14"
					rx="3"
					fill="#151515"
					stroke="#FEFEFE"
				/>
				<g id="arrow">
					<rect x="12" y="7" width="20" height="1" fill="#FEFEFE" />
					<polygon points="42 8 32 5 32 8" fill="#FEFEFE" />
				</g>
			</g>
		</svg>
	</a>
{:else if buttonType === 'previous'}
	<a on:click aria-label="Go the previous page!" class={buttonType} {href}>
		<svg
			aria-hidden="true"
			width="54"
			height="15"
			viewBox="0 0 54 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				id="box"
				x="0.5"
				y="0.5"
				width="53"
				height="14"
				rx="2.5"
				fill="#151515"
				stroke="#FEFEFE"
			/>
			<g id="arrow">
				<rect x="22" y="7" width="20" height="1" fill="#FEFEFE" />
				<polygon points="12 7 22 7 22 10" fill="#FEFEFE" />
			</g>
		</svg>
	</a>
{:else if buttonType === 'home'}
	<a transition:horizontalSlide={{ delay: 200 }} aria-label="Go home!" class={buttonType} href="/">
		<svg
			aria-hidden="true"
			width="18"
			height="14"
			viewBox="0 0 18 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M15 7V14H11V10H7V14H3V7H0L9 0L18 7H15Z" fill="#FEFEFE" />
		</svg>
	</a>
{:else}
	<button class={buttonType} />
{/if}

<style>
	.hidden {
		visibility: hidden;
	}

	a,
	button {
		width: 54px;
		height: 15px;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		border-radius: 6px;
		padding: 0;
		margin: 8px;
	}
	a:focus,
	button:focus {
		outline: none;
	}

	svg {
		outline: none;
		width: 100%;
		height: 100%;
	}

	svg rect,
	svg polygon,
	svg path {
		transition: 300ms ease-in-out;
	}

	.home {
		width: 32px;
		height: 31px;
		border-radius: 4px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: #fefefe solid 1px;
		margin: 0px;
		transition: background-color 300ms ease-in-out;
	}

	.home svg {
		width: 18px;
		height: 14px;
		margin: 9px 6px 10px 8px;
	}

	svg:active #box {
		fill: #fefefe;
	}

	.home:active {
		background-color: #fefefe;
	}

	.home:active svg path {
		fill: #151515;
	}

	.minimize:active #upper {
		fill: #151515;
		transform: translate(0px, 2px);
	}

	.minimize:active #lower {
		fill: #151515;
		transform: translate(0px, -2px);
	}

	.subpage:active #upper rect,
	.subpage:active #upper polygon {
		fill: #151515;
		transform: translate(5px, 0);
	}

	.subpage:active #lower rect,
	.subpage:active #lower polygon {
		fill: #151515;
		transform: translate(-5px, 0);
	}

	.next:active #arrow polygon {
		fill: #151515;
		transform: translate(5px, 0);
	}

	.next:active #arrow rect {
		fill: #151515;
		width: 31px;
		transform: translate(-5px, 0);
	}

	.previous:active #arrow rect {
		fill: #151515;
		transform: translate(-5px, 0);
		width: 31px;
	}

	.previous:active #arrow polygon {
		fill: #151515;
		transform: translate(-5px, 0);
	}

	@media (hover: hover) {
		svg:hover #box {
			fill: #fefefe;
		}

		.home:hover {
			background-color: #fefefe;
		}

		.home:hover svg path {
			fill: #151515;
		}

		.minimize:hover #upper {
			fill: #151515;
			transform: translate(0px, 2px);
		}

		.minimize:hover #lower {
			fill: #151515;
			transform: translate(0px, -2px);
		}

		.subpage:hover #upper rect,
		.subpage:hover #upper polygon {
			fill: #151515;
			transform: translate(5px, 0);
		}

		.subpage:hover #lower rect,
		.subpage:hover #lower polygon {
			fill: #151515;
			transform: translate(-5px, 0);
		}

		.next:hover #arrow polygon {
			fill: #151515;
			transform: translate(5px, 0);
		}

		.next:hover #arrow rect {
			fill: #151515;
			width: 31px;
			transform: translate(-5px, 0);
		}

		.previous:hover #arrow rect {
			fill: #151515;
			transform: translate(-5px, 0);
			width: 31px;
		}

		.previous:hover #arrow polygon {
			fill: #151515;
			transform: translate(-5px, 0);
		}
	}
</style>
