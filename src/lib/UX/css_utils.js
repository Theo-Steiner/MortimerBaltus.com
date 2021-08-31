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
	} else if (window.matchMedia('(min-width: 1439px)').matches) {
		currentBodyDimensions = Math.max(2550, vmax(170));
	}
	if (currentBodyDimensions > screen) {
		return (currentBodyDimensions - screen) / 2;
	} else {
		return 0;
	}
}
