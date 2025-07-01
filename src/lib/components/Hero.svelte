<script lang="ts">
	import { onMount } from 'svelte';
	
	let heroRef: HTMLElement;
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
	});
</script>

<section bind:this={heroRef} class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="text-center">
			<h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000"
				class:translate-y-10={!mounted}
				class:opacity-0={!mounted}
				class:translate-y-0={mounted}
				class:opacity-100={mounted}>
				<span class="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
					Next-Gen Browser
				</span>
				<br />
				<span class="text-white">
					Infrastructure
				</span>
			</h1>
			
			<p class="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300"
				class:translate-y-10={!mounted}
				class:opacity-0={!mounted}
				class:translate-y-0={mounted}
				class:opacity-100={mounted}>
				Quantum Browser is an open-source, AI-powered browser with hardware acceleration, 
				99.9% ad blocking, and intelligent features that revolutionize web browsing.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500"
				class:translate-y-10={!mounted}
				class:opacity-0={!mounted}
				class:translate-y-0={mounted}
				class:opacity-100={mounted}>
				<button class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
					Start For Free
				</button>
				<button class="border border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105">
					View Documentation
				</button>
			</div>
		</div>
		
		<!-- Browser Preview -->
		<div class="mt-16 relative transition-all duration-1000 delay-700"
			class:translate-y-20={!mounted}
			class:opacity-0={!mounted}
			class:translate-y-0={mounted}
			class:opacity-100={mounted}>
			<div class="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30">
				<div class="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
					<div class="flex items-center space-x-2 bg-gray-700 px-4 py-3">
						<div class="w-3 h-3 bg-red-500 rounded-full"></div>
						<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
						<div class="w-3 h-3 bg-green-500 rounded-full"></div>
						<div class="flex-1 bg-gray-600 rounded ml-4 px-3 py-1 text-sm text-gray-300">
							https://quantum-browser.dev
						</div>
					</div>
					<div class="p-6 bg-gradient-to-br from-gray-800 to-gray-900 h-64 flex items-center justify-center">
						<div class="text-center">
							<div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
								<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
							</div>
							<p class="text-purple-400 font-semibold">AI-Powered Browsing Active</p>
							<p class="text-gray-400 text-sm mt-1">99.9% ads blocked • Page summarized</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
