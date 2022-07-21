import { writable } from 'svelte/store';
import { logout as apiLogout } from '../api/users';
import { goto } from '$app/navigation';

const createUser = () => {
	const { subscribe, set, update } = writable(null);

	const logout = async () => {
		await apiLogout();
		set(null);
		await goto('/');
	};

	return {
		subscribe,
		set,
		update,
		logout
	};
};

export const user = createUser();
