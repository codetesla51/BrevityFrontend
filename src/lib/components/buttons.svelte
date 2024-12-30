<script>
  export let text = "";
  export let link = "/";
  export let icon = "";
</script>

<a href={link} class="flex bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
          hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5 
          focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-black
          transition-all duration-200 shadow-lg shadow-blue-500/25
justify-center items-center mt-8 w-[180px] h-[50px]
gradient-button inline-block px-6 py-3 text-white rounded-[30px] hover:scale-105
transform transition-all space-x-2">
  {#if icon}
    <i class={icon}></i>
  {/if}
  <span>{text}</span>
</a>

