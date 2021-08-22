<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import TiptapEditor from '$lib/components/Tiptap/TiptapEditor.svelte';
	import { supabase } from '$lib/supabase';
	import type { definitions } from '$lib/types/supabase';
	import { clickoutside } from '$lib/utils/clickoutside';
	import type { Editor } from '@tiptap/core';
	import { quintInOut } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';

	function handleClickoutside() {
		goto(`/v/${$page.params.videoId}`);
	}

	let title = '';
	let unsafe_body = '';
	let loading = false;
	let editor: Editor;

	async function submit() {
		loading = true;
		const { data, error } = await supabase
			.from<definitions['posts']>('posts')
			.insert({
				parent_id: +$page.params.questionId,
				title,
				unsafe_body: unsafe_body,
				video_id: $page.params.videoId,
				post_type: 'question'
			})
			.single();

		if (!error) {
			await invalidate(`/v/${$page.params.videoId}`);
			goto(`/v/${$page.params.videoId}/q/${data.post_id}`);
		} else {
			console.log(error);
		}
	}
</script>

<div
	class="absolute inset-0 z-10 overflow-y-auto max-h-full bg-gray-500/25 cursor-pointer"
	transition:fade={{ duration: 150 }}
>
	<main
		class="p-4 bg-white rounded shadow max-w-4xl min-h-0 w-full my-2 mx-auto border cursor-auto relative z-20"
		use:clickoutside
		on:clickoutside={handleClickoutside}
		on:click|preventDefault
		transition:scale={{ duration: 150, start: 0.96 }}
	>
		<p class="text-xs text-gray-500 mt-1">
			Before you post, search the site to make sure your question hasn’t been answered.
		</p>

		<form on:submit|preventDefault class="mt-3">
			<label for="question_title" class="block">
				<span class="block font-semibold">Title</span>
				<span class="block text-xs text-gray-500">
					Be specific. Imagine you’re asking a question to another person
				</span>
			</label>
			<input
				type="text"
				id="question_title"
				placeholder=""
				class="mt-1 border-gray-300 rounded text-sm w-full focus:ring focus:ring-blue-200 focus:border focus:border-blue-500/90 transition disabled:opacity-75"
				bind:value={title}
			/>

			<label for="question_body" class="block font-semibold mt-2">Body</label>
			<TiptapEditor
				id="question_body"
				class="border border-gray-300 prose prose-sm max-w-full rounded min-h-[10rem] mt-2 px-3 py-2 focus:ring focus:ring-blue-200 focus:border focus:border-blue-500/90 transition disabled:opacity-75"
				bind:html={unsafe_body}
				bind:editor
				editable={loading}
			/>
			<button
				class="relative mt-3 mr-0 ml-auto px-2 py-1 border border-gray-300 font-medium text-sm text-gray-500 rounded shadow-sm hover:text-gray-800 hover:border-gray-500 hover:bg-gray-100 active:text-gray-800 active:border-gray-800 active:bg-gray-200 transition"
				on:click={submit}
				disabled={loading}
			>
				<div class={loading ? 'invisible' : ''}>Post Your Answer</div>
				{#if loading}
					<Spinner class="absolute inset-0 mx-auto my-auto w-5 h-5 text-gray-500" />
				{/if}
			</button>
		</form>
	</main>
</div>
