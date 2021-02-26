<script>
    import WindowElement from "../UI/WindowElement.svelte";
    const maxPixels =
        window.innerWidth > window.innerHeight
            ? window.innerWidth
            : window.innerHeight;
    const pixelWidth = Math.ceil(maxPixels * 0.6);
    const slug = "MortimerBaltus/Projects/ConCorazon_mksjj0";
</script>

<WindowElement
    gridColumnStart={110}
    gridColumnEnd={150}
    gridRowStart={135}
    gridRowEnd={185}
    title="PROJECT_01"
    id={1}
    isInForeground={false}
    intersections={[0]}
    intersectingSide="right"
    distanceFromIntersection={15}
>
    <img
        sizes="{pixelWidth}px"
        srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/{slug} 480w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/{slug} 240w,"
        src="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug}"
        alt="Con Corazón is embracing artisans from countries at war"
    />
</WindowElement>

<style>
    img {
        width: 39.6vmax;
        height: 45.4vmax;
        object-fit: cover;
    }
</style>
