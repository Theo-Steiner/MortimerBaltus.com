<script>
    import WindowElement from "../UI/WindowElement.svelte";
    import { slide } from "svelte/transition";

    let view = "overview";

    const moritzmoji =
        "data:image/jpeg;base64,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";
    const theomoji =
        "data:image/png;base64,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";
</script>

<div class="wrapper grid-area">
    <WindowElement
        width={378}
        height={313}
        parallax="very-slow"
        background="#EFEFEF"
        title="CONTACT"
        id={14}
        enlargeable={false}
    >
        <div class="container">
            {#if view === "overview"}
                <div class="contact-container" out:slide={{ duration: 300 }}>
                    <h1>
                        GET IN <br />TOUCH
                    </h1>
                    <hr />
                    <div
                        class="contact"
                        on:click={() => {
                            view = "moritz";
                        }}
                    >
                        <img
                            src={moritzmoji}
                            alt="Moritz Mortimer Müller as a Memoji"
                            draggable="false"
                        />
                        <p>Moritz Mortimer (DE)</p>
                    </div>
                    <hr />
                    <div
                        class="contact"
                        on:click={() => {
                            view = "theo";
                        }}
                    >
                        <img
                            src={theomoji}
                            alt="Theodor Baltus Steiner as a Memoji"
                            draggable="false"
                        />
                        <p>Theodor Baltus (JP)</p>
                    </div>
                </div>
            {:else}
                <div class="message-container" out:slide={{ duration: 300 }}>
                    <div class="message">
                        <img
                            src={view === "moritz" ? moritzmoji : theomoji}
                            alt={view === "moritz"
                                ? "Moritz Mortimer Müller as a Memoji"
                                : "Theodor Baltus Steiner as a Memoji"}
                            class="message-img"
                            draggable="false"
                            on:click={() => {
                                view = "overview";
                            }}
                        />
                        <p class="message-bubble">Hi, nice to meet you!</p>
                    </div>
                    <button>Send Email</button>
                </div>
            {/if}
        </div>
    </WindowElement>
</div>

<style>
    .wrapper {
        grid-column: 11/42;
        grid-row: 11/37;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        height: 279px;
        width: 376px;
    }

    button {
        width: 100%;
        border: none;
        border-top: 1px solid #ffffff;
        background-color: #c7c7c7;
        height: 54px;
        font-size: 20px;
        color: #151515;
    }
    button:hover {
        background-color: #fefefe;
    }

    .message-img {
        margin-top: 10px;
    }
    .message-bubble {
        color: #ffffff;
        background-color: #5a8bf3;
        border-radius: 20px;
        margin-left: 10px;
        margin-top: 10px;
    }

    .message-container {
        height: 279px;
        width: 376px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .message {
        height: 76px;
        padding-left: 10px;
        display: flex;
        align-items: center;
    }

    .contact-container {
        padding: 2px;
    }

    .contact {
        height: 76px;
        padding-left: 10px;
        display: flex;
        align-items: center;
    }
    .contact:hover {
        background-color: #fefefe;
    }

    img {
        border-radius: 50%;
        padding: 0;
        margin: 0;
        height: 54px;
        width: 54px;
    }

    h1 {
        font-size: 54px;
        color: #151515;
        margin-top: 10px;
        margin-bottom: 4px;
        margin-left: 14px;
    }

    p {
        color: #151515;
        font-size: 20px;
        margin: 0px;
        padding: 10px;
    }
</style>
