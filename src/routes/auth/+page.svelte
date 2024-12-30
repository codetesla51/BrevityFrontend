<script>
  import { onMount } from 'svelte';
  import AuthLayout from './Authlayout.svelte';
  import PasswordInput from './PasswordInput.svelte';
  import GoogleButton from './GoogleButton.svelte';
  import Loader from "$lib/components/processloader.svelte";
  import {checkAuthentication}from "$lib/utils/isAuth.js"

  let activeTab = 'login';
  let loginForm = { email: '', password: '' };
  let registerForm = { name: '', email: '', password: '', confirmPassword: '' };
  let errors = {};
  let isLoading = false;
  let isGoogleLogin = false;
 let isAuthenticated = false;
 let isExchanging = false;
  const validateForm = (form, isLogin) => {
    errors = {};
    if (!form.email) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    if (!isLogin) {
      if (!form.name) errors.name = 'Name is required';
      if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    return Object.keys(errors).length === 0;
  };

const handleSubmit = async (isLogin) => {
  const form = isLogin ? loginForm : registerForm;

  if (validateForm(form, isLogin)) {
    const endpoint = isLogin
      ? 'https://brevity-backend-kappa.vercel.app/api/login'
      : 'https://brevity-backend-kappa.vercel.app/api/register';

    try {
      isLoading = true;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Accept": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          ...(isLogin ? {} : { name: form.name }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Make sure we're checking for the token in the correct place in the response
        const token = data.token || data.access_token || data.auth_token;
        
        if (token) {
          localStorage.setItem('auth_token', token);
          toast.success('Success! Redirecting to dashboard...');
          window.history.replaceState({}, document.title, "/auth");
          window.location.href = '/dashboard';
        } else {
          console.error('No token in response:', data);
          toast.error('Authentication error: No token received');
        }
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Network error occurred');
    } finally {
      isLoading = false;
    }
  }
};
  const handleGoogleSignIn = async () => {
  try {
    isGoogleLogin = true;
    const response = await fetch('http://localhost:8000/api/auth/google');
    const { url } = await response.json();
    window.location.href = url;
  } catch (err) {
    console.error('Google Sign-In error:', err);
    toast.error('Authentication failed');
  } finally {
    isGoogleLogin = false;
  }
};

export async function load({ url }) {
  const params = new URLSearchParams(url.search);
  return {
    code: params.get('code'),
    error: params.get('error'),
  };
}

onMount(async () => {  
  const { code, error } = getQueryParams();
  const endpoint = 'http://127.0.0.1:8000/api/exchangeToken';

  if (code) {
     isExchanging = true;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        window.history.replaceState({}, document.title, "/auth");
        window.location.href = '/dashboard';
      } else {
        toast.error("Authentication error");
      }
    } catch (error) {
      console.error(error);
    }
    finally{
      isExchanging = false;
    }
  }

  if (error) {
    console.error(error);
    toast.error('Authentication failed');
  }
});
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    code: params.get('code'),
    error: params.get('error'),
  };
};

  onMount(() => {
    isAuthenticated = checkAuthentication();
  });
</script>

<AuthLayout>
  <h2 class="text-3xl font-bold text-white mb-8 text-center">
    {activeTab === 'login' ? 'Welcome back' : 'Create account'}
  </h2>

  <div class="flex gap-4 mb-8 p-1 bg-black/40 rounded-lg">
    <button
      class="flex-1 py-2 rounded-md font-medium transition-all duration-200 
             {activeTab === 'login' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-400 hover:text-white'}"
      on:click={() => activeTab = 'login'}
    >
      Login
    </button>
    <button
      class="flex-1 py-2 rounded-md font-medium transition-all duration-200 
             {activeTab === 'register' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-400 hover:text-white'}"
      on:click={() => activeTab = 'register'}
    >
      Register
    </button>
  </div>

  {#if activeTab === 'login'}
    <form on:submit|preventDefault={() => handleSubmit(true)}>
      <input
        type="email"
        placeholder="Email"
        bind:value={loginForm.email}
        class="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-gray-100 
               placeholder-gray-500 backdrop-blur-xl focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
      />
      {#if errors.email}
        <p class="text-red-500 text-sm mt-1">{errors.email}</p>
      {/if}

      <PasswordInput
        bind:value={loginForm.password}
        error={errors.password}
      />

      <button
        type="submit"
        disabled={isLoading || isExchanging}
        class="mt-4 w-full flex justify-center items-center gap-5 py-3 rounded-lg font-medium 
               bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
               hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5 
               focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 
               focus:ring-offset-black transition-all duration-200 shadow-lg 
               shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if isLoading}
          <Loader size="1.5rem" speed="2s" color="#fff"/>
        {/if}
        Sign in
      </button>

<GoogleButton
    isLoading={isGoogleLogin || isExchanging}
    onClick={handleGoogleSignIn}
    text={activeTab === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
  />
    </form>
  {:else}
    <form on:submit|preventDefault={() => handleSubmit(false)}>  <!-- Changed from true to false -->
      <input
        type="text"
        placeholder="Name"
        bind:value={registerForm.name}
        class="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-gray-100 
               placeholder-gray-500 backdrop-blur-xl focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
      />
      {#if errors.name}
        <p class="text-red-500 text-sm mt-1">{errors.name}</p>
      {/if}

      <input
        type="email"
        placeholder="Email"
        bind:value={registerForm.email}
        class="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-gray-100 
               placeholder-gray-500 backdrop-blur-xl focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
      />
      {#if errors.email}
        <p class="text-red-500 text-sm mt-1">{errors.email}</p>
      {/if}

      <PasswordInput
        bind:value={registerForm.password}
        error={errors.password}
        placeholder="Password"
      />

      <PasswordInput
        bind:value={registerForm.confirmPassword}
        error={errors.confirmPassword}
        placeholder="Confirm Password"
        class="mt-4"
      />

      <button
        type="submit"
        disabled={isLoading  || isExchanging}
        class="mt-4 w-full flex justify-center items-center gap-5 py-3 rounded-lg font-medium 
               bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
               hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-0.5 
               focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 
               focus:ring-offset-black transition-all duration-200 shadow-lg 
               shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if isLoading}
          <Loader size="1.5rem" speed="2s" color="#fff"/>
        {/if}
        Create Account
      </button>

<GoogleButton
    isLoading={isGoogleLogin || isExchanging}
    onClick={handleGoogleSignIn}
    text={activeTab === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
  />
    </form>  {/if}
</AuthLayout>