<script>
    import IntersectionObserver from "./IntersectionObserver.svelte";
    import Image from "../UI/Image.svelte";
    import { onMount } from "svelte";
    export let src;
    export let alt;
    export let sizes;
    export let srcset;
    let nativeLoading = false; // Determine whether to bypass our intersecting check
    onMount(() => {
        if ("loading" in HTMLImageElement.prototype) {
            nativeLoading = true;
        }
    });
</script>

<IntersectionObserver once={true} let:intersecting>
    {#if intersecting || nativeLoading}
        <Image {srcset} {sizes} {alt} {src} />
    {/if}
</IntersectionObserver>
