export function clickoutside(
	node: HTMLElement
): {
	destroy(): void;
} {
	function click(e) {
		if (node && !node.contains(e.target) && !e.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', e));
		}
	}
	document.addEventListener('click', click);

	return {
		destroy() {
			document.removeEventListener('click', click);
		}
	};
}
