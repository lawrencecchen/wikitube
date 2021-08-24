<script context="module" lang="ts">
	let IDREF_generator = 1;
</script>

<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { tabPanelsKey } from './keys';
	import { activeTabIndex } from './store';

	let className = '';
	export { className as class };

	let tabIDREF = IDREF_generator++;
	let tabIndex: number;
	const { getNextTabIndex } = getContext(tabPanelsKey);

	onMount(() => {
		tabIndex = getNextTabIndex();
	});
	$: selected = $activeTabIndex === tabIndex;
</script>

<div
	class="{selected ? '' : 'hidden'} {className}"
	role="tabpanel"
	hidden={!selected}
	aria-labelledby="tabs--{tabIDREF}--tab--{tabIndex}"
	id="tabs--{tabIDREF}--panel--{tabIndex}"
	tabindex={selected ? 0 : -1}
>
	<slot />
</div>
