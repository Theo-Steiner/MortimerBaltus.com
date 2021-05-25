import App from './App.svelte';

const app = new App({
	target: document.querySelector('main .grid-box'),
	intro: true
});

export default app;
