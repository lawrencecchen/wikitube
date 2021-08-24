<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { tabPanelsKey } from './keys';

	let className = '';

	export { className as class };

	const nextTabIndex = writable(0);

	setContext(tabPanelsKey, {
		getNextTabIndex: () => $nextTabIndex++
	});
</script>

<div class={className}>
	<slot />
</div>
