<!-- routes/credits.svelte -->
<script>
  import { onMount } from 'svelte';
  import { checkAuthentication } from "$lib/utils/isAuth.js";
  
  let credits = 0;
  let pricePerCredit = 200; // 100 Naira per credit
  let totalPrice = 0;
  let isAuthenticated = false;
  let isProcessing = false;

  $: totalPrice = credits * pricePerCredit;

  const handlePurchase = async () => {
    if (!credits || credits <= 0) {
      toast.error('Please enter a valid number of credits');
      return;
    }

    try {
      isProcessing = true;
      let token = localStorage.getItem('auth_token');
      
      if (token && token.includes('|')) {
        token = token.split('|')[1];
      }

      const response = await fetch('http://127.0.0.1:8000/api/purchaseCredits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits,
          amount: totalPrice
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Purchase failed');
      }

      const data = await response.json();
      toast.success('Purchase successful!');
      credits = 0; // Reset form
      
    } catch (error) {
      toast.error(error.message || 'Failed to process purchase');
    } finally {
      isProcessing = false;
    }
  };

  onMount(() => {
    isAuthenticated = checkAuthentication();
  });
</script>

{#if isAuthenticated}
  <div class="hero-gradient min-h-screen relative overflow-hidden p-6 mt-20">
    <div class="w-full max-w-4xl mx-auto space-y-8">
      <div class="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
          Purchase Credits
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Input Section -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">
                Number of Credits
              </label>
              <input
                type="number"
                bind:value={credits}
                min="1"
                class="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200"
                placeholder="Enter amount of credits"
              />
            </div>
            
            <button
              on:click={handlePurchase}
              disabled={isProcessing || credits <= 0}
              class="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium
                hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-black
                transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              {isProcessing ? 'Processing...' : 'Purchase Credits'}
            </button>
          </div>
          
          <!-- Price Calculation Section -->
          <div class="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/20">
            <h3 class="text-xl font-semibold text-white mb-4">Price Summary</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between text-gray-400">
                <span>Price per Credit:</span>
                <span>₦{pricePerCredit.toLocaleString()}</span>
              </div>
              
              <div class="flex justify-between text-gray-400">
                <span>Number of Credits:</span>
                <span>{credits || 0}</span>
              </div>
              
              <div class="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>
              
              <div class="flex justify-between text-xl font-semibold text-white">
                <span>Total Price:</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Background Elements -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    <div class="absolute -left-20 top-1/4 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
    <div class="absolute -right-20 top-3/4 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl"></div>
  </div>
{/if}

<style>
  .hero-gradient {
    background: linear-gradient(to bottom, #000000, #090909);
  }
</style>