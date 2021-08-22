<script lang="ts" context="module">
	import { supabase } from '$lib/supabase';
	import type { definitions } from '$lib/types/supabase';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch, session, context }) => {
		const { data: question, error: questionError } = await supabase
			.from('questions')
			.select('*')
			.match({ question_id: page.params.questionId })
			.single();

		if (question) {
			return {
				props: {
					question
				}
			};
		}
		console.log(questionError);
	};
</script>

<script lang="ts">
	export let question: definitions['questions'];
</script>

<main class="prose-sm max-w-3xl mx-auto mt-10">
	<h1 class="font-medium text-gray-700">{question.title}</h1>

	<p>
		{question.body}
	</p>
</main>
