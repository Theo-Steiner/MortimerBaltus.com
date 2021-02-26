<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={30}
    gridColumnEnd={80}
    gridRowStart={140}
    gridRowEnd={175}
    title="PROJECT_02"
    id={2}
    isInForeground={false}
    intersections={[7]}
    intersectingSide="left"
>
    <div
        style="background-image: url('images/Raceworx.webp');"
        title="Raceworx"
    />
</WindowElement>

<style>
    div {
        width: 50vmax;
        height: 31vmax;
        background-size: cover;
    }
</style>
