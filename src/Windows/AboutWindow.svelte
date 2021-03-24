<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div class="grid-area">
    <WindowElement
        width={378}
        height={392}
        parallax="very-fast"
        background="#A25C24"
        title="ABOUT"
        id={0}
        isInForeground={true}
        intersections={[1]}
        distanceFromIntersection={{
            base: -13,
            large: -12,
        }}
    >
        <p>NICE <br /> TO<br /> MEET<br /> YOU</p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 116/147;
        grid-row: 100/132;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    p {
        color: #151515;
        font-size: 80px;
        padding: 15px;
        margin: 0px;
    }
    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 117/143;
            grid-row: 102/129;
        }
    }
</style>
