<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={135}
    gridColumnEnd={165}
    gridRowStart={125}
    gridRowEnd={165}
    backgroundColor="#A25C24"
    title="ABOUT"
    id={0}
    isInForeground={true}
    intersections={[1]}
    intersectingSide="left"
>
    <p>NICE <br /> TO<br /> MEET<br /> YOU</p>
</WindowElement>

<style>
    p {
        color: #151515;
        font-size: 8.3vmax;
        margin: 0px;
        padding: 1vmax;
    }
</style>
