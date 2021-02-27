<script>
    import WindowElement from "../UI/WindowElement.svelte";
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
        sizes="39.6vmax"
        srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_840,f_auto/{slug} 840w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_720,f_auto/{slug} 720w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_600,f_auto/{slug} 600w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/{slug} 480w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_360,f_auto/{slug} 360w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/{slug} 240w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_120,f_auto/{slug} 120w,"
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
