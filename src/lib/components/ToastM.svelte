<script>
  import { onMount } from 'svelte';
  import Toast from './Toast.svelte';
  
  let toasts = [];
  let toastId = 0;
  
  // Toast creation function
  function createToast({
    message,
    type = 'info',
    position = 'bottom-right',
    duration = 3000,
    showLoader = true,
    closeManually = false
  }) {
    const id = toastId++;
    const toast = {
      id,
      message,
      type,
      position,
      duration,
      showLoader,
      closeManually
    };
    
    toasts = [...toasts, toast];
    return id;
  }
  
  // Toast removal function
  function removeToast(id) {
    toasts = toasts.filter(t => t.id !== id);
  }
  
  // Expose functions globally
  onMount(() => {
    window.toast = {
      success: (message, options = {}) => 
        createToast({ message, type: 'success', ...options }),
      error: (message, options = {}) => 
        createToast({ message, type: 'error', ...options }),
      warning: (message, options = {}) => 
        createToast({ message, type: 'warning', ...options }),
      info: (message, options = {}) => 
        createToast({ message, type: 'info', ...options })
    };
  });
</script>

{#each toasts as toast (toast.id)}
  <Toast
    {...toast}
    on:close={() => removeToast(toast.id)}
  />
{/each}