import * as cookie from 'cookie';

import dotenv from 'dotenv';
dotenv.config();

import { COOKIE_PATH } from '$lib/constants';

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
	} catch (error) {
		console.error(error);
		const { message } = error;
		return {
			status: 400,
			body: { error: { message } }
		};
	}
}
