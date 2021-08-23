import { browser } from '$app/env';
import { supabase } from '$lib/supabase';
import type { AuthSession } from '@supabase/supabase-js';
import { readable, writable } from 'svelte/store';

export const authLoading = writable(true);

async function persistSession(accessToken: string) {
	try {
		const request = await fetch(`/auth`, {
			method: 'POST',
			body: JSON.stringify({ accessToken })
		});
	} catch (e) {
		console.log(e);
	}
}

export const auth = readable<AuthSession>(null, (set) => {
	if (!browser) {
		return null;
	}
	const authSession = supabase.auth.session();

	if (authSession) {
		set(authSession);
		authLoading.set(false);
		persistSession(authSession.access_token);
	}

	const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, authSession) => {
		set(authSession);
		authLoading.set(false);
		persistSession(authSession.access_token);
	});

	return () => {
		authListener.unsubscribe();
	};
});
