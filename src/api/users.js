import { fetchJson } from '$lib/utils';

export const signup = (name, email, password) =>
	fetchJson('/api/users/signup', { name, email, password });

const goHome = () => (location.href = '/');

export const login = async (email, password) => {
	await fetchJson('/api/users/login', { email, password });
	goHome();
};

export const logout = async () => {
	await fetchJson('/api/users/logout');
	goHome();
};
