<script>
    let xMovement = 0;
    let yMovement = 0;
    function initiateScrolling(xSpeed, ySpeed) {
        xMovement = xSpeed;
        yMovement = ySpeed;
        setTimeout(() => {
            const scrollInterval = setInterval(() => {
                if (xMovement === xSpeed && yMovement === ySpeed) {
                    window.scrollBy(xSpeed, ySpeed);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 5);
        }, 100);
    }
    function terminateScrolling() {
        xMovement = 0;
        yMovement = 0;
    }
</script>

<div
    class="top"
    on:mouseenter={() => {
        initiateScrolling(0, -1);
    }}
    on:mouseleave={terminateScrolling}
/>
<div
    class="bottom"
    on:mouseenter={() => {
        initiateScrolling(0, 1);
    }}
    on:mouseleave={terminateScrolling}
/>
<div
    class="left"
    on:mouseenter={() => {
        initiateScrolling(-1, 0);
    }}
    on:mouseleave={terminateScrolling}
/>
<div
    class="right"
    on:mouseenter={() => {
        initiateScrolling(1, 0);
    }}
    on:mouseleave={terminateScrolling}
/>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    class="top-left"
>
    <polygon
        points="0,0 0,100 100,0"
        on:mouseenter={() => {
            initiateScrolling(-1, -1);
        }}
        on:mouseleave={terminateScrolling}
    />
</svg>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    class="top-right"
>
    <polygon
        points="100,100 0,0 100,0"
        on:mouseenter={() => {
            initiateScrolling(1, -1);
        }}
        on:mouseleave={terminateScrolling}
    />
</svg>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    class="bottom-left"
>
    <polygon
        points="100,100 0,0 0,100"
        on:mouseenter={() => {
            initiateScrolling(-1, 1);
        }}
        on:mouseleave={terminateScrolling}
    />
</svg>
<!--Richtig points="0,100 100,0 100,100" -->
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    class="bottom-right"
>
    <polygon
        points="0,100 100,0 100,100"
        on:mouseenter={() => {
            initiateScrolling(1, 1);
        }}
        on:mouseleave={terminateScrolling}
    />
</svg>

<!--Richtig points="0,100 100,0 100,100" -->
<style>
    svg {
        position: fixed;
        width: 7em;
        visibility: hidden;
        pointer-events: none;
    }

    polygon {
        pointer-events: all;
    }

    div {
        position: fixed;
    }

    .top {
        width: calc(100vw - 14em);
        height: 2.5em;
        top: 0;
        left: 7em;
    }

    .bottom {
        width: calc(100vw - 14em);
        height: 2.5em;
        bottom: 0;
        left: 7em;
    }

    .left {
        width: 2.5em;
        height: calc(100vh - 14em);
        left: 0;
        top: 7em;
    }

    .right {
        width: 2.5em;
        height: calc(100vh - 14em);
        right: 0;
        top: 7em;
    }
    .top-left {
        top: 0;
        left: 0;
    }
    .top-right {
        top: 0;
        right: 0;
    }
    .bottom-left {
        bottom: 0;
        left: 0;
    }
    .bottom-right {
        bottom: 0;
        right: 0;
    }
</style>
