import { writable } from "svelte/store"

function windowHandler() {
    const windowStore = writable([]);

    return {
        subscribe: windowStore.subscribe,
        registerWindow: window => {
            windowStore.update(windowObjects => {
                return [...windowObjects, window];
            })
        },
        unregisterWindow: windowID => {
            windowStore.update(windowObjects => {
                return windowObjects.filter(wndw => wdnw.id != windowID)
            })
        },
        bringToForeground: windowID => {
            windowStore.update(windowObjects => {
                let window = windowObjects.find(wndw => wndw.id === windowID);
                const windowIndex = windowObjects.indexOf(window);
                const toForegroundParallax = window.parallax;
                let intersectingWindow = windowObjects.find(wndw => wndw.id === window.intersections[0]);
                const intersectingWindowIndex = windowObjects.indexOf(intersectingWindow);
                const toBackgroundParallax = intersectingWindow.parallax;
                window.parallax = toBackgroundParallax;
                window.isInForeground = true;
                intersectingWindow.parallax = toForegroundParallax;
                intersectingWindow.isInForeground = false;
                intersectingWindow.touched = true;
                console.log(`swapped parallaxA:"${toBackgroundParallax}" with parallaxB: "${toForegroundParallax}"`)
                let updatedWindowObjects = [...windowObjects]
                updatedWindowObjects[windowIndex] = window;
                updatedWindowObjects[intersectingWindowIndex] = intersectingWindow;
                return updatedWindowObjects;
            })

        }
    }
}

export default windowHandler();