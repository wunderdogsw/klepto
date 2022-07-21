import { ObjectId } from 'mongodb';
import * as cookie from 'cookie';

import { getDb } from '$lib/mongodb-client';
import { verifyJWT } from '$lib/utils';

export async function patch({ request }) {
	try {
		const cookieHeader = request.headers.get('cookie');
		const { token } = cookie.parse(cookieHeader);
		const {
			payload: { userId }
		} = await verifyJWT(process.env.JWT_SECRET, token);

		const db = await getDb();
		const ideas = db.collection('ideas');

		const { ideaId, isUp } = await request.json();
		const filter = { _id: new ObjectId(ideaId) };
		const operation = isUp ? '$push' : '$pull';
		const updateDoc = {
			[operation]: {
				votes: new ObjectId(userId)
			}
		};
		await ideas.updateOne(filter, updateDoc);
		console.log('vote', { userId, ideaId, isUp });

		return {
			status: 200
		};
	} catch (errors) {
		console.error(errors);
		return {
			status: 400,
			body: { errors }
		};
	}
}
