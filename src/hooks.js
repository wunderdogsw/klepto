import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client';
import { hasJWTCookie, getPayloadFromJWTCookie } from '$lib/utils';

export async function handle({ event, resolve }) {
	const { request } = event;

	if (hasJWTCookie(request)) {
		const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

		const db = await getDb();
		const users = db.collection('users');
		const { name, email } = await users.findOne(
			{ _id: new ObjectId(userId) },
			{ projection: { hash: false, salt: false } }
		);
		event.locals.user = { _id: userId, name, email };

		return resolve(event);
	}

	event.locals.user = null;
	return resolve(event);
}

export function getSession(event) {
	return event?.locals?.user
		? {
				user: event.locals.user
		  }
		: {};
}
