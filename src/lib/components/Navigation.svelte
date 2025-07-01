<script lang="ts">
	import { page } from '$app/stores';
	
	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Playground', href: '/playground' },
		{ name: 'Bookmarks', href: '/bookmarks' },
		{ name: 'History', href: '/history' },
		{ name: 'Settings', href: '/settings' },
		{ name: 'API', href: '/api' }
	];
	
	let mobileMenuOpen = false;
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-lg">Q</span>
					</div>
					<span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
						Quantum Browser
					</span>
				</a>
			</div>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-4">
					{#each navItems as item}
						<a 
							href={item.href}
							class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
							class:text-purple-400={item.href === $page.url.pathname}
							class:bg-purple-500/10={item.href === $page.url.pathname}
							class:text-gray-300={item.href !== $page.url.pathname}
							class:hover:text-purple-400={item.href !== $page.url.pathname}
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>
			
			<div class="hidden md:block">
				<button class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
					Download
				</button>
			</div>
			
			<!-- Mobile menu button -->
			<div class="md:hidden">
				<button 
					onclick={toggleMobileMenu}
					class="text-gray-400 hover:text-white p-2"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</div>
		</div>
	</div>
	
	<!-- Mobile Navigation -->
	{#if mobileMenuOpen}
		<div class="md:hidden bg-gray-800/95 backdrop-blur-md">
			<div class="px-2 pt-2 pb-3 space-y-1">
				{#each navItems as item}
					<a 
						href={item.href}
						class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
						class:text-purple-400={item.href === $page.url.pathname}
						class:bg-purple-500/10={item.href === $page.url.pathname}
						class:text-gray-300={item.href !== $page.url.pathname}
						onclick={closeMobileMenu}
					>
						{item.name}
					</a>
				{/each}
				<button class="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium">
					Download
				</button>
			</div>
		</div>
	{/if}
</nav>
