<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={5}
    gridColumnEnd={45}
    gridRowStart={165}
    gridRowEnd={185}
    largeGridColumnStart={13}
    largeGridColumnEnd={39}
    largeGridRowStart={170}
    largeGridRowEnd={183}
    backgroundColor="#1C6370"
    title="LEGAL NOTICE"
    id={7}
    isInForeground={true}
    intersections={[2]}
    intersectingSide="right"
    distanceFromIntersection={15}
    largeDistanceFromIntersection={9}
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
    @media only screen and (min-width: 1024px) {
        p {
            font-size: 1.8vmax;
            padding: 0.8vmax;
        }
    }
</style>
