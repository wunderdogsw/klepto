import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/mongodb-client';
import { getPayloadFromCookies } from '$lib/server/utils';

const getUser = async (cookies) => {
	const { userId } = await getPayloadFromCookies(cookies);

	const db = await getDb();
	const users = db.collection('users');

	const { name, email } = await users.findOne(
		{ _id: new ObjectId(userId) },
		{ projection: { hash: false, salt: false } }
	);

	return { _id: userId, name, email };
};

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const token = cookies.get('token');
	const user = token ? await getUser(cookies) : null;
	return {
		user
	};
}
