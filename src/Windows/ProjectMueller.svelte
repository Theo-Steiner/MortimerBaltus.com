<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={50}
    gridColumnEnd={90}
    gridRowStart={15}
    gridRowEnd={55}
    title="PROJECT_03"
    id={3}
    isInForeground={true}
    intersections={[10]}
    intersectingSide="left"
>
    <div
        style="background-image: url('images/EberhardMueller.jpg');"
        title="Eberhard Müller develops sophisticated textile interiors at the highest level"
    />
</WindowElement>

<style>
    div {
        width: 40vmax;
        height: 36vmax;
        background-size: cover;
    }
</style>
