<script lang="ts">
	import { page } from '$app/stores';
	import type { definitions } from '$lib/types/supabase';
	import PostVoter from '$lib/components/Voter/PostVoter.svelte';

	export let questions: definitions['posts_with_votes'][];

	function stripHTML(html: string) {
		return html.replace(/<[^>]+>/g, '');
	}
</script>

<div class="p-4">
	<h2 class="font-semibold text-lg flex items-center">
		Top Questions
		<a
			href="/v/{$page.params.videoId}/q/new"
			class="mr-0 ml-auto px-2 py-1 border border-gray-300 font-medium text-xs text-gray-500 rounded shadow-sm hover:text-gray-800 hover:border-gray-500 hover:bg-gray-100/50 active:text-gray-800 active:border-gray-800 active:bg-gray-100 transition"
		>
			Ask a question
		</a>
	</h2>

	<div class="mt-2">
		{#if questions.length === 0}
			<div class="text-sm my-6 text-gray-600">
				There aren't any questions yet. <button class="text-blue-500 hover:underline">
					Ask one.
				</button>
			</div>
		{:else}
			<ul class="space-y-2">
				{#each questions as question}
					<li class="flex items-center">
						<PostVoter post={question} />
						<div class="ml-2">
							<a
								href="/v/{$page.params.videoId}/q/{question.post_id}"
								class="text-blue-600 font-medium"
							>
								{question.title}
							</a>
							<p class="text-xs text-gray-600 line-clamp-2">{stripHTML(question.unsafe_body)}</p>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
