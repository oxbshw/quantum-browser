<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import { onMount } from 'svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
	<Navigation />
	<main class="transition-opacity duration-300" class:opacity-0={!mounted} class:opacity-100={mounted}>
		{@render children?.()}
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
