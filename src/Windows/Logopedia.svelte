<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div class="grid-area">
    <WindowElement
        width={472}
        height={344}
        parallax="slowish"
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
        grid-column: 125/163;
        grid-row: 59/87;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        margin-top: 80px;
        height: 127px;
        display: block;
    }

    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 127/159;
            grid-row: 61/84;
        }
    }
</style>
