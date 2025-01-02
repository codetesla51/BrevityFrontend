<script>
  import { onMount } from 'svelte';
  import FileUpload from '$lib/components/FileUpload.svelte';
  import ProcessForm from '$lib/components/ProcessForm.svelte';
  import UploadsDisplay from '$lib/components/ResultCard.svelte';
    import { userInfo, credits, fetchUserInfo } from '$lib/stores/user';

  import LoadingOverlay from '$lib/components/LoadingOverlay.svelte';
  import { checkAuthentication } from "$lib/utils/isAuth.js";
  
  let file = null;
  let showForm = false;
  let isLoading = false;
  let authToken;
  let isAuthenticated = false;
  let currentRequest = null;
let refreshTrigger = 0;
let refreshTokens = 0;
const handleFileSelected = (event) => {
    file = event.detail.file;
    showForm = true;
  };

  const handleFormClose = () => {
    showForm = false;
    file = null;
  };

  const handleCancel = () => {
    if (currentRequest) {
      currentRequest.abort();
    }
    isLoading = false;
    toast.info('Process cancelled');
  };

const handleFormSubmit = async (event) => {
  const { file, formData } = event.detail;
  console.log('Processing:', { file, formData });
  toast.success('Processing started...');
  const endpoint = 'https://brevity-backend-kappa.vercel.app/pdfConvert';
  let authToken = localStorage.getItem("auth_token");
  
  if (authToken && authToken.includes('|')) {
    authToken = authToken.split('|')[1];
  }
  
  const data = new FormData();
  data.append('pdf', file);
  data.append('from_page', formData.fromPage);
  data.append('to_page', formData.toPage);
  data.append('theme', formData.pdfTheme);
  data.append('summary_type', formData.summaryType);

  try {
    isLoading = true;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: data,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Response:', responseData);
      toast.success('PDF processed successfully!');
      refreshTrigger += 1
      fetchUserInfo();
    } else {
      const error = await response.json();
      console.error('Error:', error);
      toast.error(`Failed to process PDF: ${error.message}`);
    }
  } catch (error) {
    console.error('Network Error:', error);
    if (error instanceof SyntaxError) {
      toast.error('Unexpected response from server. Please check the backend.');
    } else {
      toast.error('A network error occurred. Please check your connection and try again.');
    }
  } finally {
    isLoading = false; // Hide loading state
  }
};
  const handleFileError = (event) => {
    toast.error(event.detail);
  };

  onMount(() => {
    isAuthenticated = checkAuthentication();
  });
</script>

{#if isAuthenticated}
  <div class="hero-gradient min-h-screen relative overflow-hidden p-6 mt-20">
    <div class="w-full max-w-4xl mx-auto space-y-8">
      <div class="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        {#if !showForm}
          <FileUpload 
            on:fileSelected={handleFileSelected}
            on:error={handleFileError}
          />
        {:else}
          <ProcessForm 
  {file}
  on:submit={handleFormSubmit}
  on:close={handleFormClose}
/>
        {/if}
      </div>
      <UploadsDisplay {refreshTrigger} />
    </div>
    
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    <div class="absolute -left-20 top-1/4 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
    <div class="absolute -right-20 top-3/4 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl"></div>
  </div>
{/if}

<LoadingOverlay 
  isVisible={isLoading} 
  onCancel={handleCancel}
/>

<style>
  .hero-gradient {
    background: linear-gradient(to bottom, #000000, #090909);
  }
</style>

