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
                window.zIndex = 10;
                window.isInForeground = true;
                let updatedWindowObjects = windowObjects.filter(wndw => true)
                updatedWindowObjects[windowIndex] = window;
                window.intersections.forEach(intersectingID => {
                    let intersectingWindow = windowObjects.find(wndw => wndw.id === intersectingID);
                    const intersectingWindowIndex = windowObjects.indexOf(intersectingWindow);
                    intersectingWindow.zIndex = 5;
                    intersectingWindow.isInForeground = false;
                    intersectingWindow.touched = true;
                    updatedWindowObjects[intersectingWindowIndex] = intersectingWindow;
                });
                return updatedWindowObjects;
            })

        }
    }
}

export default windowHandler();