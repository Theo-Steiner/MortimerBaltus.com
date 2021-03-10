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
</script>

<svelte:window
    on:wheel|nonpassive|preventDefault|stopPropagation={wheelHandler}
/>

{#if !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}
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
