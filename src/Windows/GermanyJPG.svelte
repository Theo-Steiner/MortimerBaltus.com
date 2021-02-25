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
    gridColumnEnd={195}
    gridRowStart={5}
    gridRowEnd={43}
    title={deGallery[randomIndex].name}
    id={11}
    isInForeground={false}
    intersections={[4]}
    intersectingSide="right"
>
    <img src={deGallery[randomIndex].src} alt={deGallery[randomIndex].alt} />
</WindowElement>

<style>
    img {
        width: 100%;
    }
</style>
