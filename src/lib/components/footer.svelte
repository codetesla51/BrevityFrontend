<script>
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Twitter', icon: 'fa-brands fa-x-twitter', href: 'https://x.com/uthman_dev?s=09' },
    { name: 'GitHub', icon: 'fa-brands fa-github', href: 'https://github.com/codetesla51' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', href: 'https://www.linkedin.com/in/oladele-uthman-a61578298' }
  ];
</script>

<footer class="bg-black/50 backdrop-blur-lg border-t border-gray-800">
  <div class="container mx-auto px-6 py-12">
    <div class="flex flex-col items-center space-y-8 mb-12">
      <!-- Brand Section -->
      <div class="text-center max-w-md">
        <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Brevity
        </h2>
        <p class="text-gray-400 text-sm">
          Transform your PDFs into clear, concise summaries using advanced AI technology. Save time and extract key insights instantly.
        </p>
      </div>

      <!-- Social Links -->
      <div class="flex items-center gap-6">
        {#each socialLinks as link}
          <a
            href={link.href}
            class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
          >
            <i class={`${link.icon} text-lg`}></i>
            <span class="text-sm">{link.name}</span>
          </a>
        {/each}
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="pt-8 border-t border-gray-800 text-center">
      <p class="text-gray-400 text-sm mb-4">
        © {currentYear} Brevity. All rights reserved.
      </p>
      <div class="flex items-center justify-center gap-2 text-sm text-gray-400">
        <span>Made with</span>
        <i class="fas fa-heart text-red-500"></i>
        <span>by</span>
        <a 
          href="https://github.com/codetesla51" 
          class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Uthman Dev
        </a>
      </div>
    </div>
  </div>
</footer>