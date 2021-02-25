<script>
    function wheelHandler(event) {
        let reducedDeltaY = Math.round(event.deltaY / 2);
        let reducedDeltaX = Math.round(event.deltaX / 2);
        window.scrollBy(reducedDeltaX, reducedDeltaY);
    }
</script>

<svelte:window
    on:wheel|nonpassive|preventDefault|stopPropagation={wheelHandler}
/>
