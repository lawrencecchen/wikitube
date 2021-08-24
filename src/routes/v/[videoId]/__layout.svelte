<script lang="ts" context="module">
	import { page } from '$app/stores';
	import FrameResizer from '$lib/components/Frame/FrameResizer.svelte';
	import QuestionsAndAnswers from '$lib/components/QuestionAndAnswers/QuestionsAndAnswers.svelte';
	import VideoNotesPanel from '$lib/components/VideoNotesPanel/VideoNotesPanel.svelte';
	import YoutubePlayer from '$lib/components/YoutubePlayer/YoutubePlayer.svelte';
	import { supabase } from '$lib/supabase';
	import type { definitions } from '$lib/types/supabase';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		try {
			// const questions = await fetch(`${page.params.videoId}/questions.json`).then((r) => r.json());
			const { data: questions, error: questionsError } = await supabase
				.from('posts_with_votes')
				.select('*')
				.match({ video_id: page.params.videoId, post_type: 'question' })
				.order('votes', { ascending: false });

			return {
				props: {
					questions
				}
			};
		} catch (e) {
			console.log(e);
			return { status: 500 };
		}
	};
</script>

<script lang="ts">
	export let questions: definitions['posts_with_votes'][];

	let width: number;
	let screenWidth: number;
</script>

<div class="flex h-screen overflow-hidden relative" bind:clientWidth={screenWidth}>
	<div class="w-full lg:min-w-[400px] max-w-4xl flex h-full relative" style="width: {width}px">
		<div class="flex-grow divide-y border-r max-h-full overflow-y-auto">
			<div class="{width > 600 ? 'aspect-w-16' : 'aspect-w-12'} aspect-h-9">
				<!-- <YoutubePlayer
					src="https://www.youtube-nocookie.com/embed/{$page.params
						.videoId}?controls=1&enablejsapi=1&modestbranding=1&showinfo=0&iv_load_policy=3&html5=1&fs=1&rel=0&hl=en&cc_lang_pref=en&cc_load_policy=1&start=0"
				/> -->
				<YoutubePlayer videoId={$page.params.videoId} />
				<!-- src="https://www.youtube-nocookie.com/embed/{$page.params
						.videoId}?controls=1&enablejsapi=1&modestbranding=1&showinfo=0&iv_load_policy=3&html5=1&fs=1&rel=0&hl=en&cc_lang_pref=en&cc_load_policy=1&start=0" -->
			</div>
			<QuestionsAndAnswers {questions} />
		</div>

		<FrameResizer bind:screenWidth bind:width />
	</div>

	<VideoNotesPanel />

	<slot />
</div>
