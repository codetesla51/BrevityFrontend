<script>
  export let value = '';
  export let placeholder = 'Password';
  export let error = '';
  
  let showPassword = false;
  
  const toggleVisibility = () => {
    showPassword = !showPassword;
  };
</script>

<div class="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    {placeholder}
    bind:value
    class="mt-5 w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-gray-100 
           placeholder-gray-500 backdrop-blur-xl focus:outline-none focus:ring-2 
           focus:ring-blue-500 focus:border-transparent transition-all duration-200"
  />
  <button
    type="button"
    class="absolute right-3 top-[2.9em] -translate-y-1/2 text-gray-200 hover:text-white 
           transition-colors duration-200"
    on:click={toggleVisibility}
  >
    <i class={showPassword ? 'fas fa-eye-slash text-gray-200 hover:text-white' : 'fas fa-eye text-gray-200 hover:text-white '}></i>
  </button>
</div>
{#if error}
  <p class="text-red-500 text-sm mt-1">{error}</p>
{/if}

