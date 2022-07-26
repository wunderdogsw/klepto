import * as cookie from 'cookie';
import { respond } from '$lib/respond';

import dotenv from 'dotenv';
dotenv.config();

import { COOKIE_PATH } from '$lib/constants';

export async function post() {
	const createResponse = async () => {
		const setCookie = cookie.serialize('token', '', {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 0,
			path: COOKIE_PATH
		});

		return {
			headers: {
				'set-cookie': setCookie
			}
		};
	};

	return await respond(createResponse);
}
