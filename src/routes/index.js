import { getDb } from '$lib/mongodb-client';

export async function get() {
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

		return {
			status: 200,
			body: {
				ideas
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
