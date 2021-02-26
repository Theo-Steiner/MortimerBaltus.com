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
    <div
        style="background-image: url('images/Logopedia.svg');"
        title="Logo Portfolio"
    />
</WindowElement>

<style>
    div {
        display: flex;
        align-items: center;
        width: 40vmax;
        height: 26vmax;
        justify-content: center;
        background-size: 30vmax;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
