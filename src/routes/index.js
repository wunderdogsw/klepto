import clientPromise from '../lib/mongodb-client';

export async function get() {
	const dbConnection = await clientPromise;
	const db = dbConnection.db('klepto');
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
}
