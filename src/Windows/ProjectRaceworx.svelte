<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={40}
    gridColumnEnd={90}
    gridRowStart={128}
    gridRowEnd={163}
    title="PROJECT_02"
    id={2}
    isInForeground={false}
    intersections={[7]}
    intersectingSide="left"
>
    <img src="images/Raceworx.webp" alt="Raceworx" />
</WindowElement>

<style>
    img {
        width: 100%;
    }
</style>
