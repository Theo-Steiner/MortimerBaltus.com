<script>
    import WindowElement from "../UI/WindowElement.svelte";
    import ImageLoader from "../UX/ImageLoader.svelte";

    const slug = "MortimerBaltus/Projects/EberhardMueller_v2tpxi";
</script>

<WindowElement
    gridColumnStart={50}
    gridColumnEnd={90}
    gridRowStart={15}
    gridRowEnd={55}
    largeGridColumnStart={65}
    largeGridColumnEnd={91}
    largeGridRowStart={51}
    largeGridRowEnd={77}
    title="PROJECT_03"
    id={3}
    isInForeground={true}
    intersections={[10]}
    intersectingSide="left"
    distanceFromIntersection={10}
    largeDistanceFromIntersection={5}
>
    <div>
        <ImageLoader
            sizes="39.6vmax, (min-width: 1024px) 25.8vmax"
            srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_840,f_auto/{slug} 840w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_720,f_auto/{slug} 720w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_600,f_auto/{slug} 600w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/{slug} 480w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_360,f_auto/{slug} 360w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/{slug} 240w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_120,f_auto/{slug} 120w,"
            src="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug}"
            alt="Eberhard Müller develops sophisticated textile interiors at the highest level"
        />
    </div>
</WindowElement>

<style>
    div {
        width: 39.6vmax;
        height: 35.4vmax;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjMTcxNjE2IiBkPSJNMCAwaDk2MHY5NjBIMHoiLz48ZyBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBmaWxsPSIjNTM1MTRmIiBkPSJNMy4yIDMzNy41bDQyNy43IDIxNi44IDQzMS4zLTc3LjQgNjcuMy04NnoiLz48cGF0aCBmaWxsPSIjNWY1YzVhIiBkPSJNOTg3LjUgODMuM0w2MDIgMTg5LjJsLTY4LjMtMTI4IDM4MS0xMDguNnoiLz48cGF0aCBmaWxsPSIjNjQ2MTVmIiBkPSJNMjIxLjgtNTguMWwyODEuNSAyMjIuNS00OC45IDEwMi40TDE1Mi4zIDYxLjJ6Ii8+PHBhdGggZD0iTS01OC4xIDQ1Mi4zbDU3OS42IDQxMC4xIDI4MS44IDcuNC0xOTYuNy0yODR6TTc3OCA0MDBMLTU4IDI4OSAxMS4yLTU4IDI1NCAxMzcuNHoiLz48cGF0aCBmaWxsPSIjNGM0YzQ5IiBkPSJNNTk3LjYgODUzLjZsLTkxLjggMTY0LjVMODQxIDkzNGwxMi4zLTQxLjV6Ii8+PHBhdGggZD0iTTUyMC45IDE2Mi42TDEwMTggMTM1IDU4NC42IDM0MiAzNzUgMzU0LjV6TTE0NC40IDczMS43bDk2LjYgNDIuOEw2IDEwMTguMWwtMzMuMi03MzkuNXoiLz48L2c+PC9zdmc+");
    }
    @media only screen and (min-width: 1024px) {
        div {
            width: 25.8vmax;
            height: 23vmax;
        }
    }
</style>
