<script>
  import Logo from "$lib/components/logo.svelte";
  import { page } from '$app/stores'; 
  import { onMount } from 'svelte';
  
  let isMenuOpen = false;
  let credits = 100;
let authToken;
  $: isDashboard = $page.url.pathname.startsWith('/dashboard') || $page.url.pathname.startsWith('/settings');
    function logout() {
    authToken = localStorage.removeItem('auth_token') || '';
    sessionStorage.clear();
      window.location.href = '/auth';
      
  }
  
</script>
<nav class="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/50 border-b border-gray-800">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center gap-6">
        <Logo />
        {#if isDashboard}
          <div class="hidden md:flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20">
            <svg class="w-4 h-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-300">{credits} credits remaining</span>
          </div>
        {/if}
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6">
        {#if isDashboard}
          <a 
            href="/dashboard" 
            class="text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </a>
          <a 
            href="/settings" 
            class="text-gray-300 hover:text-white transition-colors"
          >
            Settings
          </a>
          <button 
            class="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        {:else}
          <a 
            href="#features" 
            class="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a 
            href="/login" 
            class="text-gray-300 hover:text-white transition-colors"
          >
            Login
          </a>
          <a 
            href="/signup" 
            class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign up
          </a>
        {/if}
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden"
        on:click={() => isMenuOpen = !isMenuOpen}
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div class="md:hidden absolute w-full bg-black/95 backdrop-blur-xl border-b border-gray-800">
      <div class="flex flex-col p-4 gap-4">
        {#if isDashboard}
          <div class="flex items-center px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/20">
            <svg class="w-4 h-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-300">{credits} credits remaining</span>
          </div>
          <a href="/dashboard" class="text-gray-300 hover:text-white">Dashboard</a>
          <a href="/settings" class="text-gray-300 hover:text-white">Settings</a>
          <button on:click={logout} class="flex items-center text-red-400 hover:text-red-300">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        {:else}
          <a href="#features" class="text-gray-300 hover:text-white">Features</a>
          <a href="#howitworks" class="text-gray-300 hover:text-white">How it
          works</a>
          <a href="/login" class="text-gray-300 hover:text-white">Login</a>
          <a href="/signup" class="px-4 py-2 font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
          hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5 
          focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-black
          transition-all duration-200 shadow-lg shadow-blue-500/25">
            Sign up
          </a>
        {/if}
      </div>
    </div>
  {/if}
</nav>