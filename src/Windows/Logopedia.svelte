<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={105}
    gridColumnEnd={145}
    gridRowStart={38}
    gridRowEnd={68}
    largeGridColumnStart={129}
    largeGridColumnEnd={155}
    largeGridRowStart={63}
    largeGridRowEnd={83}
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
