<script>
	import { createEventDispatcher } from 'svelte';

	export let buttonType;
	export let href = null;

	const dispatch = createEventDispatcher();
</script>

{#if buttonType === 'subpage'}
	<a class={buttonType} {href}>
		<span>Go to the subpage for this window</span>
		<svg version="1.1" viewBox="0 0 54 15" xmlns="http://www.w3.org/2000/svg">
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
			dispatch('toggleMinimize');
		}}
	>
		<span>Shrink this window</span>
		<svg version="1.1" viewBox="0 0 54 15" xmlns="http://www.w3.org/2000/svg">
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
	<a class={buttonType} {href}>
		<span>Go to the next subpage!</span>
		<svg version="1.1" viewBox="0 0 54 15" xmlns="http://www.w3.org/2000/svg">
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
	<a class={buttonType} {href}>
		<span>Go home, or to the previous subpage!</span>
		<svg width="54" height="15" viewBox="0 0 54 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
		box-shadow: 0 0 0 1px #a25c24;
		outline: none;
	}

	span {
		overflow: hidden;
		height: 1px;
		width: 1px;
		position: absolute;
	}

	svg {
		outline: none;
		width: 100%;
		height: 100%;
	}

	svg rect,
	svg polygon {
		transition: 300ms ease-in-out;
	}

	svg:hover #box {
		fill: #fefefe;
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
</style>
