<script lang="ts">
	interface Props {
		results: any[];
		clearResults: () => void;
	}
	
	let { results, clearResults }: Props = $props();
	
	function getResultIcon(type: string) {
		switch (type) {
			case 'session': return '🔗';
			case 'screenshot': return '📸';
			case 'translation': return '🌍';
			case 'adblock': return '🛡️';
			default: return '📋';
		}
	}
	
	function getResultColor(success: boolean) {
		return success ? 'text-green-400' : 'text-red-400';
	}
	
	function formatTimestamp(timestamp: string) {
		return new Date(timestamp).toLocaleTimeString();
	}
</script>

<div class="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-fit sticky top-8">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-2xl font-semibold text-white flex items-center">
			<svg class="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
			</svg>
			Results
		</h2>
		{#if results.length > 0}
			<button 
				onclick={clearResults}
				class="text-gray-400 hover:text-red-400 transition-colors text-sm"
			>
				Clear All
			</button>
		{/if}
	</div>
	
	<div class="space-y-3 max-h-96 overflow-y-auto">
		{#if results.length === 0}
			<div class="text-center py-8 text-gray-500">
				<div class="text-4xl mb-2">🚀</div>
				<p>No results yet</p>
				<p class="text-sm">Start testing features to see results here</p>
			</div>
		{:else}
			{#each results as result}
				<div class="bg-gray-700/50 rounded-lg p-4 border-l-4 {result.success ? 'border-green-500' : 'border-red-500'}">
					<div class="flex items-start justify-between mb-2">
						<div class="flex items-center space-x-2">
							<span class="text-lg">{getResultIcon(result.type)}</span>
							<span class="font-medium text-white capitalize">{result.type}</span>
						</div>
						<span class="text-xs text-gray-400">{formatTimestamp(result.timestamp)}</span>
					</div>
					
					<p class="text-sm {getResultColor(result.success)} mb-2">
						{result.message}
					</p>
					
					{#if result.error}
						<p class="text-xs text-red-400 bg-red-900/20 rounded px-2 py-1">
							Error: {result.error}
						</p>
					{/if}
					
					{#if result.data}
						<div class="mt-2 text-xs text-gray-400">
							{#if result.type === 'screenshot'}
								<div class="bg-gray-800 rounded p-2">
									<p>Format: {result.data.format}</p>
									<p>Size: {result.data.size}</p>
									{#if result.data.url}
										<a href={result.data.url} target="_blank" class="text-blue-400 hover:underline">
											View Screenshot
										</a>
									{/if}
								</div>
							{:else if result.type === 'translation'}
								<div class="bg-gray-800 rounded p-2">
									<p class="text-gray-300 mb-1">Original:</p>
									<p class="text-xs mb-2">"{result.data.original}"</p>
									<p class="text-gray-300 mb-1">Translated ({result.data.language}):</p>
									<p class="text-xs text-blue-300">"{result.data.translated}"</p>
								</div>
							{:else if result.type === 'adblock'}
								<div class="bg-gray-800 rounded p-2">
									<p>Blocked: {result.data.blocked}</p>
									<p>Allowed: {result.data.allowed}</p>
									<p>Effectiveness: {result.data.effectiveness}%</p>
								</div>
							{:else if result.type === 'session'}
								<div class="bg-gray-800 rounded p-2">
									{#if result.data}
										<p>ID: {result.data.id}</p>
										<p>URL: {result.data.url}</p>
									{/if}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>
