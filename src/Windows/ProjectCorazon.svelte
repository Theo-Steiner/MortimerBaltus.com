<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={110}
    gridColumnEnd={150}
    gridRowStart={130}
    gridRowEnd={180}
    title="PROJECT_01"
    id={1}
    isInForeground={false}
    intersections={[0]}
    intersectingSide="right"
>
    <div
        style="background-image: url('images/ConCorazon.jpg');"
        title="Con Corazón is embracing artisans from countries at war"
    />
</WindowElement>

<style>
    div {
        width: 40vmax;
        height: 46vmax;
        background-size: cover;
    }
</style>
