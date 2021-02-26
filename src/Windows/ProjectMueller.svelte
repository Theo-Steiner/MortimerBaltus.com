<script>
    import WindowElement from "../UI/WindowElement.svelte";
    const maxPixels =
        window.innerWidth > window.innerHeight
            ? window.innerWidth
            : window.innerHeight;
    const pixelWidth = Math.ceil(maxPixels * 0.4);
    const slug = "MortimerBaltus/Projects/EberhardMueller_v2tpxi";
</script>

<WindowElement
    gridColumnStart={50}
    gridColumnEnd={90}
    gridRowStart={15}
    gridRowEnd={55}
    title="PROJECT_03"
    id={3}
    isInForeground={true}
    intersections={[10]}
    intersectingSide="left"
    distanceFromIntersection={10}
>
    <img
        sizes="{pixelWidth}px"
        srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/{slug} 480w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/{slug} 240w,"
        src="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug}"
        alt="Eberhard Müller develops sophisticated textile interiors at the highest level"
    />
</WindowElement>

<style>
    img {
        width: 39.6vmax;
        height: 35.4vmax;
        object-fit: cover;
    }
</style>
