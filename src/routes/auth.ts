import { supabase } from '$lib/supabase';
import type { RequestHandler } from '@sveltejs/kit';

export const post = async ({ body }) => {
	try {
		const accessToken = JSON.parse(body)?.['accessToken'];
		const { data: user, error } = await supabase.auth.api.getUser(accessToken);

		if (!accessToken || !user) {
			console.log(error);
			return {
				status: 401,
				body: 'Invalid access token'
			};
		}

		return {
			status: 200,
			headers: {
				'set-cookie': [`supabaseToken=${accessToken}; Path=/; HttpOnly`]
			}
		};
	} catch (e) {
		console.log(e);
		return {
			status: 500
		};
	}
};
