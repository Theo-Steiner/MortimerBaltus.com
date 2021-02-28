<script>
    import WindowElement from "../UI/WindowElement.svelte";
    import ImageLoader from "../UX/ImageLoader.svelte";

    const slug = "MortimerBaltus/Projects/ConCorazon_mksjj0";
</script>

<WindowElement
    gridColumnStart={80}
    gridColumnEnd={120}
    gridRowStart={125}
    gridRowEnd={175}
    largeGridColumnStart={105}
    largeGridColumnEnd={131}
    largeGridRowStart={120}
    largeGridRowEnd={153}
    title="PROJECT_01"
    id={1}
    isInForeground={false}
    intersections={[0]}
    intersectingSide="right"
    distanceFromIntersection={15}
    largeDistanceFromIntersection={6}
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
            alt="Con Corazón is embracing artisans from countries at war"
        />
    </div>
</WindowElement>

<style>
    div {
        position: relative;
        z-index: 10;
        width: 39.6vmax;
        height: 45.4vmax;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgMTIwMCI+PHBhdGggZmlsbD0iIzgwNzI1ZiIgZD0iTTAgMGg5NTZ2MTIwMEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tMzkuNSAxMjcyLjdsNDQ2LTEzMzEgNTMuOSA2NjMuOS0yMjcuNiA2Njd6Ii8+PHBhdGggZD0iTS03Mi43IDkyMlYtLjVsMzY4LjggMy4yTDE2Mi40IDgwN3oiLz48cGF0aCBmaWxsPSIjMWExZjEzIiBkPSJNOTU5IDU0MS41TDQyOC40IDcyOCAzMjMgMTA5Mi4xbDYzMC43IDE4MC42eiIvPjxwYXRoIGZpbGw9IiNmZWRjYmUiIGQ9Ik0xMzQuNiA4MjlsMTY1LjEtNDA3LjIgNjA0LjctNDM2LTIxLjEgNDgxLjh6Ii8+PHBhdGggZD0iTS03Mi43IDk5Mi43bDIzOC4yLTI5M0wyNjAuOC02MSAxLjgtNzIuN3oiLz48cGF0aCBmaWxsPSJpdm9yeSIgZD0iTTM2NSA4NDkuOUw0NDEgMzYybC01MTMuNyA3NDYuOCA3NSAxMjQuNXoiLz48cGF0aCBmaWxsPSIjNjgzYjFjIiBkPSJNODk0LTcyLjdMMzg2IDcwLjdsMjMxLjQgMTIwMi0xNS4yLTExMjJ6Ii8+PHBhdGggZmlsbD0iI2ZmY2ZiMyIgZD0iTTQ0OCA5MS4zbC03OC40IDM1MEwyNzYuNi0xbDI5MC4yLTcxLjZ6Ii8+PHBhdGggZmlsbD0iI2NmZThlOSIgZD0iTTQ1My44IDEwODkuOGwtMjcxIDg5LjQtMzAuNiA5My41TDU1MyAxMDg5Ljl6Ii8+PHBhdGggZmlsbD0iI2QzYjhhMCIgZD0iTTU0Ny42IDIwOC4yTDc0OC41IDcwOWwxOTItNTAxLjZMNjM0LjEgODkuMXoiLz48cGF0aCBmaWxsPSIjMTMyNzI5IiBkPSJNNzI4LjQgNzg3LjJsMjA2LjMgMzgzLjItNzMwLjYgMTAyLjMgMzQ3LjctMTQxLjR6Ii8+PHBhdGggZmlsbD0iIzE1MGIwMiIgZD0iTTU0Mi43LTcyLjdsMzI0LjcgMjIuMUw0MDQgMjYwLjNsMTU0LjItMTAuOXoiLz48cGF0aCBmaWxsPSIjNTM4MzkwIiBkPSJNMTAyOSAxMDk5LjhsLTI5Ny41LTI4MiAxMDcuNS05MCAxNzEuNyA0NC4yeiIvPjxwYXRoIGZpbGw9IiNhOTgzNGEiIGQ9Ik0zMDUuNCA5NzQuN2wtMjY2IDI0Ni45IDI3OS04NC41IDIwMi40LTcwNC40eiIvPjxwYXRoIGZpbGw9IiM5OTZjMzMiIGQ9Ik0xMDUgODA1bDIwMC4zLTU3NS40TDE0NCA4OTQuOS03Mi43IDk5Ny44eiIvPjxwYXRoIGZpbGw9IiNmZmZhZjAiIGQ9Ik0yMzAuNiAxMDIzbDI1Ny45LTY0Ni0xNDUuOC0xMS4yLTEzMCAyODkuM3oiLz48cGF0aCBmaWxsPSIjYzlhODg3IiBkPSJNNTE1LjkgMzkwLjFMMzg1LjMgMjEzLjZsNDAuMyAzMzEuN0w4NDIgNjIzLjV6Ii8+PHBhdGggZmlsbD0iIzAwMGEwNyIgZD0iTTMxOC4xIDI0Ny44bC0zOTAuOCA0MjYgMjExLTc0Ni41IDE1Ni4xIDQ5My44eiIvPjxwYXRoIGZpbGw9IiM2ZjUwMmEiIGQ9Ik0xMDI5IDcxMS43TDM4NyA4MTMuNmw1MzUuNi0zMjIuMUw5NDQtMzcuM3oiLz48cGF0aCBmaWxsPSIjZmZlMGJmIiBkPSJNLTcyLjcgOTg2bDM4LjggMjg2LjcgMzUwLjgtMzM1IDgwLTE3My42eiIvPjxwYXRoIGZpbGw9IiNkZjNhMDAiIGQ9Ik01MTkuMSA1Ni4ybC05Mi4zIDU0LjYtNjUuNCA4Mi41IDYwLjUtMTU0Ljd6Ii8+PHBhdGggZmlsbD0iIzQyMGQwMCIgZD0iTTQyMy45IDIzMC41TDU0NiAyOTEuN2wtNDMuMS0xMDcgODAuNy0yNTcuNHoiLz48cGF0aCBmaWxsPSIjNTY0MTI1IiBkPSJNNDg1LjEgNTY0LjVMNTQ0IDYwMGwyMTcgMTk5LjQtMzAzLjcgMzg3eiIvPjxwYXRoIGZpbGw9IiNkY2JhYTIiIGQ9Ik02MDguNyAzMTkuNEwzNjUgMzEzLjNsNDYwLjMtODIuOEw1NDkgMTY3Ljd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTUyMi4yLTcyLjdsLTU3LjQgMzEuNEwzNTQuNyA2Ny4zbC0xNC4zIDg0Ljl6Ii8+PHBhdGggZmlsbD0iIzE2MTkxMCIgZD0iTTcwNC40IDE0MS45bDY4LjQtMTE3LTMzNy05Ny42TDc2NiAxMjQuNXoiLz48cGF0aCBmaWxsPSIjOWE5MTdkIiBkPSJNMjQ3IDEwMC4ybDEwOCAxNzkuNEwyNTUuNyA1MjkgMzQ0LTUwLjV6Ii8+PHBhdGggZmlsbD0iIzlhNzM1MCIgZD0iTTU0Ni41IDE4OC43TDEwMTItNzIuNyA3NDguNCAxNTkuNSA1MDcuMiA0Ni44eiIvPjxwYXRoIGZpbGw9IiNhNTg3NjciIGQ9Ik05NjQuNSAyNTcuOEw4OTAuOC00MC4xbC0yNyAzMTRMNzgyIDcyNy4yeiIvPjxwYXRoIGZpbGw9IiNkZGVhZTgiIGQ9Ik0yNjYuNiAxMTM1LjdsLTE2LjUgMzUuOEw3NC42IDEyNDVsNDAzLjctMTM0eiIvPjxwYXRoIGZpbGw9IiMxYzE2MDAiIGQ9Ik0tNzIuNyA1NzAuNGwxMDYgMjk0LjIgOTYuMy01NiAzNS42LTEwNS40eiIvPjxwYXRoIGZpbGw9IiNhMTg5NWEiIGQ9Ik00NjUuMSA3ODcuNGwtNTUuOC05MyA3NC0yOTMuNCA1My45LTE0Ljd6Ii8+PC9nPjwvc3ZnPg==");
        background-repeat: no-repeat;
        background-size: cover;
    }
    @media only screen and (min-width: 1024px) {
        div {
            width: 25.8vmax;
            height: 33vmax;
        }
    }
</style>
