<script>
    let isMousedown = false;
    let initialM = { x: 0, y: 0 };
    let currentM = { x: 0, y: 0 };
    let background;

    // Slow down scroll speed with mousewheel
    function wheelHandler(event) {
        let reducedDeltaY = Math.round(event.deltaY / 2);
        let reducedDeltaX = Math.round(event.deltaX / 2);
        window.scrollBy(reducedDeltaX, reducedDeltaY);
    }

    // The following functions take care of the grab handling
    function handleMousedown(event) {
        isMousedown = true;
        initialM.x = event.clientX;
        initialM.y = event.clientY;
        background.addEventListener("mousemove", handleMousemove);
        background.addEventListener("mouseout", handleMouseup);
        let selection = window.getSelection();
        selection.removeAllRanges();
    }
    function handleMouseup() {
        isMousedown = false;
        background.removeEventListener("mousemove", handleMousemove);
        background.removeEventListener("mouseout", handleMouseup);
    }
    function handleMousemove(event) {
        currentM.x = event.clientX;
        currentM.y = event.clientY;
        const deltaX = initialM.x - currentM.x;
        const deltaY = initialM.y - currentM.y;
        window.scrollBy(deltaX, deltaY);
        initialM.x = event.clientX;
        initialM.y = event.clientY;
    }

    var hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ("orientation" in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen =
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
        }
    }
</script>

<svelte:window
    on:wheel|nonpassive|preventDefault|stopPropagation={wheelHandler}
/>

{#if !hasTouchScreen}
    <div
        class="grabbable"
        class:mousedown={isMousedown}
        on:mousedown={handleMousedown}
        on:mouseup={handleMouseup}
        bind:this={background}
    />
{/if}

<style>
    .grabbable {
        position: fixed;
        width: 100vw;
        height: 100vh;

        cursor: grab;
        z-index: 1;
    }
    .mousedown {
        cursor: grabbing;
        user-select: none;
        z-index: 9999;
    }
</style>
