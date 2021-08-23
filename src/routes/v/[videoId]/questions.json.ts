import { supabase } from '$lib/supabase';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const get: RequestHandler = async ({ params, headers }) => {
	const cookies = cookie.parse(headers.cookie || '');
	supabase.auth.setAuth(cookies?.supabaseToken);

	const { data: questions, error: questionsError } = await supabase
		.from('posts_with_votes')
		.select('*')
		.match({ video_id: params.videoId, post_type: 'question' })
		.order('votes', { ascending: false });

	if (!questionsError) {
		return {
			body: questions
		};
	}
	return {
		status: 500
	};
};
