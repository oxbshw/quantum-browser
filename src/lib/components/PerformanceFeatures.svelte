<script lang="ts">
	import { onMount } from 'svelte';
	
	let mounted = $state(false);
	
	const features = [
		{
			icon: '⚡',
			title: 'Hardware-Accelerated Rendering',
			description: 'WebGPU-powered rendering engine for lightning-fast page loads and smooth animations.'
		},
		{
			icon: '🛡️',
			title: '99.9% Ad Blocking',
			description: 'Advanced machine learning algorithms block ads, trackers, and malicious content in real-time.'
		},
		{
			icon: '🚀',
			title: 'Quantum Speed Engine',
			description: 'Proprietary optimization engine that pre-loads content and predicts user behavior.'
		},
		{
			icon: '🔒',
			title: 'Advanced Privacy Controls',
			description: 'Military-grade encryption and privacy features that keep your data secure and anonymous.'
		},
		{
			icon: '🌐',
			title: 'Cross-Device Sync',
			description: 'Seamlessly sync bookmarks, history, and preferences across all your devices.'
		},
		{
			icon: '⚙️',
			title: 'Developer Tools Pro',
			description: 'Enhanced developer tools with AI-powered debugging and performance analysis.'
		}
	];
	
	onMount(() => {
		mounted = true;
	});
</script>

<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000"
				class:translate-y-10={!mounted}
				class:opacity-0={!mounted}
				class:translate-y-0={mounted}
				class:opacity-100={mounted}>
				<span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
					Performance Features
				</span>
			</h2>
			<p class="text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300"
				class:translate-y-10={!mounted}
				class:opacity-0={!mounted}
				class:translate-y-0={mounted}
				class:opacity-100={mounted}>
				Experience the web like never before with cutting-edge performance optimizations
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, index}
				<div class="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
					class:translate-y-10={!mounted}
					class:opacity-0={!mounted}
					class:translate-y-0={mounted}
					class:opacity-100={mounted}
					style="transition-delay: {index * 150}ms">
					<div class="text-4xl mb-4">{feature.icon}</div>
					<h3 class="text-xl font-semibold text-white mb-3">{feature.title}</h3>
					<p class="text-gray-400 leading-relaxed">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
