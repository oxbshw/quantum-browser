<script lang="ts">
	import { onMount } from 'svelte';
	
	let history = $state([]);
	let loading = $state(true);
	let searchQuery = $state('');
	
	const filteredHistory = $derived.by(() =>
		history.filter(
			(item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.url.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
	
	onMount(async () => {
		try {
			const response = await fetch('/api/history');
			history = await response.json();
		} catch (error) {
			console.error('Failed to load history:', error);
		} finally {
			loading = false;
		}
	});
	
	async function clearHistory() {
		if (confirm('Are you sure you want to clear all browsing history?')) {
			try {
				await fetch('/api/history', { method: 'DELETE' });
				history = [];
			} catch (error) {
				console.error('Failed to clear history:', error);
			}
		}
	}
</script>

<svelte:head>
	<title>History - Quantum Browser</title>
</svelte:head>

<div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-3xl font-bold text-white">Browsing History</h1>
			<button 
				onclick={clearHistory}
				class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
			>
				Clear History
			</button>
		</div>
		
		<div class="mb-6">
			<input 
				bind:value={searchQuery}
				type="text" 
				placeholder="Search history..." 
				class="w-full bg-gray-800 border border-purple-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
			/>
		</div>
		
		{#if loading}
			<div class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
			</div>
		{:else if filteredHistory.length === 0}
			<div class="text-center py-12">
				<div class="text-6xl mb-4">🕐</div>
				<h2 class="text-xl text-gray-300 mb-2">
					{searchQuery ? 'No matching history found' : 'No browsing history'}
				</h2>
				<p class="text-gray-500">
					{searchQuery ? 'Try a different search term' : 'Your browsing history will appear here'}
				</p>
			</div>
		{:else}
			<div class="space-y-2">
				{#each filteredHistory as item}
					<div class="bg-gray-800/50 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-colors">
						<div class="flex items-center space-x-3">
							<div class="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
							<div class="flex-1 min-w-0">
								<h3 class="text-white font-medium truncate">
									<a href={item.url} class="hover:text-purple-400 transition-colors">
										{item.title}
									</a>
								</h3>
								<p class="text-gray-400 text-sm truncate">{item.url}</p>
							</div>
							<div class="text-gray-500 text-xs flex-shrink-0">
								{new Date(item.visited_at).toLocaleString()}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
