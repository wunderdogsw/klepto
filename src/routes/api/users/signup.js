import clientPromise from '$lib/mongodb-client';
import { getHash, getSalt } from '$lib/utils';

export async function post({ request }) {
	try {
		const dbConnection = await clientPromise;
		const db = dbConnection.db('klepto');
		const users = db.collection('users');

		const { name, email, password } = await request.json();

		const count = await users.count({ email }, { limit: 1 });
		const doesUserExist = count > 0;
		if (doesUserExist) {
			throw new Error(`email address ${email} is already signed up`);
		}

		const salt = getSalt();
		const hash = getHash(password, salt);

		const user = { name, email, salt, hash };
		// TODO
		await users.insertOne(user);
		console.log('new user', user);

		return {
			status: 200,
			body: { user }
		};
	} catch (errors) {
		console.error(errors);
		return {
			status: 400,
			body: { errors }
		};
	}
}
