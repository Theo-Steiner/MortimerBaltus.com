<script>
    import WindowElement from "../UI/WindowElement.svelte";
    const jpGallery = [
        {
            name: "SHINJUKU.JPG",
            src: "/MortimerBaltus/jpGallery/TokyoTaxi_zbokhg",
            alt: "Shinjuku, Tokyo (JP)",
        },
        {
            name: "TAXI.JPG",
            src: "/MortimerBaltus/jpGallery/ShinjukuSakura_dgdj2h",
            alt: "A cab in Tokyo (JP)",
        },
        {
            name: "TRAINSTATION.JPG",
            src: "/MortimerBaltus/jpGallery/TokyoTrainstation_sovh7s",
            alt: "A Trainstation in Tokyo",
        },
    ];
    var randomIndex = Math.floor(Math.random() * jpGallery.length);
    const slug = jpGallery[randomIndex].src;
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
    distanceFromIntersection={21}
>
    <img
        src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug}"
        sizes="60vmax"
        srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug} 1280w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/{slug} 640w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/{slug} 320w,"
        alt={jpGallery[randomIndex].alt}
    />
</WindowElement>

<style>
    img {
        object-fit: cover;
        width: 59.6vmax;
        height: 35.4vmax;
    }
</style>
