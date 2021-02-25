<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={40}
    gridColumnEnd={70}
    gridRowStart={100}
    gridRowEnd={120}
    backgroundColor="#5E4B1B"
    title="COOKIES"
    enlargeable={false}
    id={9}
    isInForeground={true}
    intersections={[8]}
    intersectingSide="left"
>
    <p>
        As with real cookies, not all browser cookies are created equal. Some
        websites feed your browser cookies to track your behavior online. We
        value your privacy, therefore we only use cookies to ensure you can use
        our page as intended! <br /> <br /> Please read our Privacy Policy for more
        informations on this subject.
    </p>
</WindowElement>

<style>
    p {
        color: #151515;
        font-size: 1.5vmax;
        margin: 0px;
        padding: 0.5vmax;
    }
</style>
