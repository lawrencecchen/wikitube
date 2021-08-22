<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import TiptapEditor from '$lib/components/Tiptap/TiptapEditor.svelte';
	import { clickoutside } from '$lib/utils/clickoutside';
	import { fade, fly } from 'svelte/transition';

	function handleClickoutside() {
		goto(`/v/${$page.params.videoId}`);
	}
</script>

<div
	class="absolute inset-0 z-10 overflow-y-auto max-h-full bg-gray-500/25 cursor-pointer"
	transition:fade={{ duration: 100 }}
>
	<main
		class="bg-white rounded shadow max-w-4xl min-h-0 w-full my-2 mx-auto border cursor-auto relative z-20"
		use:clickoutside
		on:clickoutside={handleClickoutside}
		on:click|preventDefault
		transition:fly={{ duration: 100, y: 5 }}
	>
		<p class="text-xs text-gray-500 mt-1">
			Before you post, search the site to make sure your question hasn’t been answered.
		</p>

		<form on:submit|preventDefault class="mt-3">
			<label for="question_title" class="block">
				<span class="block font-semibold">Title</span>
				<span class="block text-xs text-gray-500">
					Be specific. Imagine you’re asking a question to another person</span
				>
			</label>
			<input
				type="text"
				id="question_title"
				placeholder=""
				class="mt-1 border-gray-300 rounded text-sm w-full focus:ring-1 ring-black focus:outline-none"
			/>

			<label for="question_body" class="block font-semibold mt-2">Body</label>
			<TiptapEditor
				id="question_body"
				class="rounded border border-gray-300 w-full mt-1 text-sm prose-sm py-2 px-3 h-20 focus:ring-1 ring-black relative"
				wrapperClass="resize-y overflow-auto"
			/>
		</form>
	</main>
</div>
