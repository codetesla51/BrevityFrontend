<script>
  let gradientBlur1 = 'absolute -left-20 top-1/4 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl';
  let gradientBlur2 = 'absolute -right-20 top-3/4 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl';
</script>

<div class="hero-gradient min-h-screen relative overflow-hidden flex items-center justify-center">
  <div class="w-full max-w-md">
    <div class="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-2xl">
      <slot />
    </div>
  </div>
  <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
  <div class={gradientBlur1}></div>
  <div class={gradientBlur2}></div>
</div>

<style>
  .hero-gradient {
    background: linear-gradient(to bottom, #000000, #090909);
  }
</style>