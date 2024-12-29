<script>
  const features = [
    {
      icon: 'fa-solid fa-bolt',
      title: 'Lightning Fast',
      description: 'Get comprehensive summaries of your PDFs in seconds, not hours. Our AI processes documents at incredible speeds.'
    },
    {
      icon: 'fa-solid fa-brain',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms understand context and extract the most relevant information from your documents.'
    },
    {
      icon: 'fa-solid fa-wand-magic-sparkles',
      title: 'Smart Formatting',
      description: 'Receive perfectly formatted summaries with key points, highlights, and main takeaways clearly organized.'
    },
    {
      icon: 'fa-solid fa-chart-simple',
      title: 'Custom Length',
      description: 'Choose your preferred summary length, from quick overviews to detailed breakdowns.'
    },
    {
      icon: 'fa-solid fa-lock',
      title: 'Secure & Private',
      description: 'Your documents are encrypted and automatically deleted after processing. Your privacy is our priority.'
    },
    {
      icon: 'fa-solid fa-code',
      title: 'API Access',
      description: 'Integrate our summarization capabilities directly into your workflow with our developer-friendly API.'
    }
  ];

</script>
  <div id="features" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl md:text-5xl font-bold text-center mb-16 glow bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Why Choose Brevity
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-500"></div>
            
            <div class="relative bg-black/20 rounded-xl backdrop-blur-sm border border-gray-800 group-hover:border-blue-500/50 transition-all duration-300 p-6">
              <div class="flex items-center space-x-6">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i class="{feature.icon} text-blue-400 text-xl"></i>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p class="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>