<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import Nav from "$lib/components/nav.svelte";
  import Toast from "$lib/components/ToastM.svelte";
  import PageLoader from "$lib/components/pageLoader.svelte";
  import { isLoading } from '$lib/stores/loading';
  
  let { children } = $props();

  // Reset loading state on mount
  onMount(() => {
    const timer = setTimeout(() => {
      isLoading.set(false);
    }, 3000);

    return () => clearTimeout(timer);
  });

  // Handle page navigation loading
  let currentPath: string;
  $effect(() => {
    // Get current path from window.location
    const path = window.location.pathname;
    if (currentPath && currentPath !== path) {
      // Path changed, show loader
      isLoading.set(true);
      setTimeout(() => {
        isLoading.set(false);
      }, 1500); // Shorter duration for navigation
    }
    currentPath = path;
  });
</script>

{#if $isLoading}
  <PageLoader on:load={() => isLoading.set(false)} />
{:else}
  <div class="min-h-screen flex flex-col">
    <Nav />
    <main class="flex-1">
      {@render children()}
    </main>
    <Toast />
  </div>
{/if}