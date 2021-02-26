<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={159}
    gridColumnEnd={199}
    gridRowStart={25}
    gridRowEnd={75}
    backgroundColor="#5F583D"
    title="References"
    enlargeable={false}
    id={4}
    isInForeground={true}
    intersections={[11]}
    intersectingSide="left"
    distanceFromIntersection={31}
>
    <ul>
        <li><a href="www.reference.com">Bureau Johannes Erler</a></li>
        <li><a href="www.reference.com">CarlNann</a></li>
        <li><a href="www.reference.com">Con Corazón</a></li>
        <li>
            <a href="www.reference.com">Düsseldorfer Schauspielhaus</a>
        </li>
        <li><a href="www.reference.com">Eberhard Müller Consulting</a></li>
        <li><a href="www.reference.com">Fargo</a></li>
        <li><a href="www.reference.com">Konica Minolta</a></li>
        <li><a href="www.reference.com">Morgenbladet</a></li>
        <li><a href="www.reference.com">Otto Group</a></li>
        <li>
            <a href="www.reference.com">Staatsschauspielhaus Dresden</a>
        </li>
        <li><a href="www.reference.com">Steiner Am Fluss</a></li>
        <li><a href="www.reference.com">Suhrkamp</a></li>
        <li><a href="www.reference.com">Zoeva</a></li>
    </ul>
</WindowElement>

<style>
    a {
        color: #151515;
        font-size: 2.4vmax;
        margin: 0px;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline #a25c24;
    }

    ul {
        list-style-type: none;
        padding: 0 2vmax 0 1vmax;
        margin: 0;
    }
    li {
        padding-top: 0.5vmax;
    }
</style>
