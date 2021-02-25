<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={50}
    gridColumnEnd={88}
    gridRowStart={15}
    gridRowEnd={55}
    title="PROJECT_03"
    id={3}
    isInForeground={true}
    intersections={[10]}
    intersectingSide="left"
>
    <img
        src="images/EberhardMueller.jpg"
        alt="Eberhard Müller develops sophisticated textile interiors at the highest level"
    />
</WindowElement>

<style>
    img {
        height: 100%;
    }
</style>
