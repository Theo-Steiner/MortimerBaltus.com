<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<WindowElement
    gridColumnStart={40}
    gridColumnEnd={70}
    gridRowStart={65}
    gridRowEnd={90}
    largeGridColumnStart={40}
    largeGridColumnEnd={60}
    largeGridRowStart={70}
    largeGridRowEnd={87}
    backgroundColor="#5E4B1B"
    title="COOKIES"
    enlargeable={false}
    id={9}
    isInForeground={true}
    intersections={[8]}
    intersectingSide="left"
    distanceFromIntersection={21}
    largeDistanceFromIntersection={6}
>
    <p>
        We use necessary cookies to ensure visitors have the best possible
        experience on our site. Your privacy is important to us, therefore we
        don’t use any tracking services by third-parties. <br /> Please read our
        Privacy Policy for more info on this
    </p>
</WindowElement>

<style>
    p {
        color: #151515;
        font-size: 2vmax;
        margin: 0px;
        padding: 0.5vmax;
    }
    @media only screen and (min-width: 1024px) {
        p {
            font-size: 1.35vmax;
            padding: 0.3vmax;
        }
    }
</style>
