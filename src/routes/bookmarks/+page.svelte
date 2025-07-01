<script lang="ts">
	import { onMount } from 'svelte';
	
	let bookmarks = $state([]);
	let loading = $state(true);
	
	onMount(async () => {
		try {
			const response = await fetch('/api/bookmarks');
			bookmarks = await response.json();
		} catch (error) {
			console.error('Failed to load bookmarks:', error);
		} finally {
			loading = false;
		}
	});
	
	async function deleteBookmark(id: string) {
		try {
			await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
			bookmarks = bookmarks.filter(b => b.id !== id);
		} catch (error) {
			console.error('Failed to delete bookmark:', error);
		}
	}
</script>

<svelte:head>
	<title>Bookmarks - Quantum Browser</title>
</svelte:head>

<div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-3xl font-bold text-white mb-8">Your Bookmarks</h1>
		
		{#if loading}
			<div class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
			</div>
		{:else if bookmarks.length === 0}
			<div class="text-center py-12">
				<div class="text-6xl mb-4">📚</div>
				<h2 class="text-xl text-gray-300 mb-2">No bookmarks yet</h2>
				<p class="text-gray-500">Start browsing and bookmark your favorite pages!</p>
			</div>
		{:else}
			<div class="grid gap-4">
				{#each bookmarks as bookmark}
					<div class="bg-gray-800/50 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-colors">
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<h3 class="text-lg font-semibold text-white mb-1">
									<a href={bookmark.url} class="hover:text-purple-400 transition-colors">
										{bookmark.title}
									</a>
								</h3>
								<p class="text-gray-400 text-sm mb-2">{bookmark.url}</p>
								<p class="text-gray-500 text-xs">
									Added {new Date(bookmark.created_at).toLocaleDateString()}
								</p>
							</div>
							<button 
								onclick={() => deleteBookmark(bookmark.id)}
								class="text-gray-400 hover:text-red-400 transition-colors p-2"
								aria-label="Delete bookmark"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
								</svg>
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
