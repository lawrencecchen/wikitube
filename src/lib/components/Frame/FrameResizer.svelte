<script lang="ts">
	import { browser } from '$app/env';
	import { draggable } from '$lib/utils/draggable';

	export const minWidth = 400;
	export const maxWidth = 896;
	export let screenWidth: number;
	export let width = between((screenWidth ?? 1200) / 2, minWidth, maxWidth);

	let isDragging = false;
	let initialWidth: number;

	$: if (browser) {
		if (isDragging) {
			document.body.style.userSelect = 'none';
			document.body.style.pointerEvents = 'none';
		} else {
			document.body.style.userSelect = 'auto';
			document.body.style.pointerEvents = 'auto';
		}
	}

	function between(target: number, min: number, max: number) {
		if (target < min) {
			return min;
		}
		if (target > max) {
			return max;
		}
		return target;
	}

	function dndstart(e) {
		initialWidth = e.detail.x;
		isDragging = true;
	}

	function dndmove(e) {
		width = between(e.detail.x, minWidth, maxWidth);
	}

	function dndend(e) {
		isDragging = false;
	}

	function keydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowRight':
				width = between(width + 20, minWidth, maxWidth);
				break;
			case 'ArrowLeft':
				width = between(width - 20, minWidth, maxWidth);
				break;
		}
	}
</script>

<div
	class="transform translate-x-1.5 w-3 h-full flex justify-center group absolute right-0 z-10 cursor-ew-resize"
	use:draggable
	on:dndstart={dndstart}
	on:dndmove={dndmove}
	on:dndend={dndend}
	on:keydown={keydown}
>
	<button
		class="cursor-ew-resize w-1 h-full group-hover:bg-gray-300 transition group-active:bg-gray-400 {isDragging
			? 'bg-gray-400'
			: ''}"
	/>
</div>
