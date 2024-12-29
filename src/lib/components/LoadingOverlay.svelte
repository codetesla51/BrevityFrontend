<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let isVisible = false;
  export let onCancel = () => {};  

  let message = "We're processing your document...";
  let timeouts = [];
  
  const messages = [
    { time: 10000, text: "Please hang in there, we're still working..." },
    { time: 30000, text: "This is taking longer than usual, but we're on it!" },
    { time: 60000, text: "Large documents may take a few minutes to process..." },
    { time: 120000, text: "Thank you for your patience, we're still processing..." },
    { time: 180000, text: "Almost done, please bear with us a little longer!" },
    { time: 240000, text: "We appreciate your patience during this process." },
    { time: 300000, text: "Great things take time, and we're nearly there!" },
    { time: 360000, text: "Just a few more moments, thank you for sticking with us!" },
    { time: 420000, text: "“Patience is not simply the ability to wait – it's how we behave while we're waiting.” – Joyce Meyer" },
    { time: 480000, text: "“Good things come to those who wait, but better things come to those who work for it.” – Anonymous" },
    { time: 600000, text: "Processing large documents and multiple pages may take a bit longer." },
    { time: 720000, text: "The more pages or content there are, the longer it will take to process. We appreciate your patience!" }
  ];  
  
  $: if (isVisible) {
    timeouts = messages.map(({ time, text }) => 
      setTimeout(() => message = text, time)
    );

    setTimeout(() => {
      handleCancel();  
    }, 600000); 
  }

  const handleCancel = () => {
    onCancel();      
    isVisible = false; 
    timeouts.forEach(timeout => clearTimeout(timeout)); 
  };

  onDestroy(() => {
    timeouts.forEach(timeout => clearTimeout(timeout)); 
  });
</script>

{#if isVisible}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Blur overlay -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-md" />
    
    <!-- Content container -->
    <div class="relative bg-gray-900/80 p-8 rounded-xl border border-gray-700 shadow-2xl max-w-md w-full mx-4">
      <!-- Loading spinner -->
      <div class="flex justify-center mb-6">
        <div class="relative w-20 h-20">
          <!-- Outer rotating ring -->
          <div class="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-spin" 
               style="animation-duration: 3s;" />
          
          <!-- Inner spinning gradient -->
          <div class="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-spin blur-sm"
               style="animation-duration: 2s;" />
          
          <!-- Center dot -->
          <div class="absolute inset-[35%] bg-white rounded-full animate-pulse" />
        </div>
      </div>
      
      <!-- Message -->
      <p class="text-white text-center mb-6 animate-pulse">
        {message}
      </p>
      
      <!-- Cancel button -->
      <div class="flex justify-center">
        <button
          on:click={handleCancel}
          class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 
                 rounded-lg text-red-300 transition-colors duration-200"
        >
          Cancel Process
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add any additional styles here if needed */
</style>