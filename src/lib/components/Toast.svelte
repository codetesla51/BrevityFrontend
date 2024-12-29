<!-- Toast.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Props
  export let message = '';
  export let type = 'info'; // 'success', 'error', 'warning', 'info'
  export let position = 'bottom-right'; // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  export let duration = 3000; // milliseconds, 0 for no auto-close
  export let showLoader = false;
  export let closeManually = false;
  
  // Internal state
  let visible = false;
  let progress = 100;
  let timer;
  let progressTimer;
  
  // Icon mapping
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };
  
  // Color mapping for mesh gradients
  const gradients = {
    success: 'from-green-900 to-green-800',
    error: 'from-red-900 to-red-800',
    warning: 'from-yellow-900 to-yellow-800',
    info: 'from-blue-900 to-blue-800'
  };
  
  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'


  };
  
  onMount(() => {
    visible = true;
    
    if (duration && !closeManually) {
      timer = setTimeout(close, duration);
      
      // Progress bar animation
      const step = 10;
      const totalSteps = duration / step;
      const progressStep = 100 / totalSteps;
      
      progressTimer = setInterval(() => {
        progress = Math.max(0, progress - progressStep);
      }, step);
    }
  });
  
  onDestroy(() => {
    clearTimeout(timer);
    clearInterval(progressTimer);
  });
  
  function close() {
    visible = false;
    clearTimeout(timer);
    clearInterval(progressTimer);
    setTimeout(() => {
      dispatch('close');
    }, 300); // Wait for fade out animation
  }
  
  function dispatch(event) {
    const customEvent = new CustomEvent(event, {
      detail: { type, message }
    });
    document.dispatchEvent(customEvent);
  }
</script>

<div
  class="fixed z-50 min-w-[300px] max-w-[400px] {positionClasses[position]} transition-all duration-300"
  class:opacity-0={!visible}
  class:translate-x-full={!visible && position.includes('right')}
  class:translate-x-[-100%]={!visible && position.includes('left')}
>
  <div class="relative overflow-hidden rounded-lg bg-gradient-to-r {gradients[type]} shadow-lg">
    <div class="flex items-center p-4">
      <i class="fas {icons[type]} mr-3 text-xl text-white"></i>
      <div class="flex-grow text-white">{message}</div>
      {#if closeManually}
        <button 
          class="ml-3 text-white hover:text-gray-200"
          on:click={close}
        >
          <i class="fas fa-times"></i>
        </button>
      {/if}
    </div>
    
    {#if showLoader && progress > 0}
      <div class="absolute bottom-0 left-0 h-1 w-full bg-black bg-opacity-20">
        <div
          class="h-full bg-white transition-all duration-75"
          style="width: {progress}%"
        ></div>
      </div>
    {/if}
  </div>
</div>

