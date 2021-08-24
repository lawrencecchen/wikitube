<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Placeholder from '@tiptap/extension-placeholder';
	import StarterKit from '@tiptap/starter-kit';
	import CharacterCount from '@tiptap/extension-character-count';

	export let id = null;
	export let placeholder = '';
	export let wrapperClass = '';
	export let content = '';
	export let html = '';
	export let editable = true;
	export let editor: Editor = null;

	$: if (editor && editable) {
		editor.setOptions({
			editable,
			editorProps: { attributes: { class: className, disabled: String(!editable) } }
		});
	}

	let wrapperRef: HTMLDivElement;

	onMount(async () => {
		editor = new Editor({
			element: wrapperRef,
			extensions: [
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3]
					}
				}),
				Placeholder.configure({
					placeholder
				}),
				CharacterCount
			],
			editorProps: {
				attributes: {
					class: className
				}
			},
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				html = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	let className = '';

	function focus() {
		editor.chain().focus().run();
	}

	export { className as class };
</script>

<!-- {#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if} -->

<div
	bind:this={wrapperRef}
	class="h-full w-full cursor-text {wrapperClass}"
	on:click={focus}
	on:focus={focus}
	{id}
/>

<style>
	/* :global(.ProseMirror) {
		padding: 0px;
		min-height: 100%;
	} */
	:global(.ProseMirror p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: #a9abad;
		pointer-events: none;
		height: 0;
	}
	/* :global(.ProseMirror):focus {
		outline: none;
		position: relative;
	} */
</style>
