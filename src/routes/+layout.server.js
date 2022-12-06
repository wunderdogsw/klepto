import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client.js';
import { getPayloadFromJWTCookie, hasJWTCookie } from '$lib/utils.ts';

const getUser = async (request) => {
	const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

	const db = await getDb();
	const users = db.collection('users');

	const { name, email } = await users.findOne(
		{ _id: new ObjectId(userId) },
		{ projection: { hash: false, salt: false } }
	);

	return { _id: userId, name, email };
};

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
	const user = hasJWTCookie(request) ? await getUser(request) : null;
	return {
		user
	};
}
