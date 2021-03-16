<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div>
    <WindowElement
        width={300}
        height={164}
        parallax="transform: translateZ(-0.3px) scale(1.6) translate(-35%, -60%); transform-origin: 0 0;"
        background="#5E4B1B"
        title="COOKIES"
        enlargeable={false}
        id={9}
        isInForeground={true}
    >
        <p>
            Your privacy is important to us, therefore we don’t use any tracking
            services by third-parties. <br /><br /> Please read our Privacy Policy
            for more info on this subject!
        </p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 61/85;
        grid-row: 105/119;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        color: #151515;
        font-size: 16px;
        margin: 0px;
        padding: 7px;
    }

    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 60/81;
            grid-row: 105/116;
        }
    }
</style>
