import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client';
import { hasJWTCookie, getPayloadFromJWTCookie } from '$lib/utils';

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

export async function handle({ event, resolve }) {
	const { request } = event;
	event.locals.user = null;

	if (hasJWTCookie(request)) {
		event.locals.user = await getUser(request);
	}

	return resolve(event);
}

export function getSession(event) {
	return event?.locals?.user
		? {
				user: event.locals.user
		  }
		: {};
}
