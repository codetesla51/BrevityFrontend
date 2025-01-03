<script>
import { onMount } from 'svelte';
import { formatDistanceToNow } from 'date-fns';
  
let uploads = [];
let loading = true;
let error = null;
let loadingStates = new Map();


export const fetchPDFs = async () => {
  try {
    let token = localStorage.getItem('auth_token')?.split('|')[1] || '';
    const response = await fetch('https://brevity-backend-kappa.vercel.app/fetchPDF', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) throw new Error(await response.json().message || 'Failed to fetch PDFs');
    
    const data = await response.json();
    uploads = data.pdfs.map(pdf => ({
      id: pdf.id,
      fileName: pdf.original_filename.length > 20 
        ? pdf.original_filename.slice(0, 17) + '...' 
        : pdf.original_filename,
      fullFileName: pdf.original_filename,
      date: new Date(pdf.created_at).toISOString(),
      summaryPath: pdf.summary_path
    }));
  } catch (err) {
    error = err.message;
    console.error('Error fetching PDFs:', err);
  } finally {
    loading = false;
  }
}; 

const handleShare = async (id) => {
  if (loadingStates.get(id)) return;
  
  try {
    loadingStates.set(id, 'sharing');
    loadingStates = loadingStates; // Trigger reactivity

    const pdf = uploads.find(u => u.id === id);
    // Generate a shareable link (you'll need to implement this based on your backend)
    const shareableLink = `${window.location.origin}/shared/${id}`;
    
    // Copy to clipboard
    await navigator.clipboard.writeText(shareableLink);
    alert('Link copied to clipboard!');
  } catch (err) {
    console.error('Error sharing PDF:', err);
    alert('Failed to share PDF. Please try again.');
  } finally {
    loadingStates.delete(id);
    loadingStates = loadingStates;
  }
};

const handleDownload = async (id) => {
  if (loadingStates.get(id)) return;

  try {
    loadingStates.set(id, 'downloading');
    loadingStates = loadingStates;

    let token = localStorage.getItem('auth_token')?.split('|')[1] || '';
    const response = await fetch(`https://brevity-backend-kappa.vercel.app/downloadPDF/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error(await response.json().message || 'Download failed');

    const blob = await response.blob();
    const pdf = uploads.find(u => u.id === id);
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = pdf?.fullFileName || 'download.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error downloading PDF:', err);
    alert('Failed to download PDF. Please try again.');
  } finally {
    loadingStates.delete(id);
    loadingStates = loadingStates;
  }
};

const handleDelete = async (id) => {
  if (loadingStates.get(id)) return;
  
  try {
    if (!confirm('Are you sure you want to delete this PDF?')) return;

    loadingStates.set(id, 'deleting');
    loadingStates = loadingStates;

    let token = localStorage.getItem('auth_token')?.split('|')[1] || '';
    const response = await fetch(`https://brevity-backend-kappa.vercel.app/deletePDF/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error(await response.json().message || 'Delete failed');
    uploads = uploads.filter(pdf => pdf.id !== id);
  } catch (err) {
    console.error('Error deleting PDF:', err);
    alert('Failed to delete PDF. Please try again.');
  } finally {
    loadingStates.delete(id);
    loadingStates = loadingStates;
  }
};

onMount(() => {
  fetchPDFs();
});

export let refreshTrigger = 0;
$: if (refreshTrigger) fetchPDFs();
</script>
<div class="space-y-8">
  <!-- Uploads Section -->
  <div class="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-2xl">
    <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
      Your Uploads
    </h2>

    {#if loading}
      <div class="text-center py-12">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 p-5 animate-pulse">
          <svg class="w-full h-full text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Loading your uploads...</h3>
      </div>
    {:else if error}
      <div class="text-center py-12">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 p-5">
          <svg class="w-full h-full text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Error loading uploads</h3>
        <p class="text-gray-400">{error}</p>
      </div>
    {:else if uploads.length > 0}
          <div class="space-y-4">
        {#each uploads as upload}
          <div class="group relative p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm
            hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-200">
            <div class="flex items-center justify-between">
<div class="flex items-center space-x-4">
  <div class="w-10 h-10 rounded-lg bg-blue-500/20 p-2">
    <svg class="w-full h-full text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
  <div>
    <h3 class="text-lg font-semibold text-white">{upload.fileName}</h3>
    <p class="text-sm text-gray-400">
      {formatDistanceToNow(new Date(upload.date), { addSuffix: true })}
    </p>
  </div>
</div>              
              <div class="flex items-center space-x-3">
                <!-- Share Button -->
                <button
                  on:click={() => handleShare(upload.id)}
                  disabled={loadingStates.get(upload.id)}
                  class="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {#if loadingStates.get(upload.id) === 'sharing'}
                    <div class="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  {:else}
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  {/if}
                </button>

                <!-- Download Button -->
                <button
                  on:click={() => handleDownload(upload.id)}
                  disabled={loadingStates.get(upload.id)}
                  class="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {#if loadingStates.get(upload.id) === 'downloading'}
                    <div class="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  {:else}
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  {/if}
                </button>

                <!-- Delete Button -->
                <button
                  on:click={() => handleDelete(upload.id)}
                  disabled={loadingStates.get(upload.id)}
                  class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {#if loadingStates.get(upload.id) === 'deleting'}
                    <div class="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                  {:else}
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  {/if}
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 p-5">
          <svg class="w-full h-full text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">No uploads yet</h3>
        <p class="text-gray-400">Start by uploading your first PDF file</p>
      </div>
    {/if}
  </div>

</div>


