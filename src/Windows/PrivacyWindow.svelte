<script>
    import WindowElement from "../UI/WindowElement.svelte";
</script>

<div class="grid-area">
    <WindowElement
        width={288}
        height={207}
        parallax="very-slow"
        background="#FEC7A3"
        title="PRIVACY POLICY"
        id={5}
        isInForeground={true}
    >
        <p>
            Eager to find out how browser-data is handled on our Website? <br />
            <br /> Surely this is just your cup of tea...
        </p>
    </WindowElement>
</div>

<style>
    div {
        grid-column: 142/166;
        grid-row: 175/193;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        color: #151515;
        font-size: 24px;
        margin: 0px;
        padding: 10px;
    }

    @media only screen and (min-width: 1440px) {
        div {
            grid-column: 143/163;
            grid-row: 170/184;
        }
    }
</style>
