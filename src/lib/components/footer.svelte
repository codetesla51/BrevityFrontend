<script>
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Twitter', icon: 'fa-brands fa-twitter', href: '#' },
    { name: 'GitHub', icon: 'fa-brands fa-github', href: '#' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', href: '#' }
  ];

  const links = [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Contact', href: '#' }
  ];
</script>

<footer class="bg-black/50 backdrop-blur-lg border-t border-gray-800">
  <div class="max-w-7xl mx-auto px-6 py-6">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <!-- Logo and Copyright -->
      <div class="flex items-center gap-2">
        <span class="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Brevity
        </span>
        <span class="text-gray-500">|</span>
        <span class="text-gray-400 text-sm">
          © {currentYear} All rights reserved
        </span>
      </div>

      <!-- Links -->
      <div class="flex items-center gap-8">
        <!-- Legal Links -->
        <div class="flex gap-4">
          {#each links as link}
            <a 
              href={link.href}
              class="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              {link.name}
            </a>
          {/each}
        </div>

        <!-- Social Links -->
        <div class="flex gap-4">
          {#each socialLinks as social}
            <a
              href={social.href}
              class="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={social.name}
            >
              <i class="{social.icon} text-lg"></i>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</footer>