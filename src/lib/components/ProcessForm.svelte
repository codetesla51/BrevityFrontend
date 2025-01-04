<script>
  import { createEventDispatcher } from 'svelte';
  export let file;

  const dispatch = createEventDispatcher();
  
  let formData = {
    fromPage: '',
    toPage: '',
    summaryType: '',
    pdfTheme: ''
  };

  let errors = {};
  const summaryTypes = [
    {  name: 'detailed' },
    {  name: 'short' },
    {  name: 'structured' },
    {  name: 'dummy' },
    {  name: 'extensive_researcher' },
    {  name: 'creative' },
    {  name: 'persuasive' },
    {  name: 'listicle' },
    {  name: 'question_answer' },
    {  name: 'summary_with_examples' },
    {  name: 'problem_solution' },
    {  name: 'objective_questions' },
    {  name: 'opinionated_summary' },
    {  name: 'emphasized_takeaways' }
  ];

  const themeTypes = [
    {  name: 'blue' },
    { name: 'professional' },
    { name: 'modern' },
    {  name: 'warm' },
    {  name: 'nature' },
    {  name: 'elegant' },
    {  name: 'tech' },
    {  name: 'minimal' } ,
    {  name: 'clean_light' } ,
    {  name: 'soft_morning' } ,
    {  name: 'corporate' } ,
    {  name: 'forest' } ,
    {  name: 'ocean' } ,
    {  name: 'slate' } ,
    {  name: 'violet' } ,
    {  name: 'monochrome' } ,
    {  name: 'sepia' } ,
    {  name: 'arctic' } 
  ];

  const validateForm = () => {
    errors = {};
    if (!formData.fromPage) errors.fromPage = 'Start page is required';
    if (!formData.toPage) errors.toPage = 'End page is required';
    if (!formData.summaryType) errors.summaryType = 'Please select a summary type';
    if (!formData.pdfTheme) errors.pdfTheme = 'Please select a theme';
    
    if (parseInt(formData.fromPage) > parseInt(formData.toPage)) {
      errors.fromPage = 'Start page cannot be greater than end page';
    }
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch('submit', { file, formData });
    }
  };

  const handleClose = () => {
    dispatch('close');
  };
</script>

<div class="max-w-4xl mx-auto p-8 relative"> <!-- Added relative positioning here -->
  <!-- Close button moved outside the card but inside the relative container -->
  <button 
    on:click={handleClose}
    class="absolute top-2 right-2 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
  >
    <svg class="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- File preview card -->
  <div class="flex items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm mb-12">
    <div class="w-12 h-12 rounded-xl bg-blue-500/20 p-3">
      <svg class="w-full h-full text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <div>
<h3 class="text-xl font-semibold text-white mb-1 sm:text-lg md:text-xl lg:text-2xl">
  {#if file.name.length > 20}
    {file.name.slice(0, 17)}...
  {:else}
    {file.name}
  {/if}
</h3>      <p class="text-gray-400">Ready for processing</p>
    </div>
  </div>

  <div class="space-y-10">
    <!-- Rest of your form content remains the same -->
    <!-- Page range inputs -->
    <div class="grid grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="block text-gray-300 text-sm font-medium mb-2">Start Page</label>
        <div class="relative">
          <input
            type="number"
            bind:value={formData.fromPage}
            min="1"
            class="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
          />
        </div>
        {#if errors.fromPage}
          <p class="text-red-400 text-sm mt-1">{errors.fromPage}</p>
        {/if}
      </div>
      
      <div class="space-y-2">
        <label class="block text-gray-300 text-sm font-medium mb-2">End Page</label>
        <div class="relative">
          <input
            type="number"
            bind:value={formData.toPage}
            min="1"
            class="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
          />
        </div>
        {#if errors.toPage}
          <p class="text-red-400 text-sm mt-1">{errors.toPage}</p>
        {/if}
      </div>
    </div>

    <!-- Summary Type Select -->
    <div class="space-y-4">
      <label class="block text-gray-300 text-sm font-medium">Summary Type</label>
      <select
        bind:value={formData.summaryType}
        class="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-gray-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
      >
        <option value="">Select a summary type</option>
        {#each summaryTypes as type}
          <option value={type.name}>
            {type.name}
          </option>
        {/each}
      </select>
      {#if errors.summaryType}
        <p class="text-red-400 text-sm">{errors.summaryType}</p>
      {/if}
    </div>

    <div class="space-y-4">
      <label class="block text-gray-300 text-sm font-medium">Theme</label>
      <select
        bind:value={formData.pdfTheme}
        class="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-gray-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
      >
        <option value="">Select a theme</option>
        {#each themeTypes as theme}
          <option value={theme.name}>
            {theme.name}
          </option>
        {/each}
      </select>
      {#if errors.pdfTheme}
        <p class="text-red-400 text-sm">{errors.pdfTheme}</p>
      {/if}
    </div>

    <button
      on:click={handleSubmit}
      class="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
        hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5 
        focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-black
        transition-all duration-200 shadow-lg shadow-blue-500/25"
    >
      Process PDF
    </button>
  </div>
</div>