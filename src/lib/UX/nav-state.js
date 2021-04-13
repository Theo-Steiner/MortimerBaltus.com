import { writable } from "svelte/store"

function navHandler() {
    const navState = writable(false);

    return {
        subscribe: navState.subscribe,
        reportNavigation: (preNavigationScrollY, preNavigationScrollX) => { navState.set([preNavigationScrollY, preNavigationScrollX]) }
    }
}

export default navHandler();