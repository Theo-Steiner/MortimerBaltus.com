<script>
    import WindowElement from "../UI/WindowElement.svelte";
    const deGallery = [
        {
            name: "OBERHAFEN.JPG",
            src: "/MortimerBaltus/deGallery/Oberhafen_c5hvmx",
            alt: "Oberhafen, Hamburg (DE)",
        },
    ];
    var randomIndex = Math.floor(Math.random() * deGallery.length);
    const slug = deGallery[randomIndex].src;
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
    distanceFromIntersection={31}
>
    <img
        src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug}"
        sizes="60vmax"
        srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug} 1280w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/{slug} 640w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/{slug} 320w,"
        alt={deGallery[randomIndex].alt}
    />
</WindowElement>

<style>
    img {
        width: 59.6vmax;
        height: 35.4vmax;
        object-fit: cover;
    }
</style>
