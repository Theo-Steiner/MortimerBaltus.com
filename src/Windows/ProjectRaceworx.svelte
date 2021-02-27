<script>
    import WindowElement from "../UI/WindowElement.svelte";
    const slug = "MortimerBaltus/Projects/Raceworx_wfjyou";
</script>

<WindowElement
    gridColumnStart={30}
    gridColumnEnd={80}
    gridRowStart={140}
    gridRowEnd={175}
    title="PROJECT_02"
    id={2}
    isInForeground={false}
    intersections={[7]}
    intersectingSide="left"
    distanceFromIntersection={15}
>
    <img
        sizes="49.6vmax"
        srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug} 1280w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_800,f_auto/{slug} 800w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/{slug} 640w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/{slug} 480w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/{slug} 320w,
        https://res.cloudinary.com/thdrstnr/image/upload/w_160,f_auto/{slug} 160w,"
        alt="Raceworx"
        src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug}"
    />
</WindowElement>

<style>
    img {
        width: 49.6vmax;
        height: 30.4vmax;
        object-fit: cover;
    }
</style>
