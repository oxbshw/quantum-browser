<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import PerformanceFeatures from '$lib/components/PerformanceFeatures.svelte';
	import AIFeatures from '$lib/components/AIFeatures.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Quantum Browser - Next-Gen AI-Powered Browser</title>
</svelte:head>

<Hero />
<Stats />
<PerformanceFeatures />
<AIFeatures />
<Footer />
