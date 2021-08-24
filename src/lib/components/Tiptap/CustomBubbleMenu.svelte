<script lang="ts">
	import type { Editor } from '@tiptap/core';

	export let bubbleMenuRef: HTMLDivElement;
	export let editor: Editor;
</script>

<div
	bind:this={bubbleMenuRef}
	class="bg-white rounded border border-gray-200 shadow-lg text-sm flex font-medium"
>
	<button
		class="px-2 py-1 hover:bg-gray-200/75 transition flex items-center border-r border-gray-200"
		on:click={() =>
			editor
				.chain()
				.focus()
				.setLink({ href: prompt('url') })
				.run()}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-3 w-3 mr-1"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
				clip-rule="evenodd"
			/>
		</svg>
		Link
	</button>
	<button
		class="px-2 py-1 hover:bg-gray-200/75 transition w-7 font-semibold {editor?.isActive('bold')
			? 'text-teal-600'
			: ''}"
		on:click={() => editor.chain().focus().toggleBold().run()}>B</button
	>
	<button
		class="px-2 py-1 hover:bg-gray-200/75 transition w-7 italic {editor?.isActive('italic')
			? 'text-teal-600'
			: ''}"
		on:click={() => editor.chain().focus().toggleItalic().run()}>i</button
	>
	<button
		class="px-2 py-1 hover:bg-gray-200/75 transition w-7 underline {editor?.isActive('underline')
			? 'text-teal-600'
			: ''}"
		on:click={() => editor.chain().focus().toggleUnderline().run()}>U</button
	>
</div>
