<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={110}
    gridColumnEnd={148}
    gridRowStart={130}
    gridRowEnd={180}
    title="PROJECT_01"
    id={1}
    isInForeground={false}
    intersections={[0]}
    intersectingSide="right"
>
    <img
        src="images/ConCorazon.jpg"
        alt="Con Corazón is embracing artisans from countries at war"
    />
</WindowElement>

<style>
    img {
        width: 100%;
    }
</style>
