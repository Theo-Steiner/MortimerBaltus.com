<script>
	import { slide } from 'svelte/transition';
	import FooterContactWindow from '$lib/Windows/FooterWindows/FooterContactWindow.svelte';
	import FooterLanguageWindow from '$lib/Windows/FooterWindows/FooterLanguageWindow.svelte';

	let display = 'overview';

	function toggleContactWindow() {
		display = display === 'contact' ? 'overview' : 'contact';
	}

	function toggleLanguageWindow() {
		display = display === 'language' ? 'overview' : 'language';
	}
</script>

<footer>
	{#if display === 'contact'}
		<div class="overlay" transition:slide>
			<FooterContactWindow on:toggleMinimize={toggleContactWindow} />
		</div>
	{:else if display === 'language'}
		<div style="transform: translateZ(0px) scale(1);" class="overlay" transition:slide>
			<FooterLanguageWindow on:toggleMinimize={toggleLanguageWindow} />
		</div>
	{/if}

	<nav>
		<button on:click={toggleContactWindow}>GET IN TOUCH</button>
		<button on:click={toggleLanguageWindow}>LANGUAGE</button>
		<a href="/">INSTAGRAM</a>
		<a href="/">PRIVACY POLICY</a>
		<a href="/">LEGAL NOTICE</a>
		<a href="/">SITEMAP</a>
	</nav>

	<svg width="462" height="50" viewBox="0 0 462 50" xmlns="http://www.w3.org/2000/svg">
		<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<path fill="none" d="M0 0h768v300H0z" />
			<g id="Mortimer" style="--animation-order: 0;" class="intro-animation">
				<path
					id="Path"
					fill="#FEFEFE"
					d="M47.85 48.545V4.23L33.63333 48.545H21.845L7.62833 4.23v44.315H0V0h14.21667L27.74 42.65 41.26333 0H55.48v48.545h-7.62833zM61.02167 32.11c0-9.91667 7.14333-17.13167 16.92166-17.13167C88 14.97833 94.865 22.33 94.865 32.11c0 9.91667-7.14333 17.12833-16.92167 17.12833-9.985 0-16.92166-7.42-16.92166-17.12833z"
				/>
				<path
					d="M87.58333 32.11c0-5.75667-3.53666-10.54333-9.64-10.54333-6.03333 0-9.63833 4.78666-9.63833 10.54333 0 5.68667 3.675 10.54 9.63833 10.54 6.03334 0 9.64-4.785 9.64-10.54z"
					id="Path"
					fill="#151515"
				/>
				<path
					d="M117.08833 15.67167H125.13V5.2h7.28333v10.47167h9.70834v6.24166h-9.70834V48.545H125.13V21.91333h-9.66333c-5.005 0-8.02 2.24334-8.02 5.48V48.545h-7.28V15.67167H107.45V21.15c1.31667-3.605 5.005-5.47833 9.64-5.47833M145.93167 2.08h7.975v7.975h-7.975zM153.56 15.67167V48.545h-7.28333V15.67167zM168.675 15.67167v4.64666c1.73333-3.745 4.64667-5.34 8.67-5.34 4.50833 0 7.49 2.56667 8.66667 6.86667 1.52666-4.23167 4.78666-6.86667 9.36333-6.86667 6.935 0 10.05667 4.855 10.05667 11.375V48.545h-7.28334V27.94833c0-3.53833-1.73333-6.45-5.54666-6.45-3.745 0-5.55 2.98334-5.55 6.45V48.545h-7.28V27.94833c0-3.53833-1.73334-6.45-5.55-6.45-4.16 0-5.54667 3.53667-5.54667 7.14334V48.545h-7.28167V15.67167h7.28334-.00167zM236.21667 36.06333l6.24166 2.42667c-2.42833 7.07333-7.7 10.74833-15.18833 10.74833-10.54167 0-17.06167-7.21166-17.06167-17.33666 0-9.57167 6.38-16.92334 16.02167-16.92334 8.94667 0 14.84167 5.68667 14.84167 14.49667 0 1.31667-.14 2.565-.34667 3.81333h-23.23333c0 5.825 4.02166 9.70834 9.84833 9.70834 4.57667 0 7.905-2.42667 8.87667-6.93334z"
					id="Path"
					fill="#FEFEFE"
				/>
				<path
					d="M217.49 28.435h16.3l.06667-.625c0-4.51-3.535-6.59-7.695-6.59-4.51 0-7.97667 2.705-8.67167 7.215z"
					id="Path"
					fill="#151515"
				/>
				<path
					d="M254.52 15.67167v4.785c1.31667-3.605 4.16167-5.47834 7.975-5.47834 5.41 0 9.5 3.81667 9.5 9.29334 0 1.45666-.13833 2.845-.485 4.16333h-7.21167a12.545 12.545 0 00.27667-2.775c0-2.775-2.21833-4.44-4.85333-4.44-3.33 0-5.20167 2.28833-5.20167 5.48v21.845h-7.28333V15.67167H254.52z"
					id="Path"
					fill="#FEFEFE"
				/>
			</g>
			<g transform="translate(278.3)">
				<path
					d="M0 0h22.88667C30.515 0 38.49 4.43833 38.49 12.82833c0 5.20167-2.98333 8.73834-7.62833 10.75 5.895 1.45667 9.36166 5.68834 9.36166 11.79 0 8.6-8.25166 13.17667-15.95 13.17667H0V0z"
					id="Path"
					fill="#FEFEFE"
				/>
				<path
					d="M22.53833 20.11c4.44 0 8.32334-1.595 8.32334-6.58667 0-4.64666-4.36834-6.24166-8.32334-6.24166h-14.91V20.11h14.91zM23.92667 41.26333c4.23 0 8.32166-2.21833 8.32166-6.935 0-4.64666-4.02166-7.28333-8.32166-7.28333H7.62833v14.21667h16.29834v.00166z"
					id="Path"
					fill="#151515"
				/>
				<path
					d="M45.21 39.18333c0-7.55833 5.68667-10.54166 12.55333-10.54166 2.01 0 3.95167.20833 5.825.69333l3.46667.83333V27.74c0-4.50833-3.32833-6.86667-7.62833-6.86667-4.16 0-7.28167 2.35834-7.975 6.52L44.86333 25.66C46.53 18.44667 52.285 14.97833 59.42667 14.97833c8.6 0 14.565 4.02334 14.565 13.10834V48.545H67.055v-5.55c-1.87167 4.58-6.38 6.24333-11.02667 6.24333-5.825 0-10.81833-4.09166-10.81833-10.055z"
					id="Path"
					fill="#FEFEFE"
				/>
				<path
					d="M67.055 36.06333v-.34666l-2.63333-.695c-2.36-.62334-4.16167-.90167-5.48-.90167-2.91334 0-6.10334.9-6.10334 4.37 0 1.31667.48667 2.35833 1.52667 3.19.97.9 2.49667 1.31667 4.57667 1.31667 4.36833 0 8.11333-2.21834 8.11333-6.93334z"
					id="Path"
					fill="#151515"
				/>
				<path
					id="Path"
					fill="#FEFEFE"
					d="M80.99 0h7.28333v48.545H80.99zM99.64 21.91333h-6.58833v-6.24166H99.64V5.2h7.28333v10.47167h9.70834v6.24166h-9.70834V48.545H99.64zM149.43333 15.67167V48.545H142.15v-5.2c-2.35833 3.95-5.75667 5.89333-10.195 5.89333-7.83333 0-11.99667-4.785-11.99667-12.48333V15.67333h7.28334v19.35c0 4.3 1.80166 7.975 6.58666 7.975 5.755 0 8.32167-4.85333 8.32167-10.055V15.67167h7.28333zM154.005 40.22333l5.89333-3.12c1.80334 4.09167 4.64667 5.89334 9.155 5.89334 2.35834 0 6.17167-.76167 6.17167-3.81334 0-1.45666-.555-2.635-1.66333-3.4-1.11-.76166-3.26-1.385-6.45-1.87-5.47834-.90166-11.30334-3.12166-11.30334-9.64166 0-6.38 6.795-9.29334 12.27334-9.29334 5.48 0 9.71 2.01167 12.06666 7.14334l-5.54666 3.05166c-.97167-2.91333-3.12167-4.37-6.45-4.37-2.08 0-5.75667.90167-5.75667 3.60667 0 1.25.625 2.15 1.80333 2.70667 1.18.62333 3.4 1.11 6.52 1.595 6.10167.9 11.44334 3.05 11.44334 10.125 0 7.14333-7.145 10.40166-13.38667 10.40166-6.51667 0-12.27333-2.70333-14.77-9.01666v.00166z"
				/>
			</g>
		</g>
	</svg>
</footer>

<style>
	.overlay {
		background-color: transparent;
		position: absolute;
		top: -200px;
		z-index: 9999;
		display: flex;
		width: 100vw;
		justify-content: center;
		height: 315px;
		pointer-events: none;
		overflow: hidden;
	}

	footer {
		position: relative;
		width: 100vw;
		height: 300px;
		background-color: #151515;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow: visible;
	}

	nav {
		width: 100vw;
		padding: 10px 15px 0px 15px;
		display: flex;
		justify-content: space-between;
	}

	button,
	a {
		color: #fefefe;
		font-size: 13px;
		letter-spacing: 0.1px;
		line-height: 17px;
		text-decoration: none;
		border: none;
		background-color: #151515;
		cursor: pointer;
	}

	svg {
		margin-bottom: 31px;
	}
</style>
