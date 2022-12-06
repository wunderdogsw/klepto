import { goto } from '$app/navigation';

import { fetchJson } from '$lib/utils.client.ts';

export const signup = (name, email, password) =>
	fetchJson('/api/users/signup', { name, email, password });

export const login = async (email, password) => fetchJson('/api/users/login', { email, password });

export const logout = async () => {
	await fetchJson('/api/users/logout');
	await goto('/');
};
