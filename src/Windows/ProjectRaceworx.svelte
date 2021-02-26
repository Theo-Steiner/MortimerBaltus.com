<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={40}
    gridColumnEnd={90}
    gridRowStart={130}
    gridRowEnd={165}
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
