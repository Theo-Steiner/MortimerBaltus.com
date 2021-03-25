<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div class="grid-area">
    <WindowElement
        width={268}
        height={158}
        parallax="very-slow"
        background="#1C6370"
        title="LEGAL NOTICE"
        id={7}
        isInForeground={true}
    >
        <p>
            You like boring legal texts and bureaucracy? <br /><br /> We've got you
            covered!
        </p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 16/38;
        grid-row: 173/187;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        display: block;
        height: 133px;
        width: 266px;
        color: #fefefe;
        font-size: 21px;
        margin: 0px;
        padding: 14px 8px 14px 8px;
    }
    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 15/33;
            grid-row: 172/183;
        }
    }
</style>
