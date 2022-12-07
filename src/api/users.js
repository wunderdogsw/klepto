import { fetchJson } from '$lib/utils';

const goHome = () => (location.href = '/');

export const logout = async () => {
	await fetchJson('/api/users/logout');
	goHome();
};
