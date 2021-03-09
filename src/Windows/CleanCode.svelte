<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div>
    <WindowElement
        width={{ base: 238, small: 378 }}
        height={{ base: 172, small: 273 }}
        background="#7d7d7d"
        title="CLEAN.CODE"
        id={10}
        isInForeground={false}
        intersections={[3]}
        distanceFromIntersection={{
            base: 25,
            small: 8,
            large: 13,
            extralarge: 8,
        }}
    >
        <p>
            I suppose it is tempting, <br /> if the only tool you have is a
            hammer,<br />
            to treat everything as if it were a nail.
        </p>
        <p class="text-right">- Abraham Maslow <br /><br /></p>
        <p>
            You wouldn't change a lightbulb with a hammer. <br />
        </p>
        <p class="text-right">We won't either.</p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 47/76;
        grid-row: 46/67;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    p {
        color: #151515;
        font-size: 13px;
        margin: 0px;
        padding: 4px;
    }
    .text-right {
        text-align: right;
    }
    @media only screen and (min-width: 640px) {
        div {
            grid-column: 53/79;
            grid-row: 41/59;
        }
        p {
            font-size: 21px;
            padding: 6px;
        }
    }
    @media only screen and (min-width: 1020px) {
        div {
            grid-column: 50/81;
            grid-row: 40/62;
        }
    }
    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 51/77;
            grid-row: 41/60;
        }
    }
</style>
