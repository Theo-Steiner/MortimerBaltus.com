<script>
    import { onDestroy } from "svelte";
    import { scale } from "svelte/transition";
    import windowHandler from "../UX/window-state";

    export let height;
    export let width;
    export let parallax;
    export let background = "";
    export let title;
    export let enlargeable = true;
    export let id;
    export let isInForeground = true;
    export let intersections = [];
    export let distanceFromIntersection = 20;

    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        parallax = "";
    }

    let touched = false;
    let zIndex = 5;
    let thisWindowObject;
    windowHandler.registerWindow({
        id: id,
        zIndex: zIndex,
        isInForeground: isInForeground,
        intersections: intersections,
        touched: touched,
    });

    const unsubscribe = windowHandler.subscribe((windows) => {
        thisWindowObject = windows.find((wdws) => wdws.id === id);
        isInForeground = thisWindowObject.isInForeground;
        zIndex = thisWindowObject.zIndex;
        touched = thisWindowObject.touched;
    });

    function handleWindowClick() {
        if (isInForeground) {
        } else {
            windowHandler.bringToForeground(id);
        }
    }

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
</script>

<section
    in:scale={{
        duration: 1200,
    }}
    class={parallax}
    style="--windowWidth: {width}; --windowHeight: {height};
    --baseShuffleDistance: {distanceFromIntersection.base}; --largeShuffleDistance: {distanceFromIntersection.large};
    z-index: {zIndex};"
    on:click={handleWindowClick}
    class:trigger-shuffle={!isInForeground && touched}
>
    <header>
        <button class="shrink">
            <span>Shrink this {title} window</span>
            <svg
                version="1.1"
                viewBox="0 0 54 15"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
            >
                <title>Group 7</title>
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(-615 -1492)">
                        <g transform="translate(606 1483)">
                            <g transform="translate(9 9)">
                                <rect
                                    x=".5"
                                    y=".5"
                                    width="53"
                                    height="14"
                                    rx="3"
                                    fill="#151515"
                                    stroke="#FEFEFE"
                                />
                                <rect
                                    x="17"
                                    y="7"
                                    width="20"
                                    height="1"
                                    fill="#FEFEFE"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </button>
        {#if title}
            <h1>{title}</h1>
        {:else}
            <h1>Title</h1>
        {/if}
        {#if enlargeable}
            <button class="enlarge">
                <span>Enlarge this {title} window</span>
                <svg
                    version="1.1"
                    viewBox="0 0 54 15"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                >
                    <title>Group 6</title>
                    <g fill="none" fill-rule="evenodd">
                        <g transform="translate(-1042 -1492)">
                            <g transform="translate(606 1483)">
                                <g transform="translate(436 9)">
                                    <rect
                                        x=".5"
                                        y=".5"
                                        width="53"
                                        height="14"
                                        rx="3"
                                        fill="#151515"
                                        stroke="#FEFEFE"
                                    />
                                    <rect
                                        x="17"
                                        y="6"
                                        width="20"
                                        height="1"
                                        fill="#FEFEFE"
                                    />
                                    <polygon
                                        points="47 7 37 4 37 7"
                                        fill="#FEFEFE"
                                    />
                                    <rect
                                        transform="translate(27 8.5) rotate(180) translate(-27 -8.5)"
                                        x="17"
                                        y="8"
                                        width="20"
                                        height="1"
                                        fill="#FEFEFE"
                                    />
                                    <polygon
                                        transform="translate(12 9.5) rotate(180) translate(-12 -9.5)"
                                        points="17 11 7 8 7 11"
                                        fill="#FEFEFE"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
        {:else}
            <button class="disabled" />
        {/if}
    </header>
    <div
        class:no-events={!isInForeground}
        style="background: {background}; background-size: cover;"
    >
        <slot><p>Content goes here</p></slot>
    </div>
    <footer />
</section>

<style>
    section {
        pointer-events: auto;
        user-select: none;
        position: relative;
        top: 0px;
        width: calc(var(--windowWidth) * 1px);
        height: calc(var(--windowHeight) * 1px);
        border: 1px solid #fefefe;
        border-radius: 6px;
        color: #fefefe;
        overflow: hidden;
        margin: 0px;
        padding: 0px;
        transition: z-index 0.2s;
    }

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #fefefe;
        background-color: #151515;
        padding: 0px;
        margin: 0px;
    }
    .disabled {
        visibility: hidden;
    }
    button {
        width: 54px;
        height: 15px;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 6px;
        padding: 0;
        margin: 8px;
    }
    button:hover {
        transform: scale(1.05);
    }
    button:active {
        transform: scale(1);
    }
    button:focus {
        box-shadow: 0 0 0 1px #a25c24;
        outline: none;
    }
    svg {
        outline: none;
        width: 100%;
        height: 100%;
    }

    span {
        overflow: hidden;
        height: 1px;
        width: 1px;
        position: absolute;
    }

    h1 {
        margin: 0;
        font-size: 13px;
    }
    div {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0px;
        margin: 0px;
        border-radius: 0px 0px 6px 6px;
    }

    .no-events {
        pointer-events: none;
    }

    @keyframes shuffle {
        0% {
            right: 0;
        }
        50% {
            right: calc(
                (var(--baseShuffleDistance) * max(3080px, 220vmax) / 200 * 2)
            );
        }
        100% {
            right: 0;
        }
    }

    .trigger-shuffle {
        animation-name: shuffle;
        animation-duration: 0.4s;
        animation-timing-function: ease-in-out;
    }

    /* Different parallax speeds. translateZ has to be a positive value in order to prevent Safari rendering bug*/

    .very-slow {
        transform: translateZ(1.2px) scale(0.88);
        transform-origin: bottom right;
    }

    .slowish {
        transform: translateZ(1px) scale(0.9);
        transform-origin: bottom right;
    }

    .slow {
        transform: translateZ(0.8px) scale(0.92);
        transform-origin: bottom right;
    }
    .medium {
        transform: translateZ(0.6px) scale(0.94);
        transform-origin: bottom right;
    }
    .fast {
        transform: translateZ(0.4px) scale(0.96);
        transform-origin: bottom right;
    }
    .very-fast {
        transform: translateZ(0.2px) scale(0.98);
        transform-origin: bottom right;
    }

    @media only screen and (min-width: 1440px) {
        @keyframes shuffle {
            0% {
                right: 0;
            }
            50% {
                right: calc(
                    (
                        var(--largeShuffleDistance) * min(4000px, 200vmax) / 200 *
                            1.25
                    )
                );
            }
            100% {
                right: 0;
            }
        }
    }
    @media only screen and (min-width: 2000px) {
        section {
            transform: none;
            transform-origin: none;
        }
    }
</style>
