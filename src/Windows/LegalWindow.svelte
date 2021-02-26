<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={5}
    gridColumnEnd={45}
    gridRowStart={165}
    gridRowEnd={185}
    backgroundColor="#1C6370"
    title="LEGAL NOTICE"
    id={7}
    isInForeground={true}
    intersections={[2]}
    intersectingSide="right"
    distanceFromIntersection={15}
>
    <p>
        You like boring legal texts and bureaucracy? <br /><br /> We've got you covered!
    </p>
</WindowElement>

<style>
    p {
        color: #151515;
        font-size: 2.8vmax;
        margin: 0px;
        padding: 1.2vmax;
    }
</style>
