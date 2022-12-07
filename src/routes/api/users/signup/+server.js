import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongodb-client';
import { generateHash, generateSalt } from '$lib/server/utils';

export async function POST({ request }) {
	const db = await getDb();
	const users = db.collection('users');

	const { name, email, password } = await request.json();

	const count = await users.count({ email }, { limit: 1 });
	const doesUserExist = count > 0;
	if (doesUserExist) {
		throw error(
			400,
			`Email address ${email} is already signed up. Please login or use a different address`
		);
	}

	const salt = generateSalt();
	const hash = generateHash(password, salt);

	const user = { name, email, salt, hash };
	await users.insertOne(user);
	console.log('new user', { name, email });

	return new Response(JSON.stringify({ user }));
}
