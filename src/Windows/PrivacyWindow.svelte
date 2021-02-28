<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={158}
    gridColumnEnd={198}
    gridRowStart={173}
    gridRowEnd={198}
    largeGridColumnStart={172}
    largeGridColumnEnd={198}
    largeGridRowStart={182}
    largeGridRowEnd={198}
    backgroundColor="#FEC7A3"
    title="PRIVACY POLICY"
    id={5}
    isInForeground={true}
>
    <p>
        Eager to find out how browser-data is handled on our Website? <br />
        <br /> Surely this is just your cup of tea...
    </p>
</WindowElement>

<style>
    p {
        color: #151515;
        font-size: 2.8vmax;
        margin: 0px;
        padding: 1.2vmax;
    }
    @media only screen and (min-width: 1024px) {
        p {
            font-size: 1.8vmax;
            padding: 0.8vmax;
        }
    }
</style>
