import { ObjectId } from 'mongodb';

import { getDb } from '$lib/server/mongodb-client';
import { getPayloadFromJWTCookie } from '$lib/server/utils';

import dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
	const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

	const db = await getDb();
	const ideas = db.collection('ideas');

	const { title, description } = await request.json();

	const idea = {
		title,
		description,
		votes: [],
		date: new Date(),
		userId: new ObjectId(userId)
	};

	await ideas.insertOne(idea);
	console.log('new idea', { idea });

	return new Response(JSON.stringify({ idea }));
}
