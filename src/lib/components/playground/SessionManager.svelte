<script lang="ts">
	interface Props {
		activeSession: any;
		addResult: (result: any) => void;
		loading: boolean;
	}
	
	let { activeSession = $bindable(), addResult, loading = $bindable() }: Props = $props();
	
	let sessionUrl = $state('https://example.com');
	let sessionOptions = $state({
		userAgent: 'Quantum Browser/1.0',
		viewport: { width: 1920, height: 1080 },
		timeout: 30000
	});
	
	async function createSession() {
		loading = true;
		try {
			const response = await fetch('/api/playground/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					url: sessionUrl,
					options: sessionOptions
				})
			});
			
			const result = await response.json();
			
			if (result.success) {
				activeSession = result.session;
				addResult({
					type: 'session',
					action: 'create',
					success: true,
					data: result.session,
					message: `Session created successfully for ${sessionUrl}`
				});
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			addResult({
				type: 'session',
				action: 'create',
				success: false,
				error: error.message,
				message: 'Failed to create session'
			});
		} finally {
			loading = false;
		}
	}
	
	async function closeSession() {
		if (!activeSession) return;
		
		loading = true;
		try {
			const response = await fetch(`/api/playground/session/${activeSession.id}`, {
				method: 'DELETE'
			});
			
			const result = await response.json();
			
			if (result.success) {
				addResult({
					type: 'session',
					action: 'close',
					success: true,
					message: 'Session closed successfully'
				});
				activeSession = null;
			}
		} catch (error) {
			addResult({
				type: 'session',
				action: 'close',
				success: false,
				error: error.message,
				message: 'Failed to close session'
			});
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
	<h2 class="text-2xl font-semibold text-white mb-4 flex items-center">
		<svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
		</svg>
		Session Manager
	</h2>
	
	<div class="space-y-4">
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-2" for="sessionUrl">Target URL</label>
			<input 
				bind:value={sessionUrl}
				type="url" 
				id="sessionUrl"
				placeholder="https://example.com"
				class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
				disabled={loading || activeSession}
			/>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label class="block text-sm font-medium text-gray-300 mb-2" for="userAgent">User Agent</label>
				<select 
					bind:value={sessionOptions.userAgent}
					id="userAgent"
					class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
					disabled={loading || activeSession}
				>
					<option value="Quantum Browser/1.0">Quantum Browser</option>
					<option value="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36">Chrome Desktop</option>
					<option value="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)">iPhone Safari</option>
					<option value="Mozilla/5.0 (Android 10; Mobile; rv:81.0)">Android Firefox</option>
				</select>
			</div>
			
			<div>
				<label class="block text-sm font-medium text-gray-300 mb-2" for="viewport">Viewport</label>
				<select 
					bind:value={sessionOptions.viewport}
					id="viewport"
					class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
					disabled={loading || activeSession}
				>
					<option value="1920x1080">Desktop (1920x1080)</option>
					<option value="1366x768">Laptop (1366x768)</option>
					<option value="768x1024">Tablet (768x1024)</option>
					<option value="375x667">Mobile (375x667)</option>
				</select>
			</div>
		</div>
		
		<div class="flex space-x-4">
			{#if !activeSession}
				<button 
					onclick={createSession}
					disabled={loading || !sessionUrl}
					class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
				>
					{loading ? 'Creating...' : 'Create Session'}
				</button>
			{:else}
				<div class="flex-1 bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-3">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-green-400 font-medium">Session Active</p>
							<p class="text-gray-400 text-sm">ID: {activeSession.id}</p>
						</div>
						<button 
							onclick={closeSession}
							disabled={loading}
							class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
						>
							{loading ? 'Closing...' : 'Close'}
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
