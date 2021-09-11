<script>
	export let header;

	let isShowing = false;

	const handleSectionClick = () => {
		var selectedText = window.getSelection().toString();
		if (selectedText === '') {
			isShowing = !isShowing;
		}
	};
</script>

<section on:click={handleSectionClick} class:slide={isShowing}>
	<h2>{header}</h2>
	<div>
		<slot />
	</div>
</section>

<style>
	section {
		font-size: 16px;
		line-height: 1.18;
		letter-spacing: -0.28px;

		/* Slide effect properties */
		transition: color 600ms cubic-bezier(0.32, 0, 0.67, 0),
			background-color 600ms cubic-bezier(0.32, 0, 0.67, 0),
			max-height 600ms cubic-bezier(0.83, 0, 0.15, 1);
		overflow: hidden;
		height: auto;
		max-height: 54px;
	}

	:global(p) {
		color: inherit;
		padding: 5px 0 10px 0;
		font-size: inherit;
		line-height: inherit;
		letter-spacing: inherit;
		padding: none;
	}

	.slide {
		transition: color 300ms ease-in-out, background-color 300ms ease-in-out,
			max-height 600ms cubic-bezier(0.83, 0, 0.15, 1);
		max-height: 200vh;
		background-color: #151515;
		color: #fefefe;
	}

	@media (hover: hover) {
		section:hover {
			transition: color 600ms cubic-bezier(0.32, 0, 0.67, 0),
				background-color 400ms cubic-bezier(0.32, 0, 0.67, 0),
				max-height 400ms cubic-bezier(0.83, 0, 0.15, 1);
			background-color: #151515;
			color: #fefefe;
		}
	}

	h2 {
		padding: 15px 10px;
		letter-spacing: -0.55px;
		font-size: 18px;
		line-height: 24px;
		white-space: nowrap;
	}

	div {
		padding: 0px 10px 20px 10px;
	}

	@media only screen and (min-device-width: 768px) {
		section {
			max-height: 92px;
			font-size: 22px;
		}

		div {
			padding: 0px 20px 50px 20px;
		}

		h2 {
			font-size: 24px;
			line-height: 52px;
			padding: 20px;
		}
	}
</style>
