<script>
  import { onMount } from 'svelte';
import { formatDistanceToNow } from 'date-fns';
  
let uploads = [];
let loading = true;
let error = null;

// Format file size
const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

// Fetch PDFs from API
export const fetchPDFs = async () => {
  try {
    let token = localStorage.getItem('auth_token');
    
    if (token && token.includes('|')) {
      token = token.split('|')[1];
    }

    const response = await fetch('http://127.0.0.1:8000/api/fetchPDF', {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch PDFs');
    }

    const data = await response.json();
    uploads = data.pdfs.map(pdf => ({
      id: pdf.id,
      fileName: pdf.original_filename.length > 20 
        ? pdf.original_filename.slice(0, 17) + '...' 
        : pdf.original_filename,
      fullFileName: pdf.original_filename,
      date: new Date(pdf.created_at).toISOString(),
      size: formatFileSize(pdf.file_size),
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
  try {
    const pdf = uploads.find(u => u.id === id);
    console.log('Sharing:', pdf.fileName);
  } catch (err) {
    console.error('Error sharing PDF:', err);
  }
};

const handleDownload = async (id) => {
  try {
    let token = localStorage.getItem('auth_token');
    
    if (token && token.includes('|')) {
      token = token.split('|')[1];
    }
    
    const response = await fetch(`http://127.0.0.1:8000/api/downloadPDF/${id}`, {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Download failed');
    }

    // Create a blob from the PDF stream
    const blob = await response.blob();
    
    // Get the PDF filename
    const pdf = uploads.find(u => u.id === id);
    const filename = pdf ? pdf.fullFileName : 'download.pdf';

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    
    // Append to document, click and cleanup
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error downloading PDF:', err);
    alert(err.message || 'Failed to download PDF. Please try again.');
  }
};

const handleDelete = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this PDF?')) {
      return;
    }

    let token = localStorage.getItem('auth_token');
    
    if (token && token.includes('|')) {
      token = token.split('|')[1];
    }

    const response = await fetch(`http://127.0.0.1:8000/api/deletePDF/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Delete failed');
    }
    
    // Remove the deleted PDF from the uploads array
    uploads = uploads.filter(pdf => pdf.id !== id);
  } catch (err) {
    console.error('Error deleting PDF:', err);
    alert(err.message || 'Failed to delete PDF. Please try again.');
  }
};

onMount(() => {
  fetchPDFs();
});
export let refreshTrigger = 0; 

$: if (refreshTrigger) {
  fetchPDFs();
}
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
                    {formatDistanceToNow(new Date(upload.date), { addSuffix: true })} • {upload.size}
                  </p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <button
                  on:click={() => handleShare(upload.id)}
                  class="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button
                  on:click={() => handleDownload(upload.id)}
                  class="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button
                  on:click={() => handleDelete(upload.id)}
                  class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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

  <!-- Credits Section -->
  <div class="text-center">
    <div class="inline-block">
      <button
        class="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
          hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5 
          focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-black
          transition-all duration-200 shadow-lg shadow-blue-500/25"
      >
        <div class="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        <span class="relative">Get More Credits</span>
      </button>
    </div>
  </div>
</div>