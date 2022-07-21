import { ObjectId } from 'mongodb';
import * as cookie from 'cookie';

import { getDb } from '$lib/mongodb-client';
import { verifyJWT } from '$lib/utils';

import dotenv from 'dotenv';
dotenv.config();

export async function post({ request }) {
	try {
		const cookieHeader = request.headers.get('cookie');
		const { token } = cookie.parse(cookieHeader);
		const {
			payload: { userId }
		} = await verifyJWT(process.env.JWT_SECRET, token);

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

		return {
			status: 200,
			body: { idea }
		};
	} catch (errors) {
		console.error(errors);
		return {
			status: 400,
			body: { errors }
		};
	}
}
