<script>
	let firstSlugs = ['lb_1_eqzusi', 'lb_2_yj4vra', 'lb_3_aock9x', 'lb_4_fwhvp8', 'lb_5_i125mh'];
	let secondSlugs = ['lb_6_wcbqci', 'lb_7_bglfzt', 'lb_8_oz165j', 'lb_9_rsweey', 'lb_10_nlwpss'];
</script>

<div class="wrapper">
	<div class="marquee marquee-one">
		{#each firstSlugs as slug}
			<img
				sizes="283px"
				srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_283,f_auto/MortimerBaltus/Projects/lookbook/{slug} 283w"
				alt="Produkt.jp Lookbook"
				src="https://res.cloudinary.com/thdrstnr/image/upload/w_283,f_auto/MortimerBaltus/Projects/lookbook/{slug}"
				loading="lazy"
			/>
		{/each}
	</div>
	<div class="marquee marquee-two">
		{#each secondSlugs as slug}
			<img
				sizes="283px"
				srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_283,f_auto/MortimerBaltus/Projects/lookbook/{slug} 283w"
				alt="Produkt.jp Lookbook"
				src="https://res.cloudinary.com/thdrstnr/image/upload/w_283,f_auto/MortimerBaltus/Projects/lookbook/{slug}"
				loading="lazy"
			/>
		{/each}
	</div>
	<div class="marquee marquee-three">
		{#each firstSlugs.slice(0, 2) as slug}
			<img
				sizes="283px"
				srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_283,f_auto/MortimerBaltus/Projects/lookbook/{slug} 283w"
				alt="Produkt.jp Lookbook"
				src="https://res.cloudinary.com/thdrstnr/image/upload/w_283,f_auto/MortimerBaltus/Projects/lookbook/{slug}"
				loading="lazy"
			/>
		{/each}
	</div>
</div>

<style>
	img {
		object-fit: fill;
	}

	.wrapper {
		display: flex;
		position: relative;
	}

	.marquee {
		display: flex;
		top: 0;
		position: absolute;
		animation: marquee 30s linear infinite;
		animation-play-state: running;
	}

	.marquee-one {
		left: 0;
	}

	.marquee-two {
		left: 1415px;
	}

	.marquee-three {
		left: 2830;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-2830px);
		}
	}
</style>
