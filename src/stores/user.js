import { writable } from 'svelte/store';

const createUser = () => {
	const { subscribe, set, update } = writable(null);

	return {
		subscribe,
		set,
		update
	};
};

export const user = createUser();
