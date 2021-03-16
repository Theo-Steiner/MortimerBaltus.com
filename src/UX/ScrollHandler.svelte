<script>
    let isMousedown = false;
    let initialM = { x: 0, y: 0 };
    let currentM = { x: 0, y: 0 };
    let background;

    // Slow down scroll speed with mousewheel
    function wheelHandler(event) {
        let reducedDeltaY = Math.round(event.deltaY / 2);
        let reducedDeltaX = Math.round(event.deltaX / 2);
        main.scrollTop = main.scrollTop + reducedDeltaY;
        main.scrollLeft = main.scrollLeft + reducedDeltaX;
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
        main.scrollTop = main.scrollTop + deltaY;
        main.scrollLeft = main.scrollLeft + deltaX;
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
        position: absolute;
        width: max(2550px, 250vmax);
        height: max(2550px, 250vmax);
        transform: translateZ(0px) scale(5);
        transform-origin: bottom right;
        transform-origin: 0 0;
        top: 0;
        left: 0;

        cursor: grab;
        z-index: 0;
    }
    .mousedown {
        cursor: grabbing;
        user-select: none;
        z-index: 9999;
    }
    @media only screen and (min-width: 1440px) {
        .grabbable {
            width: min(4000px, 200vmax);
            height: min(4000px, 200vmax);
        }
    }
</style>
