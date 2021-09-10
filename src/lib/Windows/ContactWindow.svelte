<script>
	import WindowElement from '../UI/WindowElement.svelte';
	import { t } from 'svelte-intl-precompile';
	import LazyComponent from '$lib/UX/LazyComponent.svelte';

	const moritzmoji =
		'https://res.cloudinary.com/thdrstnr/image/upload/w_108,q_auto:best/v1630485048/MortimerBaltus/misc/moritzmemoji_cjyrwj';
	const theomoji =
		'https://res.cloudinary.com/thdrstnr/image/upload/w_108,q_auto:best/v1630485048/MortimerBaltus/misc/theomemoji_ipo7or';
</script>

<div class="wrapper grid-area">
	<WindowElement
		width={378}
		height={315}
		parallax="very-slow"
		background="#EFEFEF"
		title={$t('windows.contact.title')}
		id={14}
		enlargeable={false}
	>
		<LazyComponent componentImport={() => import('$lib/UI/WindowUI/ContactUI.svelte')}>
			<div class="contact-container">
				<div class="fixed">
					<h1 lang="en">
						GET IN <br />TOUCH
					</h1>
					<hr />
					<button class="contact">
						<img src={moritzmoji} alt="Moritz Mortimer Müller as a Memoji" draggable="false" />
						<p>Moritz Mortimer (DE)</p>
					</button>
					<hr />
					<button class="contact">
						<img src={theomoji} alt="Theodor Baltus Steiner as a Memoji" draggable="false" />
						<p>Theodor Baltus (JP)</p>
					</button>
				</div>
			</div>
		</LazyComponent>
	</WindowElement>
</div>

<style>
	.wrapper {
		grid-column: 11/42;
		grid-row: 11/37;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.contact-container {
		height: 279px;
		width: 376px;
		padding: 2px;
	}

	.contact {
		width: 376px;
		height: 76px;
		padding-left: 10px;
		display: flex;
		align-items: center;
		border: none;
		background-color: #efefef;
	}

	img {
		border-radius: 50%;
		padding: 0;
		margin: 0;
		height: 54px;
		width: 54px;
	}

	h1 {
		font-size: 54px;
		line-height: 0.97;
		letter-spacing: 0.45px;
		user-select: none;
		color: #151515;
		padding: 10px 0 4px 14px;
	}

	p {
		color: #151515;
		font-size: 20px;
		margin: 0px;
		padding: 10px;
	}

	@media (hover: hover) {
		.contact:hover {
			background-color: #ffffff;
		}
	}
</style>
