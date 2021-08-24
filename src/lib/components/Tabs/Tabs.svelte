<script lang="ts">
	// TODO: Implement option for vertical tabs.
	// TODO: Implement option for manual activation.
	// https://www.w3.org/TR/wai-aria-practices-1.2/examples/tabs/tabs-1/tabs.html

	import { activeTabIndex } from './store';

	let className = '';
	export { className as class };
	export let defaultIndex = 0;
	$activeTabIndex = defaultIndex;
</script>

<div class={className}>
	<slot />
</div>
