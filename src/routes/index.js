import clientPromise from '../lib/mongodb-client';

export async function get() {
	const dbConnection = await clientPromise;
	const db = dbConnection.db('klepto');
	const ideas = await db.collection('ideas').find().sort({ date: -1 }).toArray();

	return {
		status: 200,
		body: {
			ideas
		}
	};
}
