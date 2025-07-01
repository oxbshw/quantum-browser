<script lang="ts">
	import { onMount } from 'svelte';
	
	let mounted = $state(false);
	
	const aiFeatures = [
		{
			icon: '🧠',
			title: 'Intelligent Page Summarization',
			description: 'AI automatically summarizes long articles and web pages, saving you time and highlighting key information.'
		},
		{
			icon: '🌍',
			title: 'Real-Time Translation',
			description: 'Instant translation of web pages in 100+ languages with context-aware AI translation.'
		},
		{
			icon: '🔍',
			title: 'Smart Search Assistant',
			description: 'AI-powered search that understands context and provides intelligent suggestions and answers.'
		},
		{
			icon: '📊',
			title: 'Content Analysis',
			description: 'Advanced AI analyzes web content for credibility, bias detection, and fact-checking.'
		},
		{
			icon: '🎯',
			title: 'Personalized Recommendations',
			description: 'Machine learning algorithms suggest relevant content based on your browsing patterns and interests.'
		},
		{
			icon: '🤖',
			title: 'AI Chat Assistant',
			description: 'Built-in AI assistant that can answer questions about any webpage or help with research.'
		}
	];
	
	onMount(() => {
		mounted = true;
	});
</script>

<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000"
				class:translate-y-10={!mounted}
				class:opacity-0={!mounted}
				class:translate-y-0={mounted}
				class:opacity-100={mounted}>
				<span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
					AI-Powered Features
				</span>
			</h2>
			<p class="text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300"
				class:translate-y-10={!mounted}
				class:opacity-0={!mounted}
				class:translate-y-0={mounted}
				class:opacity-100={mounted}>
				Harness the power of artificial intelligence to enhance your browsing experience
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each aiFeatures as feature, index}
				<div class="bg-gradient-to-br from-blue-800/30 to-purple-800/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
					class:translate-y-10={!mounted}
					class:opacity-0={!mounted}
					class:translate-y-0={mounted}
					class:opacity-100={mounted}
					style="transition-delay: {index * 150}ms">
					<div class="text-4xl mb-4">{feature.icon}</div>
					<h3 class="text-xl font-semibold text-white mb-3">{feature.title}</h3>
					<p class="text-gray-300 leading-relaxed">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
