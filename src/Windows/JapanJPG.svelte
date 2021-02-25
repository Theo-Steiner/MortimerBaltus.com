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
    gridColumnStart={5}
    gridColumnEnd={64}
    gridRowStart={65}
    gridRowEnd={103}
    title={jpGallery[randomIndex].name}
    id={8}
    isInForeground={false}
    intersections={[9]}
    intersectingSide="right"
>
    <img src={jpGallery[randomIndex].src} alt={jpGallery[randomIndex].alt} />
</WindowElement>

<style>
    img {
        width: 100%;
    }
</style>
