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
		font-size: 22px;
		line-height: 26px;
		letter-spacing: -0.55px;

		/* Slide effect properties */
		transition: all 400ms ease-in-out;
		overflow: hidden;
		height: auto;
		max-height: 56px;
	}

	.slide {
		max-height: 200vh;
		background-color: #151515;
		color: #fefefe;
	}

	@media (hover: hover) {
		section:hover {
			background-color: #151515;
			color: #fefefe;
		}
	}

	h2 {
		font-size: 24px;
		padding: 15px 10px 15px 10px;
	}

	div {
		padding: 5px 10px 20px 10px;
	}

	@media only screen and (min-device-width: 768px) {
		section {
			max-height: 92px;
		}

		div {
			padding: 0px 20px 50px 20px;
		}

		h2 {
			line-height: 52px;
			padding: 20px 20px 20px 20px;
		}
	}
</style>
