import * as cookie from 'cookie';

import dotenv from 'dotenv';
dotenv.config();

const COOKIE_PATH = '/';

export async function post() {
	try {
		const setCookie = cookie.serialize('token', '', {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 0,
			path: COOKIE_PATH
		});

		return {
			status: 200,
			headers: {
				'set-cookie': setCookie
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
