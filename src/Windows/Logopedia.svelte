<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={105}
    gridColumnEnd={145}
    gridRowStart={48}
    gridRowEnd={78}
    title="LOGOPEDIA.MP4"
    enlargeable={false}
    backgroundColor="#C4BDBD"
    id={6}
    isInForeground={true}
>
    <div>
        <img src="images/Logopedia.svg" alt="Logo Portfolio" />
    </div>
</WindowElement>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80%;
    }
    img {
        height: 30%;
        width: 70%;
    }
</style>
