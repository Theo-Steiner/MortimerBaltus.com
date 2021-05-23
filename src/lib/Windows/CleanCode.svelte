<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div class="grid-area">
    <WindowElement
        width={378}
        height={273}
        parallax="very-slow"
        background="#7d7d7d"
        title="CLEAN.CODE"
        id={10}
        isInForeground={true}
        intersections={[3]}
        distanceFromIntersection={{
            base: 13,
            large: 8,
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
        grid-column: 50/81;
        grid-row: 40/62;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    p {
        color: #151515;
        font-size: 21px;
        margin: 0px;
        padding: 6px;
    }
    .text-right {
        text-align: right;
    }

    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 51/77;
            grid-row: 41/60;
        }
    }
</style>
