<script context="module" lang="ts">
	let IDREF_generator = 1;
</script>

<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { tabListKey } from './keys';
	import { activeTabIndex, keyboardNavIntent } from './store';

	let className = '';
	export { className as class };

	let tabIDREF = IDREF_generator++;
	let tabIndex: number;
	let tabEl: HTMLButtonElement;
	const { getNextTabIndex, getActiveClass, getInactiveClass } = getContext(tabListKey);

	onMount(() => {
		tabIndex = getNextTabIndex();
	});
	$: selected = $activeTabIndex === tabIndex;

	// keyboardNavIntent is set to true on first keydown (TabList.svelte) to prevent focus on page load.
	$: if ($keyboardNavIntent && selected) {
		tabEl.focus();
	}
</script>

<button
	class="{className} {selected ? getActiveClass() : getInactiveClass()}"
	on:click={() => ($activeTabIndex = tabIndex)}
	aria-controls="tabs--{tabIDREF}--panel--{tabIndex}"
	id="tabs--{tabIDREF}--tab--{tabIndex}"
	tabindex={selected ? 0 : -1}
	bind:this={tabEl}
>
	<slot />
</button>
