import App from './App.svelte';

const app = new App({
	target: document.querySelector("main .container"),
	intro: true,
});

export default app;