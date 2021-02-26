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

<div
    class="top-left"
    on:mouseenter={() => {
        initiateScrolling(-1, -1);
    }}
    on:mouseleave={terminateScrolling}
>
    <div class="horizontal" />
    <div class="vertical" />
</div>

<div
    class="top-right"
    on:mouseenter={() => {
        initiateScrolling(1, -1);
    }}
    on:mouseleave={terminateScrolling}
>
    <div class="horizontal" />
    <div class="vertical" />
</div>

<div
    class="bottom-left"
    on:mouseenter={() => {
        initiateScrolling(-1, 1);
    }}
    on:mouseleave={terminateScrolling}
>
    <div class="horizontal" />
    <div class="vertical" />
</div>

<div
    class="bottom-right"
    on:mouseenter={() => {
        initiateScrolling(1, 1);
    }}
    on:mouseleave={terminateScrolling}
>
    <div class="horizontal" />
    <div class="vertical" />
</div>

<!--Richtig points="0,100 100,0 100,100" -->
<style>
    div {
        position: fixed;
        visibility: hidden;
        z-index: 9999;
    }

    .horizontal {
        height: 1vmax;
        width: 7em;
        position: inherit;
        top: inherit;
        right: inherit;
        left: inherit;
        bottom: inherit;
    }

    .vertical {
        width: 1vmax;
        height: 7em;
        position: inherit;
        top: inherit;
        right: inherit;
        left: inherit;
        bottom: inherit;
    }

    .top {
        width: calc(100vw - 14em);
        height: 1vmax;
        top: 0;
        left: 7em;
    }

    .bottom {
        width: calc(100vw - 14em);
        height: 1vmax;
        bottom: 0;
        left: 7em;
    }

    .left {
        width: 1vmax;
        height: calc(100vh - 14em);
        left: 0;
        top: 7em;
    }

    .right {
        width: 1vmax;
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
