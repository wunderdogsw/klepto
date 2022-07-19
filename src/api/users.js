import { fetchJson } from '../lib/utils';

export const signup = (name, email, password) =>
	fetchJson('/api/users/signup', { name, email, password });
