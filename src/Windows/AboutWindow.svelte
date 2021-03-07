<script>
    import WindowElement from "../UI/FixedWindowElement.svelte";
</script>

<div>
    <WindowElement
        width={{ base: 238, small: 378 }}
        height={{ base: 247, small: 392 }}
        background="#A25C24"
        title="ABOUT"
        id={0}
        isInForeground={true}
        intersections={[1]}
        distanceFromIntersection={{ base: -8, small: -6, large: -13 }}
    >
        <p>NICE <br /> TO<br /> MEET<br /> YOU</p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 117/145;
        grid-row: 101/130;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    p {
        color: #151515;
        font-size: 50px;
        margin: 0px;
        padding: 9px;
    }
    @media only screen and (min-width: 640px) {
        p {
            font-size: 80px;
            padding: 15px;
        }
        div {
            grid-column: 120/145;
            grid-row: 107/133;
        }
    }
    @media only screen and (min-width: 1024px) {
        div {
            grid-column: 116/147;
            grid-row: 102/133;
        }
    }
</style>
