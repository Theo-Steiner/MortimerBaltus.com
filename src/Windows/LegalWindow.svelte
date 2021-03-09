<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div>
    <WindowElement
        width={{ base: 268, small: 268 }}
        height={{ base: 158, small: 158 }}
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
        grid-column: 11/43;
        grid-row: 165/184;
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
    @media only screen and (min-width: 640px) {
        div {
            grid-column: 15/34;
            grid-row: 180/191;
        }
    }
    @media only screen and (min-width: 1020px) {
        div {
            grid-column: 16/38;
            grid-row: 173/187;
        }
    }
</style>
