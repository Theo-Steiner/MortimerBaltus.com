<script>
    function heroView(node) {
        // node.scrollIntoView()
        // node.classList.remove("hero-view");
        window.requestAnimationFrame(() => node.scrollIntoView());
    }

    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }
</script>

<section>
    <div class="hero-view" use:heroView />
</section>

<style>
    section {
        grid-row: 60/160;
        grid-column: 60/160;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .hero-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }
</style>
