<!-- lib/components/FileUpload.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  let dragActive = false;
  let fileInput;
  let errors = {};

  const validateFile = (file) => {
    if (!file) return false;
    if (file.type !== 'application/pdf') {
      errors.file = 'Please upload a valid PDF file';
      dispatch('error', errors.file);
      return false;
    }
    errors = {};
    return true;
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    dragActive = false;
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      dispatch('fileSelected', { file: droppedFile });
    }
  };

  const handleFileInput = () => {
    const selectedFile = fileInput.files[0];
    if (validateFile(selectedFile)) {
      dispatch('fileSelected', { file: selectedFile });
    }
  };
</script>

<div class="max-w-4xl mx-auto px-4 py-12">
  <div class="text-center mb-16">
    <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
      Uplaod Your PDF
    </h1>
  </div>

  <div
    class="relative group cursor-pointer overflow-hidden"
    on:dragenter|preventDefault={() => dragActive = true}
    on:dragleave|preventDefault={() => dragActive = false}
    on:dragover|preventDefault
    on:drop={handleDrop}
    on:click={() => fileInput.click()}
  >
    <!-- Animated background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    
    <!-- Main upload area -->
    <div class="relative border-3 border-dashed border-blue-400/50 rounded-2xl p-16 transition-all duration-300
      {dragActive ? 'bg-blue-500/10 border-blue-300' : 'hover:border-blue-300 hover:bg-blue-500/5'}">
      
      <input
        type="file"
        accept=".pdf"
        bind:this={fileInput}
        on:change={handleFileInput}
        class="hidden"
      />
      
      <div class="relative z-10 flex flex-col items-center">
        <!-- Glowing icon container -->
        <div class="w-24 h-24 mb-8 relative">
          <div class="absolute inset-0 bg-blue-500/20 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500" />
          <div class="relative w-full h-full p-5 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
            <svg class="w-full h-full text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        
        <h3 class="text-2xl font-semibold text-white mb-4">Upload your PDF</h3>
        <p class="text-gray-300 text-lg mb-8 text-center">Drag and drop your file here or click to browse</p>
        
        <!-- Feature badges -->
        <div class="flex justify-center gap-6 text-sm">
          <div class="flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20">
            <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-gray-300">PDF files only</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {#if errors.file}
    <div class="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-400/30 backdrop-blur-sm">
      <p class="flex items-center text-red-400">
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {errors.file}
      </p>
    </div>
  {/if}
</div>
