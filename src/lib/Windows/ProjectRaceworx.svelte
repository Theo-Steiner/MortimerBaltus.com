<script>
    import WindowElement from "../UI/WindowElement.svelte";
    import ImageLoader from "../UX/ImageLoader.svelte";

    const slug = "MortimerBaltus/Projects/Raceworx_wfjyou";
</script>

<div class="grid-area">
    <WindowElement
        width={499}
        height={392}
        parallax="very-fast"
        background={'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg5NiI+PHBhdGggZmlsbD0iIzdiNzY3NSIgZD0iTTAgMGgxMjgwdjg5NUgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiMwYjAwMDAiIGQ9Ik05NjYgODA5LjZsLS40LTYzMy44TDYyMCAxNTYuNGwtMjkuNSA1OTcuMnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAzLjItNzcuNUwxMzU3LjUgOC42bC0yOTQuNyA4MTMuNSAxNy42LTY0MC4zeiIvPjxwYXRoIGZpbGw9IiMwMDAzMGMiIGQ9Ik0xMzAuNCA4NC43bC0xNi42IDQ2NCAyMjcuNCA2IDExNi42LTM2My4xeiIvPjxwYXRoIGZpbGw9IiNmY2ZmZjciIGQ9Ik0tNDIuOSA1NjQuMWwyNTEuMyA0OS4xIDM5Mi45IDI0LjIgOC4xLTEwNC40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik04NjQuOSAzNS40bDQ5Mi42IDI4Ni41Vi0xNS45TDk4OC03Ny41eiIvPjxwYXRoIGZpbGw9IiNkMWM5YmIiIGQ9Ik0xOS42IDQ5NC42bC05Ny4xIDM4MkwxMjI5LjMgODQyIDE1MyA3MjkuNXoiLz48cGF0aCBmaWxsPSIjYmFiOWIyIiBkPSJNMTM1Ny41IDc3Ny45bC0zMzEuMi02MS41TDk5Mi44IDU0NCAxMjc1IDM2N3oiLz48cGF0aCBmaWxsPSIjZDZlMmUzIiBkPSJNNTk5LjYgMzYxbDUuNCAxMzEuM0w0MjQuMiA1MTFsMTMuMy0xNDAuM3oiLz48cGF0aCBkPSJNNjIuMiA2MTQuNmw0ODEuOCAxOSA0MDkuOSA1NS03NDQuMi0zNi45eiIvPjxwYXRoIGZpbGw9IiM2MDYxNjUiIGQ9Ik03MjkuNS0yNC41bDMwNC45IDI4Mi4zIDQxLjIgNzkuNSAyODEuOSA2eiIvPjxwYXRoIGZpbGw9IiM0MTE4MTkiIGQ9Ik01NDIuNyA5Ny41bDQzMS45IDYxNy4yTDEzNTcuNSA4MTZsLTY2OS44LTI5LjR6Ii8+PHBhdGggZD0iTTEzMy43IDIxNy42bDUxLjQgOTQuOEwxNTEuMyA3MzVsLTI0LjctNi4yeiIvPjxwYXRoIGZpbGw9IiNiN2I1YjgiIGQ9Ik00ODIuNyA2OC4zbDE0My43LTUyLjUgNDAyIDEyOS44TDY1NCAxNzh6Ii8+PHBhdGggZmlsbD0iIzQxNDc0ZSIgZD0iTTEyMzMuOCA1NDYuMmwxMC42LTQ5LjEtMzkyLTQ4LjQgMjU3LjUgMTA3LjJ6Ii8+PHBhdGggZmlsbD0iIzUzNTI1OCIgZD0iTTE3My4zIDM3LjdsLTI1MC44IDI2MiAxOTEuMiAzTDkwMyAyMjIuMnoiLz48cGF0aCBmaWxsPSIjZDlkZWQwIiBkPSJNNTg2LjEgNzExLjZsLTMzNS05LjJMMTUxIDY1MC4ybDQ3MCAzMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTE5MS4xIDQ4NGwtMTI1LTkuOCAxNi44LTEyMy4zIDEzMCA0eiIvPjxwYXRoIGZpbGw9IiNmOGY5ZWIiIGQ9Ik0xMzU3LjUgOTcyLjVWODQ0LjdMMzUxLjIgNzY5LjNsOTQ2LjQgMTA0eiIvPjxwYXRoIGZpbGw9IiM4MDE3MTciIGQ9Ik04OTIuNiA2MDEuNmwtMi40LTI1NC40LTE1Ny0xMi43LTU3LjYgMzUxeiIvPjxwYXRoIGZpbGw9IiMyODIzMmEiIGQ9Ik03NSA1MDNMNDAuNyAyNTguNCAzNi44IDU0NyA3NTUgMzg1LjR6Ii8+PHBhdGggZmlsbD0iIzA1MDQwYiIgZD0iTTUzNS45IDIyOC45TDc4NS4xIDE4OGwtMTE1LTEwLjQtNDgwLjcgNDAuMnoiLz48cGF0aCBmaWxsPSIjZGFkNWNmIiBkPSJNMTI5LjMgNTU4LjZsLTIwNi44LTMzLjVMLTQ4IDc4OS44bDE3MC0xMjF6Ii8+PHBhdGggZmlsbD0iI2U3ZjNlYyIgZD0iTTk2NSA0MTguN2wyNS42LTI3Ny4zLS4yIDI4Ni4yLTEzLjUgOTAuN3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTM1Ny41LTQxLjRMODk1LjMtNzcuNWwtOS41IDEzOC42TDEzMjguNiAyNTF6Ii8+PHBhdGggZmlsbD0iIzg5OGQ4ZCIgZD0iTTM5OS4yIDUzNy41bDYuNi0yNzAgMzg0LjYtNTItNDU5IDI1LjN6Ii8+PHBhdGggZmlsbD0iIzAxMDAwOCIgZD0iTTIzOS42IDI0OS42TDI1NSA2MC43bC02Ni4zLTQuMyA2LjUgMTc5LjJ6Ii8+PHBhdGggZmlsbD0iIzE0MTQxOCIgZD0iTTgxMC40IDc1Ny44bDM1MC4zIDEzLjgtMTg1IDMwLjktNDkuMS01NzguOHoiLz48cGF0aCBmaWxsPSIjMTgyMTI3IiBkPSJNMjEzIDI2MC45bDIxNy4yIDI3MC44LTIyMi42IDI3LjZMMjI2LjQgNzczeiIvPjxwYXRoIGZpbGw9IiM4Zjg2N2QiIGQ9Ik0xNS40IDk3Mi41bDEzNDIuMS05NC42LTczMi42LTcyLjdMLTIwIDc0Mi42eiIvPjxwYXRoIGZpbGw9IiMxYzI0MmEiIGQ9Ik01MzUuOSA1NDEuMmw5OS42IDE0LjYtMzYtNjQuOC02OS41LTUuNnoiLz48cGF0aCBmaWxsPSIjYjNiMmFjIiBkPSJNOTk1LjUgMTkwbDEwMi4xIDM0MiAyNTkuOSAxNDkuMi0zMzkuNCAxMnoiLz48cGF0aCBmaWxsPSIjYmFiZGMzIiBkPSJNMjUgMTA5TDkuMyAxNzkuNSAyMTEtNzcuNWw3OCA4NC40eiIvPjwvZz48L3N2Zz4=")'}
        title="PROJECT_02"
        id={2}
        isInForeground={true}
    >
        <ImageLoader
            sizes="497px"
            srcset="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug} 1280w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_497,f_auto,q_auto:best/{slug} 497w,
            https://res.cloudinary.com/thdrstnr/image/upload/w_312,f_auto,q_auto:best/{slug} 312w,"
            alt="Raceworx"
            src="https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/{slug}"
        />
    </WindowElement>
</div>

<style>
    div {
        grid-column: 34/75;
        grid-row: 124/156;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 35/69;
            grid-row: 124/151;
        }
    }
</style>
