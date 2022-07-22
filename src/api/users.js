import { session } from '$app/stores';
import { goto } from '$app/navigation';

import { fetchJson } from '$lib/utils';

export const signup = (name, email, password) =>
	fetchJson('/api/users/signup', { name, email, password });

export const login = async (email, password) => {
	const { user } = await fetchJson('/api/users/login', { email, password });
	session.set({ user });
};

export const logout = async () => {
	await fetchJson('/api/users/logout');
	session.set({ user: null });
	await goto('/');
};
