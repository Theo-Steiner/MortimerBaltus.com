<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={105}
    gridColumnEnd={145}
    gridRowStart={48}
    gridRowEnd={78}
    largeGridColumnStart={119}
    largeGridColumnEnd={145}
    largeGridRowStart={53}
    largeGridRowEnd={73}
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
    @media only screen and (min-width: 1024px) {
        div {
            width: 26vmax;
            height: 18vmax;
            background-size: 23vmax;
        }
    }
</style>
