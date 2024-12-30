<script>
  import { onMount } from 'svelte';
  import 'aos/dist/aos.css';
  import AOS from 'aos';

const features = [
    {
        icon: 'fa-solid fa-bolt',
        title: 'Lightning Fast',
        description: 'Get your summaries in as little as 10 to 20 seconds. The AI ensures quick processing regardless of summary type.',
        aosDelay: '0'
    },
    {
        icon: 'fa-solid fa-brain',
        title: 'AI-Powered Precision',
        description: 'Our fine-tuned AI accurately extracts key details, ensuring concise and meaningful summaries every time.',
        aosDelay: '100'
    },
    {
        icon: 'fa-solid fa-file-lines',
        title: 'Page-Based Summaries',
        description: 'Summarize up to 10 pages of content with a system that adapts to various styles and content needs.',
        aosDelay: '200'
    },
    {
        icon: 'fa-solid fa-coins',
        title: 'Credit-Based Model',
        description: 'Use a simple credit system where one summary equals one credit. Start with 10 free credits and purchase more as needed.',
        aosDelay: '300'
    },
    {
        icon: 'fa-solid fa-file-pdf',
        title: 'All PDF Formats Supported',
        description: 'Summarize academic papers, business reports, or any PDF type. The system adapts seamlessly to your documents.',
        aosDelay: '400'
    },
    {
        icon: 'fa-solid fa-wand-magic-sparkles',
        title: 'Customizable Outputs',
        description: 'Get summaries tailored to your style and format, whether you need concise overviews or structured breakdowns.',
        aosDelay: '500'
    }
];
const faqs = [
    {
        question: 'How accurate are the AI-generated summaries?',
        answer: 'The summaries are based on a fine-tuned AI model designed to deliver the best results. It has been optimized for accuracy, retaining the core meaning of the content.',
        aosDelay: '0'
    },
    {
        question: 'What types of PDFs can be summarized?',
        answer: 'Any PDF format is supported, including academic papers, business reports, and technical documentation. The AI adapts to various content styles without bias.',
        aosDelay: '100'
    },
    {
        question: 'What summary lengths are available?',
        answer: 'You can summarize up to 10 pages and adjust the output to your preferred style. Options include concise, structured, or exploratory summaries.',
        aosDelay: '200'
    },
    {
        question: 'Do I need to subscribe to use this service?',
        answer: 'No subscription is required. The system uses a credit-based model, offering 10 free credits. You can purchase more credits as needed.',
        aosDelay: '300'
    },
    {
        question: 'Is there a limit to file size?',
        answer: 'Currently, files up to 20 MB in size are supported. For larger files, splitting the document into smaller parts is recommended.',
        aosDelay: '400'
    },
    {
        question: 'How does the credit system work?',
        answer: 'Each summary consumes one credit, regardless of the summary style or document details. You can purchase any number of credits based on your needs.',
        aosDelay: '500'
    },
    {
        question: 'How fast can I get my summaries?',
        answer: 'The speed depends on the number of pages, the PDF size, and the summary type. Short summaries take less time. Generally, you can expect your summary within 10 to 20 seconds.',
        aosDelay: '600'
    }
];  let activeIndex = -1;

  onMount(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  });

  function toggleFaq(index) {
    activeIndex = activeIndex === index ? -1 : index;
  }
</script>

<!-- Features Section -->
<div id="features" class="py-24 relative">
  <div class="max-w-7xl mx-auto px-4">
    <h2 
      class="text-3xl md:text-5xl font-bold text-center mb-16 glow bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
      data-aos="fade-up"
    >
      Why Choose Brevity
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div 
          class="group relative"
          data-aos="fade-up"
          data-aos-delay={feature.aosDelay}
        >
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

<!-- FAQ Section -->
<div id="faq" class="py-24 relative">
  <div class="max-w-4xl mx-auto px-4">
    <h2 
      class="text-3xl md:text-5xl font-bold text-center mb-16 glow bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
      data-aos="fade-up"
    >
      Frequently Asked Questions
    </h2>
    <div class="space-y-6">
      {#each faqs as faq, index}
        <div 
          class="relative"
          data-aos="fade-up"
          data-aos-delay={faq.aosDelay}
        >
          <button
            class="w-full text-left p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            on:click={() => toggleFaq(index)}
          >
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-white pr-8">{faq.question}</h3>
              <i class="fa-solid {activeIndex === index ? 'fa-minus' : 'fa-plus'} text-blue-400 transition-transform duration-300"></i>
            </div>
            {#if activeIndex === index}
              <p class="mt-4 text-gray-400 leading-relaxed animation-slide-down">
                {faq.answer}
              </p>
            {/if}
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .glow {
    text-shadow: 0 0 80px rgb(59 130 246 / 0.3);
  }

  .animation-slide-down {
    animation: slideDown 0.3s ease-out forwards;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>