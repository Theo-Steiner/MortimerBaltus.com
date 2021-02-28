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
        let selection = window.getSelection();
        selection.removeAllRanges();
    }
    function handleMouseup() {
        isMousedown = false;
        background.removeEventListener("mousemove", handleMousemove);
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
</script>

<svelte:window
    on:wheel|nonpassive|preventDefault|stopPropagation={wheelHandler}
/>

<div
    class="grabbable"
    class:mousedown={isMousedown}
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}
    on:mouseout={handleMouseup}
    bind:this={background}
/>

<style>
    div {
        position: absolute;
        width: 200vmax;
        height: 200vmax;
        cursor: grab;
        z-index: 1;
    }
    .mousedown {
        cursor: grabbing;
        user-select: none;
    }
</style>
