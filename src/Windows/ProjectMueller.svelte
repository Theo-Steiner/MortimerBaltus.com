<script>
    import WindowElement from "../UI/WindowElement.svelte";
    import ImageLoader from "../UX/ImageLoader.svelte";

    const slug = "MortimerBaltus/Projects/EberhardMueller_v2tpxi";
</script>

<div class="grid-area">
    <WindowElement
        width={465}
        height={497}
        parallax="very-fast"
        background={'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjMTcxNjE2IiBkPSJNMCAwaDk2MHY5NjBIMHoiLz48ZyBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBmaWxsPSIjNTM1MTRmIiBkPSJNMy4yIDMzNy41bDQyNy43IDIxNi44IDQzMS4zLTc3LjQgNjcuMy04NnoiLz48cGF0aCBmaWxsPSIjNWY1YzVhIiBkPSJNOTg3LjUgODMuM0w2MDIgMTg5LjJsLTY4LjMtMTI4IDM4MS0xMDguNnoiLz48cGF0aCBmaWxsPSIjNjQ2MTVmIiBkPSJNMjIxLjgtNTguMWwyODEuNSAyMjIuNS00OC45IDEwMi40TDE1Mi4zIDYxLjJ6Ii8+PHBhdGggZD0iTS01OC4xIDQ1Mi4zbDU3OS42IDQxMC4xIDI4MS44IDcuNC0xOTYuNy0yODR6TTc3OCA0MDBMLTU4IDI4OSAxMS4yLTU4IDI1NCAxMzcuNHoiLz48cGF0aCBmaWxsPSIjNGM0YzQ5IiBkPSJNNTk3LjYgODUzLjZsLTkxLjggMTY0LjVMODQxIDkzNGwxMi4zLTQxLjV6Ii8+PHBhdGggZD0iTTUyMC45IDE2Mi42TDEwMTggMTM1IDU4NC42IDM0MiAzNzUgMzU0LjV6TTE0NC40IDczMS43bDk2LjYgNDIuOEw2IDEwMTguMWwtMzMuMi03MzkuNXoiLz48L2c+PC9zdmc+")'}
        title="PROJECT_03"
        id={3}
        isInForeground={false}
        intersections={[10]}
        distanceFromIntersection={{
            base: -13,
            large: -8,
        }}
    >
        <ImageLoader
            sizes="463px"
            srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto,q_auto:best/{slug} 463w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_291,f_auto,q_auto:best/{slug} 291w,"
            src="https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug}"
            alt="Eberhard Müller develops sophisticated textile interiors at the highest level"
        />
    </WindowElement>
</div>

<style>
    div {
        grid-column: 68/106;
        grid-row: 28/68;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 69/101;
            grid-row: 30/64;
        }
    }
</style>
