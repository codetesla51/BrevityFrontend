<script>
  import { onMount } from 'svelte';
  import Button from "$lib/components/buttons.svelte";
  import Features from "$lib/components/features.svelte";
  	import Footer from "$lib/components/footer.svelte"

  let isVisible = false;
  onMount(() => isVisible = true);


  const steps = [
    {
      number: '01',
      title: 'Upload Your PDF',
      description: 'Simply drag and drop your PDF file into our secure platform.'
    },
    {
      number: '02',
      title: 'Choose Settings',
      description: 'Select your preferred summary length and style to match your needs.'
    },
    {
      number: '03',
      title: 'Get Summary',
      description: 'Receive your AI-generated summary in seconds, ready to use.'
    }
  ];
</script>

<div class="hero-gradient min-h-screen">
  <!-- Hero Section -->
  <div class="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
    <div class="absolute inset-0 grid-background opacity-20"></div>
    
    <div class="relative z-10 max-w-5xl mx-auto text-center space-y-8">
      <div class="inline-block animate-float">
        <div class="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 text-sm text-blue-400">
          🚀 Powered by Advanced AI Technology
        </div>
      </div>

      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight glow">
        Transform Long PDFs into
        <span class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Clear Summaries. Instantly.
        </span>
      </h1>

      <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Brevity uses advanced AI to analyze and summarize your PDF documents in seconds. 
        Get the key insights without the information overload.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button text="Start Free" icon="fa-solid fa-wand-sparkles" link="auth" />
        
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    <div class="absolute -left-20 top-1/4 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
    <div class="absolute -right-20 top-3/4 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
  </div>

  <!-- Features Section -->

<Features/>
  <!-- How It Works Section -->
  <div class="py-24 relative" id="howitworks">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl md:text-5xl font-bold text-center mb-16 glow bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        How It Works
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each steps as step}
          <div class="relative p-6 rounded-2xl bg-black/20 border border-gray-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
            <div class="text-6xl font-bold text-gray-800 absolute -top-6 -left-4 opacity-20">
              {step.number}
            </div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p class="text-gray-400">{step.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- CTA Section -->
  <div class="py-24 relative">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <div class="p-8 rounded-2xl bg-gradient-to-r from-blue-500/10
      to-purple-500/10 border border-blue-500/20 backdrop-blur-sm flex
      justify-center items-center flex-col">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Save Hours of Reading Time?
        </h2>
        <p class="text-gray-400 mb-8">
          Join thousands of professionals who use Brevity to extract insights faster.
        </p>
        <Button text="Get Started" icon="fa-solid fa-wand-sparkles" link="auth" />
      </div>
    </div>
  </div>
</div>

<style>
  .glow {
    text-shadow: 0 0 80px rgb(59 130 246 / 0.3);
  }
  .hero-gradient {
    background: linear-gradient(to bottom, #000000, #090909);
  }
  .grid-background {
    background-image: radial-gradient(rgba(59, 130, 246, 0.1) 2px, transparent 2px);
    background-size: 40px 40px;
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
</style>