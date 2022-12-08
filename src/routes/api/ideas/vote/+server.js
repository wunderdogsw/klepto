import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

import { getDb } from '$lib/server/mongodb-client';
import { getPayloadFromCookies } from '$lib/server/utils';

export async function PATCH({ request, cookies }) {
	const { userId } = await getPayloadFromCookies(cookies);

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

	return json({});
}
