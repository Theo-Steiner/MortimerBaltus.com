<script>
    import WindowElement from "../UI/WindowElement.svelte";
    const deGallery = [
        {
            name: "OBERHAFEN.JPG",
            src: "images/Oberhafen.jpg",
            alt: "Oberhafen, Hamburg (DE)",
        },
    ];
    var randomIndex = Math.floor(Math.random() * deGallery.length);
</script>

<WindowElement
    gridColumnStart={130}
    gridColumnEnd={190}
    gridRowStart={1}
    gridRowEnd={41}
    title={deGallery[randomIndex].name}
    id={11}
    isInForeground={false}
    intersections={[4]}
    intersectingSide="right"
>
    <div
        style="background-image: url({deGallery[randomIndex].src});"
        title={deGallery[randomIndex].alt}
    />
</WindowElement>

<style>
    div {
        width: 60vmax;
        height: 40vmax;
        background-size: cover;
    }
</style>
