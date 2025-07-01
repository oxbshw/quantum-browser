<script lang="ts">
	interface Props {
		addResult: (result: any) => void;
		loading: boolean;
	}
	
	let { addResult, loading = $bindable() }: Props = $props();
	
	let translationText = $state('Hello, world! This is a test of our AI-powered translation feature.');
	let targetLanguage = $state('es');
	
	const languages = [
		{ code: 'es', name: 'Spanish' },
		{ code: 'fr', name: 'French' },
		{ code: 'de', name: 'German' },
		{ code: 'it', name: 'Italian' },
		{ code: 'pt', name: 'Portuguese' },
		{ code: 'ru', name: 'Russian' },
		{ code: 'ja', name: 'Japanese' },
		{ code: 'ko', name: 'Korean' },
		{ code: 'zh', name: 'Chinese' },
		{ code: 'ar', name: 'Arabic' }
	];
	
	async function translateText() {
		if (!translationText.trim()) {
			addResult({
				type: 'translation',
				action: 'translate',
				success: false,
				error: 'No text provided',
				message: 'Please enter text to translate'
			});
			return;
		}
		
		loading = true;
		try {
			const response = await fetch('/api/playground/translate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: translationText,
					targetLanguage: targetLanguage
				})
			});
			
			const result = await response.json();
			
			if (result.success) {
				addResult({
					type: 'translation',
					action: 'translate',
					success: true,
					data: {
						original: translationText,
						translated: result.translatedText,
						language: languages.find(l => l.code === targetLanguage)?.name
					},
					message: `Text translated to ${languages.find(l => l.code === targetLanguage)?.name}`
				});
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			addResult({
				type: 'translation',
				action: 'translate',
				success: false,
				error: error.message,
				message: 'Failed to translate text'
			});
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
	<h2 class="text-2xl font-semibold text-white mb-4 flex items-center">
		<svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
		</svg>
		Real-Time Translation
	</h2>
	
	<div class="space-y-4">
		<div>
			<label for="translationText" class="block text-sm font-medium text-gray-300 mb-2">Text to Translate</label>
			<textarea 
				id="translationText"
				bind:value={translationText}
				placeholder="Enter text to translate..."
				rows="3"
				class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
				disabled={loading}
			></textarea>
		</div>
		
		<div>
			<label for="targetLanguage" class="block text-sm font-medium text-gray-300 mb-2">Target Language</label>
			<select 
				id="targetLanguage"
				bind:value={targetLanguage}
				class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
				disabled={loading}
			>
				{#each languages as language}
					<option value={language.code}>{language.name}</option>
				{/each}
			</select>
		</div>
		
		<button 
			onclick={translateText}
			disabled={loading || !translationText.trim()}
			class="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
		>
			{loading ? 'Translating...' : 'Translate Text'}
		</button>
	</div>
</div>
