<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { supabase } from '$lib/supabase';
	import type { definitions } from '$lib/types/supabase';
	import Voter from './Voter.svelte';

	export let post: definitions['posts_with_votes'];

	let initialVotes = post.votes - post.user_vote;

	async function upsertVotes(user_id: string, post_id: number, value: number) {
		post.user_vote = value;
		post.votes = initialVotes + value;

		return supabase
			.from('votes')
			.upsert({ user_id, post_id: post_id, value }, { onConflict: 'user_id, post_id' });
	}

	async function upvote() {
		if (!$auth) {
			return alert('Not signed in.');
		}
		const { error } = await upsertVotes($auth.user.id, post.post_id, 1);

		if (error) {
			return console.log(error);
		}
	}
	async function downvote() {
		if (!$auth) {
			return alert('Not signed in.');
		}
		const { error } = await upsertVotes($auth.user.id, post.post_id, -1);

		if (error) {
			return console.log(error);
		}
	}
	async function unvote() {
		if (!$auth) {
			return alert('Not signed in.');
		}
		const { error } = await upsertVotes($auth.user.id, post.post_id, 0);

		if (error) {
			return console.log(error);
		}
	}
</script>

<Voter
	class="-ml-3 sticky top-0"
	votes={initialVotes + post.user_vote}
	user_vote={post.user_vote}
	on:upvote={upvote}
	on:downvote={downvote}
	on:unvote={unvote}
/>
