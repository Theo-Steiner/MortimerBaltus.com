<script>
    import { onDestroy } from "svelte";
    import windowHandler from "../UX/window-state";

    export let gridColumnStart;
    export let gridColumnEnd;
    export let gridRowStart;
    export let gridRowEnd;
    export let largeGridColumnStart = 0;
    export let largeGridColumnEnd = 0;
    export let largeGridRowStart = 0;
    export let largeGridRowEnd = 0;
    export let backgroundColor = "";
    export let title;
    export let enlargeable = true;
    export let id;
    export let isInForeground = true;
    export let intersections = [];
    export let intersectingSide = null;
    export let distanceFromIntersection = 20;
    export let largeDistanceFromIntersection = 10;
    distanceFromIntersection = distanceFromIntersection * 1.25;
    largeDistanceFromIntersection = largeDistanceFromIntersection * 1.25;

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
    style="--gridColumnStart: {gridColumnStart}; --gridColumnEnd: {gridColumnEnd}; --gridRowStart: {gridRowStart}; --gridRowEnd: {gridRowEnd};
     --largeGridColumnStart: {largeGridColumnStart}; --largeGridColumnEnd: {largeGridColumnEnd}; --largeGridRowStart: {largeGridRowStart}; --largeGridRowEnd: {largeGridRowEnd};
     --shuffledistance: {distanceFromIntersection}vmax; --largeshuffledistance: {largeDistanceFromIntersection}vmax; position: relative; z-index: {zIndex};"
    on:click={handleWindowClick}
    class:trigger-shuffle-right={!isInForeground &&
        intersectingSide === "right" &&
        touched}
    class:trigger-shuffle-left={!isInForeground &&
        intersectingSide === "left" &&
        touched}
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
    <article
        class:no-events={!isInForeground}
        style="background-color: {backgroundColor};"
    >
        <slot><p>Content goes here</p></slot>
    </article>
    <footer />
</section>

<style>
    section {
        border: 0.2vmax solid #fefefe;
        border-radius: 5px;
        background-color: #fefefe;
        color: #fefefe;
        overflow: hidden;
        margin: 0;
        padding: 0;
        transition: z-index 0.2s;
        grid-column: var(--gridColumnStart) / var(--gridColumnEnd);
        grid-row: var(--gridRowStart) / var(--gridRowEnd);
    }

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.2vmax solid #fefefe;
        background-color: #151515;
        padding: 1vmax;
        margin: 0px;
    }
    .disabled {
        visibility: hidden;
    }
    button {
        width: 6.5vmax;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 2px;
        padding: 0;
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
        font-size: 2vmax;
    }
    /* Section: Border Top+ Bottom (2* 0.2) 0.4vmax + Header: Padding 2vmax, Text 2vmax, Borderbottom 0.2vmax = 4.6vmax vertikal fehlen und 0.4 horizontal */
    article {
        height: 100%;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }

    .no-events {
        pointer-events: none;
    }

    @keyframes shuffle-right {
        0% {
            right: 0;
        }
        50% {
            right: var(--shuffledistance);
        }
        100% {
            right: 0;
        }
    }

    .trigger-shuffle-right {
        animation-name: shuffle-right;
        animation-duration: 0.4s;
        animation-timing-function: ease-in-out;
    }

    @keyframes shuffle-left {
        0% {
            left: 0;
        }
        50% {
            left: var(--shuffledistance);
        }
        100% {
            left: 0;
        }
    }

    .trigger-shuffle-left {
        animation-name: shuffle-left;
        animation-duration: 0.4s;
        animation-timing-function: ease;
    }
    /* 2,96 vmax vertikal und 0,23 horizontal */
    @media only screen and (min-width: 1024px) {
        section {
            grid-column: var(--largeGridColumnStart) / var(--largeGridColumnEnd);
            grid-row: var(--largeGridRowStart) / var(--largeGridRowEnd);
            border-width: 0.13vmax;
        }
        header {
            padding: 0.7vmax;
            border-width: 0.13vmax;
        }
        button {
            width: 4.3vmax;
        }
        h1 {
            font-size: 1.3vmax;
        }

        svg {
            stroke-width: 2;
        }

        @keyframes shuffle-left {
            0% {
                left: 0;
            }
            50% {
                left: var(--largeshuffledistance);
            }
            100% {
                left: 0;
            }
        }
        @keyframes shuffle-right {
            0% {
                right: 0;
            }
            50% {
                right: var(--largeshuffledistance);
            }
            100% {
                right: 0;
            }
        }
    }
</style>
