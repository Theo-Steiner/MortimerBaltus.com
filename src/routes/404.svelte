<script>
	import Footer from '$lib/UI/Footer.svelte';
	import Navigation from '$lib/UI/Navigation.svelte';
	import SubpageTransition from '$lib/UX/SubpageTransition.svelte';
	import { t } from 'precompile-intl-runtime';
</script>

<SubpageTransition>
	<Navigation previousLink="/" innerWidth nextLink="/pages/about" currentPage="error" />
	<div>
		<section>
			<h1 lang="en">404: Page not found</h1>
			<p>{$t('pages.error.errorMessage')}</p>
		</section>
		<Footer currentPage="error" />
	</div>
</SubpageTransition>

<style>
	div {
		overflow: scroll;
		height: 100%;
	}

	section {
		height: 100vh;
		background: #e63c54;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 53px 5vw;
		color: #fefefe;
		text-align: center;
	}

	h1 {
		font-size: clamp(40px, 6.7vw, 80px);
		padding-top: 53px;
	}

	p {
		color: inherit;
		max-width: 63ch;
	}
</style>
