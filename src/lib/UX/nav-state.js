import { writable } from 'svelte/store';

function navHandler() {
	const navState = writable({ history: [], location: undefined, flightPath: undefined });

	return {
		subscribe: navState.subscribe,
		reportNavigation: (preNavigationScrollY, preNavigationScrollX) => {
			navState.set({
				history: ['/'],
				location: [preNavigationScrollY, preNavigationScrollX],
				flightPath: undefined
			});
		},
		setHistory: (history) => {
			navState.update((previousState) => {
				return { ...previousState, history };
			});
		},
		setFlightPath: (flightPath) => {
			navState.update((previousState) => {
				return { ...previousState, flightPath };
			});
		}
	};
}

export default navHandler();
