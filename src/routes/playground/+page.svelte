<script lang="ts">
	import { onMount } from 'svelte';
	import PlaygroundHeader from '$lib/components/playground/PlaygroundHeader.svelte';
	import SessionManager from '$lib/components/playground/SessionManager.svelte';
	import ScreenshotCapture from '$lib/components/playground/ScreenshotCapture.svelte';
	import TranslationTester from '$lib/components/playground/TranslationTester.svelte';
	import AdBlockTester from '$lib/components/playground/AdBlockTester.svelte';
	import ResultsPanel from '$lib/components/playground/ResultsPanel.svelte';
	
	let activeSession = $state(null);
	let results = $state([]);
	let loading = $state(false);
	
	function addResult(result) {
		results = [{ ...result, timestamp: new Date().toISOString() }, ...results];
	}
	
	function clearResults() {
		results = [];
	}
	
	onMount(() => {
		// Initialize playground
		console.log('Playground initialized');
	});
</script>

<svelte:head>
	<title>Playground - Quantum Browser</title>
	<meta name="description" content="Test Quantum Browser's AI-powered features in real-time" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<PlaygroundHeader />
		
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
			<!-- Left Panel - Controls -->
			<div class="lg:col-span-2 space-y-6">
				<SessionManager 
					bind:activeSession 
					{addResult} 
					bind:loading 
				/>
				
				<ScreenshotCapture 
					{activeSession} 
					{addResult} 
					bind:loading 
				/>
				
				<TranslationTester 
					{addResult} 
					bind:loading 
				/>
				
				<AdBlockTester 
					{addResult} 
					bind:loading 
				/>
			</div>
			
			<!-- Right Panel - Results -->
			<div class="lg:col-span-1">
				<ResultsPanel 
					{results} 
					{clearResults} 
				/>
			</div>
		</div>
	</div>
</div>
