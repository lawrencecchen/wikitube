<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import TiptapEditor from '$lib/components/Tiptap/TiptapEditor.svelte';
	import PostVoter from '$lib/components/Voter/PostVoter.svelte';
	import { supabase } from '$lib/supabase';
	import type { definitions } from '$lib/types/supabase';
	import { clickoutside } from '$lib/utils/clickoutside';
	import type { Load } from '@sveltejs/kit';
	import type { Editor } from '@tiptap/core';
	import { fade, fly } from 'svelte/transition';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import utc from 'dayjs/plugin/utc';

	dayjs.extend(relativeTime);
	dayjs.extend(utc);

	export const load: Load = async ({ page, fetch, session, context }) => {
		const { data: question, error: questionError } = await supabase
			.from('posts_with_votes')
			.select('*')
			.match({ post_id: page.params.questionId, video_id: page.params.videoId })
			.single();

		const { data: answers, error: answersError } = await supabase
			.from('posts_with_votes')
			.select('*')
			.match({ parent_id: page.params.questionId })
			.order('votes', { ascending: false })
			.order('inserted_at');

		if (question) {
			return {
				props: {
					question,
					answers
				}
			};
		}
		console.log(questionError);
		console.log(answersError);
	};
</script>

<script lang="ts">
	export let question: definitions['posts_with_votes'];
	export let answers: definitions['posts_with_votes'][];

	let editor: Editor;
	let html_answer = '';
	let loading = false;

	function handleClickoutside() {
		goto(`/v/${$page.params.videoId}`);
	}

	async function submit() {
		loading = true;
		const { data, error } = await supabase
			.from<definitions['posts']>('posts')
			.insert({
				parent_id: +$page.params.questionId,
				unsafe_body: html_answer,
				video_id: $page.params.videoId,
				post_type: 'answer'
			})
			.single();

		if (!error) {
			answers = [
				...answers,
				{ ...data, votes: 0, user_vote: 0 } as definitions['posts_with_votes']
			];
			console.log('====>', answers);
			editor.commands.clearContent();
		} else {
			console.log(error);
		}

		loading = false;
	}
</script>

<div
	class="absolute inset-0 z-10 overflow-y-auto max-h-full bg-gray-500/25 cursor-pointer"
	transition:fade={{ duration: 150 }}
>
	<main
		class="bg-white rounded shadow max-w-4xl min-h-0 w-full my-2 mx-auto border cursor-auto relative z-20"
		use:clickoutside
		on:clickoutside={handleClickoutside}
		on:click|preventDefault
		transition:fly={{ duration: 150, y: 5 }}
	>
		<div class="p-4">
			<h1 class="text-xl font-semibold text-gray-700">{question.title}</h1>

			<dl class="mt-2">
				<div class="flex space-x-1.5 text-xs">
					<dt class="text-gray-600">Asked</dt>
					<dd>
						{dayjs(question.inserted_at).fromNow()}
					</dd>
				</div>
			</dl>
		</div>

		<hr />

		<div class="p-4 relative">
			<div class="min-w-full text-gray-700 flex items-baseline">
				<PostVoter post={question} />
				<div class="ml-4 mr-2 prose max-w-none flex-grow w-full text-gray-700">
					{@html question.unsafe_body}
				</div>
			</div>

			<div class="">
				{#if answers.length < 1}
					<hr class="mt-8" />
					<p class="text-gray-700 font-medium text-lg mt-4">
						Know someone who can answer? Start a discussion on Discord or share a link to this
						question via email, Twitter, or Facebook.
					</p>
				{:else}
					<h2 class="text-lg font-semibold text-gray-700 mt-8 mb-4">
						{answers.length}
						{answers.length === 1 ? 'Answer' : 'Answers'}
					</h2>
					<ul class="divide-y -mt-4">
						{#each answers as answer}
							<li class="text-gray-800 py-4 flex items-baseline">
								<div class="flex items-baseline max-w-full">
									<PostVoter post={answer} />
									<div class="ml-4 mr-2 flex-grow overflow-hidden">
										<div class="prose prose-sm max-w-full overflow-hidden">
											{@html answer.unsafe_body}
										</div>
										<dl class="mt-4">
											<div class="flex space-x-1.5 text-xs">
												<dt class="text-gray-600">Answered</dt>
												<dd>
													{dayjs(answer.inserted_at).fromNow()}
												</dd>
											</div>
										</dl>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<div class="p-4">
			<form on:submit|preventDefault={submit}>
				<h2 class="text-gray-700 font-medium text-lg">Your Answer</h2>
				<TiptapEditor
					bind:editor
					class="border border-gray-300 prose prose-sm max-w-full rounded min-h-[10rem] mt-2 px-3 py-2 focus:ring focus:ring-blue-200 focus:border focus:border-blue-500/90 transition disabled:opacity-75"
					bind:html={html_answer}
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
		</div>
	</main>
</div>
