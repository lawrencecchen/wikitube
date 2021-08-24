<script lang="ts">
	import { clickoutside } from '$lib/utils/clickoutside';
	import { scale } from 'svelte/transition';
	import { auth } from '$lib/stores/auth';

	let isOpen = false;
</script>

<div class="relative" use:clickoutside on:clickoutside={() => (isOpen = false)}>
	{#if $auth}
		<button
			class="bg-teal-600 rounded-md w-5 h-5 grid place-items-center text-white text-xs font-medium uppercase"
			on:click={() => (isOpen = !isOpen)}
		>
			{$auth.user.email[0]}
		</button>

		{#if isOpen}
			<div
				class="absolute top-full right-0 bg-white shadow-lg border px-3 py-2 mt-1 rounded z-50 origin-top-right space-y-2"
				transition:scale={{ duration: 150, start: 0.96 }}
			>
				<div class="text-sm text-gray-700">
					{$auth.user.email}
				</div>
				<button class="text-sm text-gray-700">Sign out</button>
			</div>
		{/if}
	{/if}
</div>
