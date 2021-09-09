import { writable } from 'svelte/store';

function navHandler() {
	const navState = writable({ history: [], location: undefined });

	return {
		subscribe: navState.subscribe,
		reportNavigation: (preNavigationScrollY, preNavigationScrollX) => {
			navState.set({
				history: ['/'],
				location: [preNavigationScrollY, preNavigationScrollX]
			});
		},
		setHistory: (history) => {
			navState.update((previousState) => {
				return { ...previousState, history };
			});
		}
	};
}

export default navHandler();
