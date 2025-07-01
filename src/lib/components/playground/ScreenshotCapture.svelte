<script lang="ts">
	interface Props {
		activeSession: any;
		addResult: (result: any) => void;
		loading: boolean;
	}
	
	let { activeSession, addResult, loading = $bindable() }: Props = $props();
	
	let screenshotOptions = $state({
		fullPage: false,
		quality: 90,
		format: 'png'
	});
	
	async function captureScreenshot() {
		if (!activeSession) {
			addResult({
				type: 'screenshot',
				action: 'capture',
				success: false,
				error: 'No active session',
				message: 'Please create a session first'
			});
			return;
		}
		
		loading = true;
		try {
			const response = await fetch('/api/playground/screenshot', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					sessionId: activeSession.id,
					options: screenshotOptions
				})
			});
			
			const result = await response.json();
			
			if (result.success) {
				addResult({
					type: 'screenshot',
					action: 'capture',
					success: true,
					data: result.screenshot,
					message: 'Screenshot captured successfully'
				});
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			addResult({
				type: 'screenshot',
				action: 'capture',
				success: false,
				error: error.message,
				message: 'Failed to capture screenshot'
			});
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
	<h2 class="text-2xl font-semibold text-white mb-4 flex items-center">
		<svg class="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
		</svg>
		Screenshot Capture
	</h2>
	
	<div class="space-y-4">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<label class="block text-sm font-medium text-gray-300 mb-2" for="format-select">Format</label>
				<select 
					bind:value={screenshotOptions.format}
					class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
					disabled={loading}
					id="format-select"
				>
					<option value="png">PNG</option>
					<option value="jpeg">JPEG</option>
					<option value="webp">WebP</option>
				</select>
			</div>
			
			<div>
				<label class="block text-sm font-medium text-gray-300 mb-2" for="quality-range">Quality</label>
				<input 
					bind:value={screenshotOptions.quality}
					type="range" 
					min="10" 
					max="100" 
					step="10"
					class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
					disabled={loading}
					id="quality-range"
				/>
				<div class="text-center text-sm text-gray-400 mt-1">{screenshotOptions.quality}%</div>
			</div>
			
			<div class="flex items-center">
				<label class="flex items-center space-x-2 text-gray-300">
					<input 
						bind:checked={screenshotOptions.fullPage}
						type="checkbox" 
						class="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
						disabled={loading}
					/>
					<span>Full Page</span>
				</label>
			</div>
		</div>
		
		<button 
			onclick={captureScreenshot}
			disabled={loading || !activeSession}
			class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
		>
			{loading ? 'Capturing...' : 'Capture Screenshot'}
		</button>
		
		{#if !activeSession}
			<p class="text-yellow-400 text-sm text-center">⚠️ Create a session first to capture screenshots</p>
		{/if}
	</div>
</div>
