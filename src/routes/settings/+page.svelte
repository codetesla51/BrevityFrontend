

<script>
  import { onMount } from 'svelte';

  let user = {
    name: '',
    email: '',
    notifications: {
      emailUpdates: true,
      processingComplete: true,
      newFeatures: false
    }
  };
  
  let loading = false;
  let saved = false;
  
  onMount(async () => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      user = await response.json();
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  });

  async function handleSubmit() {
    loading = true;
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(user)
      });
      
      if (response.ok) {
        saved = true;
        setTimeout(() => saved = false, 2000);
        toast.success('Settings saved successfully!');
      }
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      loading = false;
    }
  }
</script>

<div class="hero-gradient min-h-screen relative overflow-hidden flex items-center justify-center p-6">
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Settings
      </h1>
      <p class="mt-2 text-gray-400">Manage your account preferences and notifications</p>
    </div>

    <div class="space-y-8">
      <!-- Profile Section -->
      <div class="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <h2 class="text-xl font-semibold text-white mb-6">Profile Information</h2>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              bind:value={user.name}
              class="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-gray-100 
              placeholder-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 
              transition-all duration-200"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              bind:value={user.email}
              class="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-gray-100 
              placeholder-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 
              transition-all duration-200"
            />
          </div>
        </div>
      </div>


      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          on:click={handleSubmit}
          disabled={loading}
          class="relative group px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
          text-white font-medium hover:from-blue-500 hover:to-purple-500 transform 
          hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
        >
          {#if loading}
            <span class="flex items-center gap-2">
              <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Saving...
            </span>
          {:else if saved}
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Saved
            </span>
          {:else}
            Save Changes
          {/if}
          <div class="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
      </div>
    </div>
  </div>

  <!-- Background Effects -->
  <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
  <div class="absolute -left-20 top-1/4 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl" />
  <div class="absolute -right-20 top-3/4 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl" />
  
</div>