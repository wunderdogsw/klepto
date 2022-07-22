import { getDb } from '$lib/mongodb-client';
import { generateHash, generateSalt } from '$lib/utils';

export async function post({ request }) {
	try {
		const db = await getDb();
		const users = db.collection('users');

		const { name, email, password } = await request.json();

		const count = await users.count({ email }, { limit: 1 });
		const doesUserExist = count > 0;
		if (doesUserExist) {
			throw new Error(
				`Email address ${email} is already signed up. Please login or use a different address`
			);
		}

		const salt = generateSalt();
		const hash = generateHash(password, salt);

		const user = { name, email, salt, hash };
		await users.insertOne(user);
		console.log('new user', user);

		return {
			status: 200,
			body: { user }
		};
	} catch (error) {
		console.error(error);
		const { message } = error;
		return {
			status: 400,
			body: { error: { message } }
		};
	}
}
