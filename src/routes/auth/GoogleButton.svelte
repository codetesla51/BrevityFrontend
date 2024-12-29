<script>
  import Loader from "$lib/components/processloader.svelte";
  export let isLoading = false;
  export let onClick;
  export let text = "Continue with Google";
</script>

<button
  type="button"
  on:click={onClick}
  disabled={isLoading}
  class="w-full mt-4 py-3 px-4 rounded-lg border-0 border-blue-500
         hover:bg-blue-500/10 transition-all duration-200 flex items-center
         justify-center gap-3 text-white disabled:opacity-40
         disabled:cursor-not-allowed"
>
  {#if isLoading}
    <Loader size="1.5rem" speed="2s" color="#fff" />
  {/if}
  <svg class="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21.35 10.04C21.35 9.59 21.31 9.15 21.23 8.73H12.18V11.51H17.32C17.13 12.49 16.54 13.33 15.67 13.89V15.87H18.45C20.19 14.27 21.35 12.35 21.35 10.04Z"/>
    <path fill="currentColor" d="M12.18 21C14.67 21 16.77 20.19 18.45 18.87L15.67 16.89C14.91 17.39 13.68 17.69 12.18 17.69C9.55 17.69 7.32 15.94 6.47 13.55H3.59V15.59C5.26 18.77 8.46 21 12.18 21Z"/>
    <path fill="currentColor" d="M6.47 13.55C6.32 13.05 6.23 12.52 6.23 11.97C6.23 11.42 6.32 10.89 6.47 10.39V8.35H3.59C2.91 9.7 2.5 11.21 2.5 12.8C2.5 14.39 2.91 15.9 3.59 17.25L6.47 15.21V13.55Z"/>
    <path fill="currentColor" d="M12.18 6.25C13.77 6.25 15.19 6.79 16.31 7.86L18.78 5.39C16.77 3.51 14.67 2.5 12.18 2.5C8.46 2.5 5.26 4.73 3.59 7.91L6.47 9.95C7.32 7.56 9.55 5.81 12.18 5.81V6.25Z"/>
  </svg>
  {text}
</button>
