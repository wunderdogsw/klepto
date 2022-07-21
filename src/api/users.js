import { fetchJson } from '../lib/utils';

export const signup = (name, email, password) =>
	fetchJson('/api/users/signup', { name, email, password });

export const login = (email, password) => fetchJson('/api/users/login', { email, password });

export const logout = () => fetchJson('/api/users/logout');
