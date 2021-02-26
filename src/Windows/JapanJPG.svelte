<script>
    import WindowElement from "../UI/WindowElement.svelte";
    const jpGallery = [
        {
            name: "SHINJUKU.JPG",
            src: "images/Shinjuku.jpg",
            alt: "Shinjuku, Tokyo (JP)",
        },
        {
            name: "TAXI.JPG",
            src: "images/TokyoTaxi.jpg",
            alt: "A cab in Tokyo (JP)",
        },
    ];
    var randomIndex = Math.floor(Math.random() * jpGallery.length);
</script>

<WindowElement
    gridColumnStart={1}
    gridColumnEnd={61}
    gridRowStart={75}
    gridRowEnd={115}
    title={jpGallery[randomIndex].name}
    id={8}
    isInForeground={false}
    intersections={[9]}
    intersectingSide="right"
>
    <div
        style="background-image: url({jpGallery[randomIndex].src});"
        title={jpGallery[randomIndex].alt}
    />
</WindowElement>

<style>
    div {
        width: 60vmax;
        height: 36vmax;
        background-size: cover;
    }
</style>
