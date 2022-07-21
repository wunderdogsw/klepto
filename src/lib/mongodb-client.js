// reference: https://dev.to/kvetoslavnovak/connect-to-mongodb-atlas-from-sveltekit-25hg
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	serverApi: ServerApiVersion.v1
};

let client;
let clientPromise;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env['NODE_ENV'] === 'development') {
	// In development mode, use a global variable
	// so that the value is preserved across module reloads
	// caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	// In production mode, it's best to
	// not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export const getDb = async () => {
	const dbConnection = await clientPromise;
	return dbConnection.db(process.env.DB_NAME);
};
