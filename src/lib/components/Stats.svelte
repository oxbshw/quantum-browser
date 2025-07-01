<script lang="ts">
	import { onMount } from 'svelte';
	
	let mounted = $state(false);
	
	const stats = [
		{ value: '99.9%', label: 'Ad Blocking Rate' },
		{ value: '<100ms', label: 'Page Load Time' },
		{ value: '50M+', label: 'Pages Processed' },
		{ value: '24/7', label: 'AI Assistance' }
	];
	
	onMount(() => {
		mounted = true;
	});
</script>

<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class="text-center transition-all duration-1000"
					class:translate-y-10={!mounted}
					class:opacity-0={!mounted}
					class:translate-y-0={mounted}
					class:opacity-100={mounted}
					style="transition-delay: {index * 200}ms">
					<div class="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
						{stat.value}
					</div>
					<div class="text-gray-400 text-sm sm:text-base">
						{stat.label}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
