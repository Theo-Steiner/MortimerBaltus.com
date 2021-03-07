<script>
    import WindowElement from "../UI/FixedWindowElement.svelte";
</script>

<div>
    <WindowElement
        width={{ base: 218, small: 300 }}
        height={{ base: 119, small: 164 }}
        background="#5E4B1B"
        title="COOKIES"
        enlargeable={false}
        id={9}
        isInForeground={true}
    >
        <p>
            <span
                >We use necessary Cookies to ensure visitors have the best
                possible experience on our site.</span
            >
            <br />Your privacy is important to us, therefore we don’t use any
            tracking services by third-parties. <br /> Please read our Privacy Policy
            for more info on this subject!
        </p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 55/81;
        grid-row: 103/118;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span {
        display: none;
    }

    p {
        color: #151515;
        font-size: 13px;
        margin: 0px;
        padding: 6px;
    }
    @media only screen and (min-width: 640px) {
        div {
            grid-column: 63/83;
            grid-row: 109/120;
        }
        span {
            display: inline;
        }
    }
    p {
        color: #151515;
        font-size: 14px;
        margin: 0px;
        padding: 7px;
    }
</style>
