<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div>
    <WindowElement
        width={347}
        height={314}
        parallax="transform: translateZ(-0.7px) scale(2.4) translate(230%, -65%); transform-origin: 0 0;"
        background="#5F583D"
        title="References"
        enlargeable={false}
        id={4}
        isInForeground={true}
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
</div>

<style>
    div {
        grid-column: 153/181;
        grid-row: 116/142;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    a {
        color: #151515;
        font-size: 15px;
        margin: 0px;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline #a25c24;
    }

    ul {
        list-style-type: none;
        padding: 10px 0px 13px 11px;
        margin: 0;
    }
    li {
        padding-top: 1px;
    }

    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 154/178;
            grid-row: 116/137;
        }
    }
</style>
