<script>
  import { onMount } from 'svelte';
  
  let showButton = false;
  let loading = false;

  onMount(async () => {
    try {
      const response = await fetch('/api/check-credits-eligibility');
      const { eligible } = await response.json();
      showButton = eligible;
    } catch (error) {
      console.error('Failed to check credits eligibility:', error);
    }
  });

  async function handleClick() {
    loading = true;
    try {
      const response = await fetch('/api/claim-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (response.ok) {
        showButton = false;
        toast.success('Credits claimed successfully!');
      }
    } catch (error) {
      toast.error('Failed to claim credits');
    } finally {
      loading = false;
    }
  }
</script>

{#if showButton}
  <button
    on:click={handleClick}
    disabled={loading}
    class="fixed bottom-8 right-8 group flex items-center gap-2 px-6 py-3 rounded-xl 
    bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium
    hover:from-blue-500 hover:to-purple-500 transform hover:-translate-y-0.5 
    transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50"
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    {loading ? 'Claiming...' : 'Claim Free Credits'}
    <div class="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </button>
{/if}