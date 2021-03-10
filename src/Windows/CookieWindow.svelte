<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div>
    <WindowElement
        width={{ base: 218, small: 300 }}
        height={{ base: 119, small: 164 }}
        background="#5E4B1B"
        title="COOKIES"
        enlargeable={false}
        id={9}
        isInForeground={true}
    >
        <p>
            <span
                >We use necessary Cookies to ensure visitors have the best
                possible experience on our site. <br /></span
            >
            Your privacy is important to us, therefore we don’t use any tracking
            services by third-parties. <br /> Please read our Privacy Policy for
            more info on this subject!
        </p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 55/81;
        grid-row: 103/118;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span {
        margin: 0px;
        padding: 0px;
        display: none;
    }

    p {
        color: #151515;
        font-size: 13px;
        margin: 0px;
        padding: 6px;
    }
    @media only screen and (min-width: 640px) {
        div {
            grid-column: 63/83;
            grid-row: 109/120;
        }
        span {
            display: inline;
        }
        p {
            font-size: 15px;
            padding: 6px;
        }
    }
    @media only screen and (min-width: 1020px) {
        div {
            grid-column: 61/85;
            grid-row: 105/119;
        }
    }

    @media only screen and (min-width: 1020px) {
        div {
            grid-column: 61/85;
            grid-row: 105/119;
        }

        @media only screen and (min-width: 1440px) {
            div {
                grid-column: 60/81;
                grid-row: 105/116;
            }
        }
        /* WITH MAXIMUM SIZE SO IT DOESN'T SCALE TO INFINITY -> Initiate scroller has to be adjusted */
        /* ODER INFINITE SCROLL: genau eine breite und höhe "empty space" an der Kante und dann scroll to x bleibt gleich y: 0 oder y bleibt gleich x = 0 */
        /* PARALLAX Scrolling: the closer windows are to the center of the viewport, the more they are ofset */

        /* USER SELECTABLE -> DRAG SAFARI
        ZOOM SAFARI: 
        DIAGONAL SCROLLING MOBILE SAFARI;; */
    }
</style>
