<script lang="ts">
	interface Props {
		addResult: (result: any) => void;
		loading: boolean;
	}
	
	let { addResult, loading = $bindable() }: Props = $props();
	
	let testUrl = $state('https://example.com');
	let adBlockLevel = $state('standard');
	
	const adBlockLevels = [
		{ value: 'standard', name: 'Standard', description: 'Blocks common ads and trackers' },
		{ value: 'strict', name: 'Strict', description: 'Aggressive blocking with privacy focus' },
		{ value: 'custom', name: 'Custom', description: 'AI-powered adaptive blocking' }
	];
	
	async function testAdBlocking() {
		if (!testUrl.trim()) {
			addResult({
				type: 'adblock',
				action: 'test',
				success: false,
				error: 'No URL provided',
				message: 'Please enter a URL to test'
			});
			return;
		}
		
		loading = true;
		try {
			const response = await fetch('/api/playground/adblock', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					url: testUrl,
					level: adBlockLevel
				})
			});
			
			const result = await response.json();
			
			if (result.success) {
				addResult({
					type: 'adblock',
					action: 'test',
					success: true,
					data: result.analysis,
					message: `Ad blocking analysis completed for ${testUrl}`
				});
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			addResult({
				type: 'adblock',
				action: 'test',
				success: false,
				error: error.message,
				message: 'Failed to analyze ad blocking'
			});
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
	<h2 class="text-2xl font-semibold text-white mb-4 flex items-center">
		<svg class="w-6 h-6 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
		</svg>
		Ad Blocking Effectiveness
	</h2>
	
	<div class="space-y-4">
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-2" for="testUrl">Test URL</label>
			<input 
				bind:value={testUrl}
				type="url" 
				id="testUrl"
				placeholder="https://example.com"
				class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
				disabled={loading}
			/>
		</div>
		
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-2">Blocking Level</label>
			<div class="space-y-2">
				{#each adBlockLevels as level}
					<label class="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700/70 transition-colors">
						<input 
							bind:group={adBlockLevel}
							value={level.value}
							type="radio" 
							class="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 mt-0.5"
							disabled={loading}
							name="adBlockLevel"
						/>
						<div>
							<div class="text-white font-medium">{level.name}</div>
							<div class="text-gray-400 text-sm">{level.description}</div>
						</div>
					</label>
				{/each}
			</div>
		</div>
		
		<button 
			onclick={testAdBlocking}
			disabled={loading || !testUrl.trim()}
			class="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
		>
			{loading ? 'Analyzing...' : 'Test Ad Blocking'}
		</button>
	</div>
</div>
