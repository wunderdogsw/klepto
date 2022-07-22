import { getDb } from '$lib/mongodb-client';
import { getPayloadFromJWTCookie } from '$lib/utils';
import { hasJWTCookie } from '../lib/utils';
import { ObjectId } from 'mongodb';

export async function get({ request }) {
	try {
		const db = await getDb();
		const pipeline = [
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$set: {
					user: { $arrayElemAt: ['$user', 0] }
				}
			},
			{
				$project: {
					user: {
						password: 0
					}
				}
			}
		];

		const ideas = await db.collection('ideas').aggregate(pipeline).sort({ date: -1 }).toArray();
		let user;

		if (hasJWTCookie(request)) {
			const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);
			const users = db.collection('users');
			user = await users.findOne(
				{ _id: new ObjectId(userId) },
				{ projection: { hash: false, salt: false } }
			);
		}

		return {
			status: 200,
			body: {
				ideas,
				user
			}
		};
	} catch (error) {
		console.error(error);
		const { message } = error;
		return {
			status: 400,
			body: { error: { message } }
		};
	}
}
