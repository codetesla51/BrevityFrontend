<script>
  export let duration = 3000;
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  onMount(() => {
    const timer = setTimeout(() => {
      dispatch('load');
    }, duration);

    return () => clearTimeout(timer);
  });
</script>

<div class="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#090909]">
  <!-- Grid Background -->
  <div 
    class="absolute inset-0 opacity-20"
    style="background-image: radial-gradient(rgba(59, 130, 246, 0.1) 2px, transparent 2px); background-size: 40px 40px;"
  />
  
  <!-- Glow Effects -->
  <div class="absolute -left-20 top-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
  <div class="absolute -right-20 top-3/4 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
  
  <!-- Logo Container -->
  <div class="relative z-[899] flex flex-col items-center">
    <!-- Animated Logo -->
    <div class="w-20 h-20 mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 animate-bounce">
      <div class="h-full w-full bg-black rounded-xl p-4">
        <svg class="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
    </div>
    
    <!-- Loading Bar -->
    <div class="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
      <div class="loading-bar" />
    </div>
    
    <!-- Loading Text -->
    <div class="mt-4 text-sm text-gray-400 animate-pulse">
      Loading...
    </div>
  </div>
</div>

<style>
  .loading-bar {
    height: 100%;
    background: linear-gradient(to right, #3B82F6, #9333EA);
    border-radius: 9999px;
    animation: loading-bar 1.5s ease-in-out infinite;
  }

  @keyframes loading-bar {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  :global(.animate-bounce) {
    animation: bounce 1s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-10%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
</style>