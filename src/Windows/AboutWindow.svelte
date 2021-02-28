<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={105}
    gridColumnEnd={135}
    gridRowStart={115}
    gridRowEnd={155}
    largeGridColumnStart={125}
    largeGridColumnEnd={145}
    largeGridRowStart={112}
    largeGridRowEnd={138}
    backgroundColor="#A25C24"
    title="ABOUT"
    id={0}
    isInForeground={true}
    intersections={[1]}
    intersectingSide="left"
    distanceFromIntersection={15}
    largeDistanceFromIntersection={6}
>
    <p>NICE <br /> TO<br /> MEET<br /> YOU</p>
</WindowElement>

<style>
    p {
        color: #151515;
        font-size: 8.3vmax;
        margin: 0px;
        padding: 1vmax;
    }
    @media only screen and (min-width: 1024px) {
        p {
            font-size: 5.5vmax;
            padding: 0.7vmax;
        }
    }
</style>
