<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { tabListKey } from './keys';
	import { activeTabIndex, keyboardNavIntent } from './store';

	let className = '';
	export { className as class };
	export let activeClass = '';
	export let inactiveClass = '';

	const nextTabIndex = writable(0);

	setContext(tabListKey, {
		getNextTabIndex: () => $nextTabIndex++,
		getActiveClass: () => activeClass,
		getInactiveClass: () => inactiveClass
	});

	function keydown(e: KeyboardEvent) {
		$keyboardNavIntent = true;
		switch (e.key) {
			case 'ArrowRight':
				e.preventDefault();

				$activeTabIndex = ($activeTabIndex + 1) % $nextTabIndex;
				break;
			case 'ArrowLeft':
				e.preventDefault();

				if ($activeTabIndex === 0) {
					$activeTabIndex = $nextTabIndex - 1;
				} else {
					$activeTabIndex = ($activeTabIndex - 1) % $nextTabIndex;
				}
				break;
		}
	}
</script>

<div class={className} role="tablist" aria-orientation="horizontal" on:keydown={keydown}>
	<slot />
</div>
