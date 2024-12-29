<script lang="ts">
	import '../app.css';
	
	import Nav from "$lib/components/nav.svelte"
	import Toast from  "$lib/components/ToastM.svelte"
	let { children } = $props();
</script>
<Nav/>
<Toast/>

{@render children()}
