<script>
    import WindowElement from "../UI/WindowElement.svelte";

    let languageSelected = "english";

    function changeLanguage() {
        languageSelected =
            languageSelected === "english" ? "japanese" : "english";
    }
</script>

<div class="wrapper grid-area">
    <WindowElement
        width={266}
        height={273}
        parallax="very-slow"
        background="#C96161"
        title="LANGUAGE"
        id={13}
        enlargeable={false}
    >
        <div class="container" on:click={changeLanguage}>
            <div
                class="animation-wrap"
                class:hidden={languageSelected === "japanese"}
            >
                <div id="layer1">あ</div>
                <div id="layer2">A</div>
                <div id="layer3">あ</div>
                <div id="layerX">A</div>
                <div id="layer4">あ</div>
                <div id="layer5">A</div>
            </div>
            <div
                class="animation-wrap"
                class:hidden={languageSelected === "english"}
            >
                <div id="layer1">A</div>
                <div id="layer2">あ</div>
                <div id="layer3">A</div>
                <div id="layerX">あ</div>
                <div id="layer4">A</div>
                <div id="layer5">あ</div>
            </div>
        </div>
    </WindowElement>
</div>

<style>
    .wrapper {
        grid-column: 113/135;
        grid-row: 33/55;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .animation-wrap {
        width: 266px;
        height: 273px;
        background: rgb(201, 97, 97);
        color: #aa4545;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 220px;
        line-height: 200px;
        font-weight: 400;
        font-family: sans-serif;
        transition: 0.2s ease;
    }

    .animation-wrap:hover {
        background: #aa4545;
        color: rgb(201, 97, 97);
    }

    #layer2,
    #layer1,
    #layer3,
    #layer4,
    #layer5,
    #layerX {
        position: absolute;
        text-align: center;
        animation-fill-mode: forwards;
        animation-duration: 3s;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.83, 0, 0.17, 1);
        transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }

    #layer2 {
        animation-name: layer2;
    }

    #layer1 {
        animation-name: layer1;
    }

    #layer3 {
        animation-name: layer3;
    }
    #layer4 {
        animation-name: layer4;
    }
    #layer5 {
        animation-name: layer5;
    }

    #layerX {
        animation-name: layerX;
    }

    @keyframes layer1 {
        0% {
            transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
        }
        20% {
            transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
        }
        100% {
            transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
        }
    }

    @keyframes layer2 {
        0% {
            transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
        }
        20% {
            transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
        }
        40% {
            transform: translate(-133px, 0px) rotateY(-90deg) rotateZ(-180deg);
        }
        100% {
            transform: translate(-133px, 0px) rotateY(-90deg) rotateZ(-180deg);
        }
    }

    @keyframes layer3 {
        0% {
            transform: translate(133px, 0px) rotateX(-90deg) rotateY(-90deg)
                rotateZ(0deg);
        }

        20% {
            transform: translate(133px, 0px) rotateX(-90deg) rotateY(-90deg)
                rotateZ(0deg);
        }

        40% {
            transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg)
                rotateZ(0deg);
        }
        60% {
            transform: translate(0px, -133px) rotateX(90deg) rotateY(0deg)
                rotateZ(-90deg);
        }
        100% {
            transform: translate(0px, -133px) rotateX(90deg) rotateY(0deg)
                rotateZ(-90deg);
        }
    }

    @keyframes layerX {
        0% {
            transform: translate(0px, 133px) rotateX(-90deg) rotateZ(180deg);
        }
        40% {
            transform: translate(0px, 133px) rotateX(-90deg) rotateZ(180deg);
        }
        60% {
            transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg)
                rotateZ(0deg);
        }
        80% {
            transform: translate(133px, 0px) rotateX(0deg) rotateY(90deg)
                rotateZ(180deg);
        }
        100% {
            transform: translate(133px, 0px) rotateX(0deg) rotateY(90deg)
                rotateZ(180deg);
        }
    }

    @keyframes layer4 {
        0% {
            transform: translate(-133px, 0px) rotateY(90deg) rotateZ(-90deg);
        }
        60% {
            transform: translate(-133px, 0px) rotateY(90deg) rotateZ(-90deg);
        }
        80% {
            transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
        }
        100% {
            transform: translate(0px, 133px) rotateX(-90deg) rotateZ(-90deg);
        }
    }
    @keyframes layer5 {
        0% {
            transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
        }

        80% {
            transform: translate(0px, -133px) rotateX(90deg) rotateZ(-180deg);
        }

        100% {
            transform: translate(0px, 0px) rotateX(0deg) rotateZ(0deg);
        }
    }

    .hidden {
        display: none;
    }
</style>
