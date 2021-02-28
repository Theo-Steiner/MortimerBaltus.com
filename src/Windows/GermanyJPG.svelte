<script>
    import WindowElement from "../UI/WindowElement.svelte";
    import ImageLoader from "../UX/ImageLoader.svelte";
    const deGallery = [
        {
            name: "OBERHAFEN.JPG",
            src: "/MortimerBaltus/deGallery/Oberhafen_c5hvmx",
            alt: "Oberhafen, Hamburg (DE)",
            svg:
                "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzFkMjYyOSIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiM1ODY4NmUiIGQ9Ik00MjkuNyA1MDAuMUwxNS42IDkyNy41bC05My4xLTYyNS4xIDE0MzUgMTczLjV6Ii8+PHBhdGggZD0iTTg5NC4yIDM0Ni44bDQ2My4zLTM0MUwtNzcuNS0xNGw0NjcuMyA0NTguOHoiLz48cGF0aCBmaWxsPSIjNTI2MzZiIiBkPSJNMTAzMC4yIDQ5OS4zbDMyMiA0MjguMi01Ni4zLTc0Mi4xLTU4NyAyNDIuNHoiLz48cGF0aCBmaWxsPSIjYzNjY2UwIiBkPSJNMzcuNyAyNTEuOWw2LjItMzggNjUuOCAxNDguNkwxMjYuOSA1MzV6Ii8+PHBhdGggZmlsbD0iI2UzZTdmYSIgZD0iTS03Ny41IDY3OC4xdi01Ni42bDIwMS4zLTkuMiAzMi40IDE5LjR6Ii8+PHBhdGggZD0iTTEzNDcuNiA1MjYuNmwtMzI5LjgtNDMuOC0yNjMtNDEuNyA2MDIuNyAxNjcuN3oiLz48cGF0aCBmaWxsPSIjYmJjN2Q3IiBkPSJNMTM1Ny41IDY4NS4zbC0yMTEtNTMuMy0yOC0xOCAxODUuNy03LjV6Ii8+PHBhdGggZD0iTTMwOC45LTc3LjVsLTEzNCA1NjktODcuNS0xNzYuM0wxMzU3LjUgMTA1eiIvPjxwYXRoIGZpbGw9IiNhZWFhYTkiIGQ9Ik0yNjUuNiA0ODRsNDQzLTcxLjdMMjM0LjggNDgxIDI1MiAyMzIuNXoiLz48cGF0aCBmaWxsPSIjYjVhZmIzIiBkPSJNMTEzOS40IDQ2OC4zbDg5LTI5Ni02OS43IDMzMi43LTcyLjItMjEuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAxIiBkPSJNMTE0MC4yIDQzNi4zbDcyLjQtMTg0LjMtMTkuOC0zMjkuNS04OC44IDQ5OC4yeiIvPjxwYXRoIGZpbGw9IiNlOWUzZjYiIGQ9Ik0xMjE2IDQ2MS4zbC0zLjItMzA4LjcgMTAuNCAxMTguMi00LjcgMTc2LjJ6Ii8+PHBhdGggZmlsbD0iIzg3OTc5YiIgZD0iTTEwMzguNCAzNDcuNWwtOS40IDEyMS4zLTkwLjctMi4zIDY3LjMtMTc0LjV6Ii8+PHBhdGggZmlsbD0iIzAyMDYwMCIgZD0iTTU3OS44IDQzNi45bC0xMTYuOSAyOS01NDAuNCAxMjguNCA4Ny40LTcxeiIvPjxwYXRoIGZpbGw9IiNmNGYzZmYiIGQ9Ik01NSAzNjQuN2wuMi0xMDIuOC0xMi40LTM0IC43IDEzNy4zeiIvPjxwYXRoIGZpbGw9IiM1YzY4NmYiIGQ9Ik0xMzIuMiAyOUwxNTkgMzcwbC0yMi40LTEyMkw4MS41LTR6Ii8+PHBhdGggZmlsbD0iIzBkMTUxOCIgZD0iTTk2Mi42IDkyNy41SDM5Ni44TDI4Ni42IDU1MC43bDY2Ni43LTIyeiIvPjxwYXRoIGZpbGw9IiNhMzlmOWQiIGQ9Ik0xMDkuMyA0OTMuMmwtMTg1LjYgNDBMMTk0IDQ5Ni44IDcyLjIgMzg5LjJ6Ii8+PHBhdGggZmlsbD0iIzczODg5NSIgZD0iTTEyNDcuNiA1MDUuNGwxLjktMjgwLjcgMjEuMy01OS4xIDcyLjQgMzY4LjV6Ii8+PHBhdGggZmlsbD0iIzUwNWY2NCIgZD0iTTExMzgtMzZsNjQtMzktNzggMzQwLTEtMjguOHoiLz48cGF0aCBmaWxsPSIjYjRjMmQwIiBkPSJNMTAwNC4xIDYzOC45bC0xMS4zLTIyIDItNCA3MS45LTEuM3oiLz48cGF0aCBmaWxsPSIjMDAwMTA2IiBkPSJNLTc3LjUtNTYuNmwxMjggMjcyLjJMNjIgMzM5LjRsNzUuMy0yODEuN3oiLz48cGF0aCBmaWxsPSIjNjU2ZTc1IiBkPSJNLTcyLjIgNTk0LjZMNzQwIDQwNS43IDI1MC40IDU2NiAzMC43IDYyOXoiLz48cGF0aCBmaWxsPSIjMDAwMjA2IiBkPSJNMTI2Mi45IDQ4Mi40bC0xMC4xLTEwLTE0LjYtMzkyLTIxLjIgNDI2LjJ6Ii8+PHBhdGggZmlsbD0iIzAxMDEwMCIgZD0iTTU4OC44IDQyNy43TDEwMzcuNyAyNDcgMTAyOSAuMyA5NC0xNC40eiIvPjxwYXRoIGZpbGw9IiM0ODUyNTYiIGQ9Ik0yMDggMTg4LjNsOS43LTExMi44IDMxLjYgNTEuNS01MS42IDE5OXoiLz48cGF0aCBmaWxsPSIjMWUzMjNiIiBkPSJNLTYxLjEgNzc2TDc4LjMgNjUxLjIgNDkzIDYyOS44IDc5IDkyNy41eiIvPjxwYXRoIGZpbGw9IiMwZDE1MTUiIGQ9Ik04MzcgNDg3LjhsLTE4OS00OC41LTE3NC44IDE4OSA0OTAuNyAxMy4xeiIvPjxwYXRoIGZpbGw9IiMwMDA4MTYiIGQ9Ik0xOC44IDQ3NC4zbDkuNi01MDkgMTcgNDcwLjYgNi43IDY2LjJ6Ii8+PHBhdGggZmlsbD0iI2U5ZTZmOSIgZD0iTTc0LjIgMzY1LjZsMjUuOCAxM0w3Mi4zIDI0OGw1LjggMTI0LjZ6Ii8+PHBhdGggZmlsbD0iIzAwMDIwNSIgZD0iTTExNjMgODMuNGw5Ni42IDcwLjQtNTMuOSAyLjhMMTIwOSA0NDF6Ii8+PHBhdGggZmlsbD0iIzc5N2I3OCIgZD0iTTY2NS43IDQxMWwtNTQ5LjMgNTYuNiA4NTYuMi0yOS40IDIyLjcgMzkuNnoiLz48L2c+PC9zdmc+",
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
    largeGridColumnStart={140}
    largeGridColumnEnd={180}
    largeGridRowStart={1}
    largeGridRowEnd={27}
    title={deGallery[randomIndex].name}
    id={11}
    isInForeground={false}
    intersections={[4]}
    intersectingSide="right"
    distanceFromIntersection={31}
    largeDistanceFromIntersection={7}
>
    <div
        style="background-image: url(data:image/svg+xml;base64,{deGallery[
            randomIndex
        ].svg})"
    >
        <ImageLoader
            srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug} 1280w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/{slug} 960w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_800,f_auto/{slug} 800w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/{slug} 640w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/{slug} 480w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/{slug} 320w,
    https://res.cloudinary.com/thdrstnr/image/upload/w_160,f_auto/{slug} 160w,"
            src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug}"
            sizes="60vmax, (min-width: 1024px) 39.8vmax"
            alt={deGallery[randomIndex].alt}
        />
    </div>
</WindowElement>

<style>
    div {
        width: 59.6vmax;
        height: 35.4vmax;
        background-repeat: no-repeat;
        background-size: cover;
    }
    @media only screen and (min-width: 1024px) {
        div {
            width: 39.8vmax;
            height: 23vmax;
        }
    }
</style>
