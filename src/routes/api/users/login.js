import { getDb } from '$lib/mongodb-client';
import { generateHash, generateJWT } from '$lib/utils';

import * as cookie from 'cookie';

import dotenv from 'dotenv';
dotenv.config();

const COOKIE_EXPIRATION = 60 * 60 * 24 * 7; // 1 week
const COOKIE_PATH = '/';

export async function post({ request }) {
	try {
		const db = await getDb();
		const users = db.collection('users');

		const { email, password } = await request.json();

		const query = await users.findOne({ email }, { _id: true, hash: true, salt: true });

		const isUserFound = !!query;
		if (!isUserFound) {
			throw new Error(`user ${email} not found`);
		}

		const { _id, hash, salt } = query;
		const isPasswordValid = hash === generateHash(password, salt);

		if (!isPasswordValid) {
			throw new Error(`wrong password for ${email}, please try again`);
		}

		const token = await generateJWT(process.env.JWT_SECRET, { userId: _id });
		const setCookie = cookie.serialize('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: COOKIE_EXPIRATION,
			path: COOKIE_PATH
		});

		console.log('login', { email });

		return {
			status: 200,
			headers: {
				'set-cookie': setCookie
			},
			body: {
				message: 'ok'
			}
		};
	} catch (errors) {
		console.error(errors);
		return {
			status: 400,
			body: { errors }
		};
	}
}
