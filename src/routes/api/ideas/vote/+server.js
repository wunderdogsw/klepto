import { ObjectId } from 'mongodb';

import { getDb } from '$lib/mongodb-client';
import { getPayloadFromJWTCookie } from '$lib/utils';

export async function PATCH({ request }) {
	const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

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

	return new Response(JSON.stringify({}));
}
