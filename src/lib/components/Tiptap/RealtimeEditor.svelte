<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Collaboration from '@tiptap/extension-collaboration';
	import Placeholder from '@tiptap/extension-placeholder';
	import StarterKit from '@tiptap/starter-kit';
	import * as Y from 'yjs';
	import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
	import { auth } from '$lib/stores/auth';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import CustomBubbleMenu from './CustomBubbleMenu.svelte';
	import Underline from '@tiptap/extension-underline';

	// import { WebsocketProvider } from 'y-websocket';
	// import { WebsocketProvider } from '$lib/yjs/y-websocket';
	import { WEBSOCKET_URL } from '$lib/constants';
	import { users as editorUsers } from './users.store';

	// Hacky stuff to make y-websocket work with Vite.
	import * as pkg from 'y-websocket';
	import { CustomLink } from './CustomLink';
	const { WebsocketProvider } = pkg;

	export let documentId: string;
	export let wrapperClass = '';

	const colors = ['#f783ac', '#818CF8', '#A78BFA', '#F472B6'];
	let element: HTMLDivElement;
	let editor: Editor;
	let provider;
	// let provider: WebsocketProvider;
	let bubbleMenuRef;

	onMount(async () => {
		const ydoc = new Y.Doc();
		provider = new WebsocketProvider(WEBSOCKET_URL, documentId, ydoc);

		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					history: false,
					heading: {
						levels: [1, 2, 3]
					}
				}),
				BubbleMenu.configure({
					element: bubbleMenuRef,
					tippyOptions: {
						animation: 'fade',
						delay: 100
					}
				}),
				CustomLink,
				Underline,
				Collaboration.configure({
					document: ydoc,
					field: 'content'
				}),
				CollaborationCursor.configure({
					provider: provider,
					user: {
						name: $auth?.user?.email ?? 'Guest',
						color: 'black'
						// color: colors[Math.floor(Math.random() * colors.length)]
					},
					onUpdate: (users) => {
						$editorUsers = users;
						return null;
					}
				}),
				Placeholder.configure({
					placeholder: 'Start writing...'
				})
			],
			editorProps: {
				attributes: {
					class: className
				}
			},
			content: '',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				// wordCount = editor.state.doc.textContent.split(' ').length;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
		if (provider) {
			provider.destroy();
		}
	});
	let className = '';

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

<div class={wrapperClass} bind:this={element} />

<CustomBubbleMenu bind:bubbleMenuRef {editor} />

<style>
	:global(.ProseMirror p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: #a9abad;
		pointer-events: none;
		height: 0;
	}
	:global(.ProseMirror):focus {
		outline: none;
		position: relative;
	}
	:global(.collaboration-cursor__caret) {
		position: relative;
		margin-left: -1px;
		margin-right: -1px;
		border-left: 1px solid #0d0d0d;
		border-right: 1px solid #0d0d0d;
		word-break: normal;
		pointer-events: none;
	}
	:global(.collaboration-cursor__label) {
		position: absolute;
		top: -1.4em;
		left: -1px;
		font-size: 12px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		user-select: none;
		color: white;
		padding: 0.1rem 0.3rem;
		border-radius: 3px 3px 3px 0;
		white-space: nowrap;
	}
</style>
