<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={20}
    gridColumnEnd={60}
    gridRowStart={2}
    gridRowEnd={32}
    largeGridColumnStart={34}
    largeGridColumnEnd={60}
    largeGridRowStart={10}
    largeGridRowEnd={30}
    backgroundColor="#7d7d7d"
    title="CLEAN.CODE"
    id={10}
    isInForeground={false}
    intersections={[3]}
    intersectingSide="right"
    distanceFromIntersection={10}
    largeDistanceFromIntersection={5}
>
    <p>
        I suppose it is tempting, <br /> if the only tool you have is a hammer, to
        treat everything as if it were a nail.
    </p>
    <p class="text-right">- Abraham Maslow <br /><br /></p>
    <p>
        You wouldn't change a lightbulb with a hammer. <br />
    </p>
    <p class="text-right">We won't either.</p>
</WindowElement>

<style>
    p {
        color: #151515;
        font-size: 2.2vmax;
        margin: 0px;
        padding: 1vmax;
    }
    .text-right {
        text-align: right;
    }
    @media only screen and (min-width: 1024px) {
        p {
            font-size: 1.4vmax;
            padding: 0.7vmax;
        }
    }
</style>
