<script>
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Twitter', icon: 'fa-brands fa-x-twitter', href: '#' },
    { name: 'GitHub', icon: 'fa-brands fa-github', href: '#' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', href: '#' }
  ];
</script>
<footer class="bg-black/50 backdrop-blur-lg border-t border-gray-800">
  <div class="max-w-7xl mx-auto px-6 py-12 text-center">
    <div class="flex flex-col items-center gap-12 mb-12">
      <!-- Brand Column -->
      <div class="max-w-md">
        <div class="flex justify-center items-center gap-2 mb-4">
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Brevity
          </span>
        </div>
        <p class="text-gray-400 text-sm mb-6">
          Transform your PDFs into clear, concise summaries using advanced AI technology. Save time and extract key insights instantly.
        </p>
      </div>
      <!-- Social Links -->
      <div>
        <h3 class="text-white font-semibold mb-4">Social</h3>
        <div class="flex flex-col gap-3">
          {#each socialLinks as social}
            <a
              href={social.href}
              class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-3"
              aria-label={social.name}
            >
              <i class="{social.icon} text-lg"></i>
              <span class="text-sm">{social.name}</span>
            </a>
          {/each}
        </div>
      </div>
    </div>
    <!-- Bottom Bar -->
    <div class="pt-8 border-t border-gray-800">
      <div class="flex flex-col gap-4 items-center">
        <span class="text-gray-400 text-sm">
          © {currentYear} Brevity. All rights reserved.
        </span>
        <div class="flex items-center gap-2 text-sm text-gray-400">
          <span>Made with</span>
          <i class="fas fa-heart text-red-500"></i>
          <span>by</span>
          <a 
            href="https://github.com/uthmandev" 
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity duration-200"
          >
            Uthman Dev
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>