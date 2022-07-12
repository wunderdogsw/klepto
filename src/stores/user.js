import { writable } from 'svelte/store';

const defaultUser = {
	_id: '62c6915b8ec3799497ae377c',
	name: 'Anon',
	email: 'ido.schacham@wunderdog.fi',
	password: 'anon'
};

const createUser = () => {
	const { subscribe, set, update } = writable(defaultUser);

	return {
		subscribe,
		set,
		update
	};
};

export const user = createUser();
