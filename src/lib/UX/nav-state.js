import { writable } from 'svelte/store';

function navHandler() {
	const navState = writable({ from: undefined, location: undefined });

	return {
		subscribe: navState.subscribe,
		reportNavigation: (preNavigationScrollY, preNavigationScrollX) => {
			navState.set({
				from: '/',
				location: [preNavigationScrollY, preNavigationScrollX]
			});
		},
		setFrom: (route) => {
			navState.update((previousState) => {
				return { ...previousState, from: route };
			});
		}
	};
}

export default navHandler();
