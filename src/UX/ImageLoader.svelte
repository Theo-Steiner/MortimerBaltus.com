<script>
    export let src;
    export let alt;
    export let sizes;
    export let srcset;
    import IntersectionObserver from "./IntersectionObserver.svelte";
    import Image from "../UI/Image.svelte";
</script>

<IntersectionObserver once={true} let:intersecting>
    {#if intersecting}
        <Image {srcset} {sizes} {alt} {src} />
    {/if}
</IntersectionObserver>
