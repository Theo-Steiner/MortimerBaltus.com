<script>
    import WindowElement from "../UI/FixedWindowElement.svelte";
    import ImageLoader from "../UX/ImageLoader.svelte";

    const slug = "MortimerBaltus/Projects/EberhardMueller_v2tpxi";
</script>

<div>
    <WindowElement
        width={{ base: 293, small: 465 }}
        height={{ base: 312, small: 497 }}
        background={'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjMTcxNjE2IiBkPSJNMCAwaDk2MHY5NjBIMHoiLz48ZyBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBmaWxsPSIjNTM1MTRmIiBkPSJNMy4yIDMzNy41bDQyNy43IDIxNi44IDQzMS4zLTc3LjQgNjcuMy04NnoiLz48cGF0aCBmaWxsPSIjNWY1YzVhIiBkPSJNOTg3LjUgODMuM0w2MDIgMTg5LjJsLTY4LjMtMTI4IDM4MS0xMDguNnoiLz48cGF0aCBmaWxsPSIjNjQ2MTVmIiBkPSJNMjIxLjgtNTguMWwyODEuNSAyMjIuNS00OC45IDEwMi40TDE1Mi4zIDYxLjJ6Ii8+PHBhdGggZD0iTS01OC4xIDQ1Mi4zbDU3OS42IDQxMC4xIDI4MS44IDcuNC0xOTYuNy0yODR6TTc3OCA0MDBMLTU4IDI4OSAxMS4yLTU4IDI1NCAxMzcuNHoiLz48cGF0aCBmaWxsPSIjNGM0YzQ5IiBkPSJNNTk3LjYgODUzLjZsLTkxLjggMTY0LjVMODQxIDkzNGwxMi4zLTQxLjV6Ii8+PHBhdGggZD0iTTUyMC45IDE2Mi42TDEwMTggMTM1IDU4NC42IDM0MiAzNzUgMzU0LjV6TTE0NC40IDczMS43bDk2LjYgNDIuOEw2IDEwMTguMWwtMzMuMi03MzkuNXoiLz48L2c+PC9zdmc+")'}
        title="PROJECT_03"
        id={3}
        isInForeground={true}
        intersections={[10]}
        intersectingSide="left"
        distanceFromIntersection={{ base: 25, small: 8 }}
    >
        <ImageLoader
            sizes="291px, (min-width: 640px) 463px"
            srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto/{slug} 463w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_291,f_auto/{slug} 291w,"
            src="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug}"
            alt="Eberhard Müller develops sophisticated textile interiors at the highest level"
        />
    </WindowElement>
</div>

<style>
    div {
        grid-column: 68/101;
        grid-row: 34/71;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    @media only screen and (min-width: 640px) {
        div {
            grid-column: 71/103;
            grid-row: 31/65;
        }
    }
</style>
