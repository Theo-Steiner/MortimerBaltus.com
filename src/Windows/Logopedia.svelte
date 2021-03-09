<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div>
    <WindowElement
        width={{ base: 297, small: 472 }}
        height={{ base: 217, small: 344 }}
        title="LOGOPEDIA.MP4"
        enlargeable={false}
        background="#C4BDBD"
        id={6}
        isInForeground={true}
    >
        <img src="images/Logopedia.svg" alt="Logo Portfolio" />
    </WindowElement>
</div>

<style>
    div {
        grid-column: 127/163;
        grid-row: 63/89;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        margin-top: 50px;
        height: 80px;
        display: block;
    }
    @media only screen and (min-width: 640px) {
        div {
            grid-column: 131/163;
            grid-row: 63/87;
        }

        img {
            margin-top: 80px;
            height: 127px;
            display: block;
        }
    }
    @media only screen and (min-width: 1020px) {
        div {
            grid-column: 125/163;
            grid-row: 59/87;
        }
    }
</style>
