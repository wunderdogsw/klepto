import { invalid, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongodb-client';
import { generateHash, generateSalt } from '$lib/server/utils';

export const actions = {
	default: async ({ request }) => {
		const db = await getDb();
		const users = db.collection('users');

		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');

		const count = await users.count({ email }, { limit: 1 });
		const doesUserExist = count > 0;
		if (doesUserExist) {
			return invalid(400, { name, email, password, incorrect: true });
		}

		const salt = generateSalt();
		const hash = generateHash(password, salt);

		const user = { name, email, salt, hash };
		await users.insertOne(user);
		console.log('new user', { name, email });

		throw redirect(303, '/');
	}
};
