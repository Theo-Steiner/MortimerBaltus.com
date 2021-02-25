<script>
    import { afterUpdate } from "svelte";
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
    <div class="hero-view" use:heroView>
        <img src="images/MortimerBaltus_Logo.svg" alt="Mortimer/Baltus" />
        <h1>CREATIVE SERVICES & DIGITAL DEVELOPMENT</h1>
        <h1>c/o MORITZ MORTIMER MÜLLER (DE), THEODOR BALTUS STEINER (JP)</h1>
    </div>
</section>

<style>
    img {
        margin-bottom: 8vh;
    }
    section {
        grid-row: 60/160;
        grid-column: 60/160;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        text-align: center;
        color: white;
        font-size: 1.5vmax;
    }

    .hero-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        padding: 20vh 20vw;
    }
</style>
