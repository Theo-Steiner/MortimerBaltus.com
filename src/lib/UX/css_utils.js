import { cubicOut } from 'svelte/easing';

export function vh(v) {
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return (v * h) / 100;
}

export function vw(v) {
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	return (v * w) / 100;
}

export function vmax(v) {
	return Math.max(vh(v), vw(v));
}

export function getScrollTo(screen) {
	let currentBodyDimensions;
	if (window.matchMedia('(max-width: 1439px)').matches) {
		currentBodyDimensions = Math.max(2550, vmax(250));
	} else if (window.matchMedia('(min-width: 1440px)').matches) {
		currentBodyDimensions = Math.max(2880, vmax(120));
	}
	if (currentBodyDimensions > screen) {
		return (currentBodyDimensions - screen) / 2;
	} else {
		return 0;
	}
}

export function horizontalSlide(node, { delay = 0, duration = 400, easing = cubicOut }) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const width = parseFloat(style.width);
	const paddingLeft = parseFloat(style.paddingLeft);
	const paddingRight = parseFloat(style.paddingRight);
	const marginLeft = parseFloat(style.marginLeft);
	const marginRight = parseFloat(style.marginRight);
	const borderLeftWidth = parseFloat(style.borderLeftWidth);
	const borderRightWidth = parseFloat(style.borderRightWidth);

	return {
		delay,
		duration,
		easing,
		css: (t) =>
			`overflow: hidden;` +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`width: ${t * width}px;` +
			`padding-left: ${t * paddingLeft}px;` +
			`padding-right: ${t * paddingRight}px;` +
			`margin-left: ${t * marginLeft}px;` +
			`margin-right: ${t * marginRight}px;` +
			`border-left-width: ${t * borderLeftWidth}px;` +
			`border-right-width: ${t * borderRightWidth}px;`
	};
}
