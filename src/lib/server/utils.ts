import * as crypto from 'crypto';
import type { JWTPayload } from 'jose';
import * as jose from 'jose';
import dotenv from 'dotenv';
import type { Cookies } from '@sveltejs/kit';

dotenv.config();

export const generateSalt = (): string => crypto.randomBytes(16).toString('hex');

export const generateHash = (password: string, salt: string): string =>
	crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

const stringToUint8Array = (string: string) => new TextEncoder().encode(string);

export const generateJWT = async (secret: string, payload: JWTPayload): Promise<string> => {
	const key = stringToUint8Array(secret);
	return await new jose.SignJWT(payload)
		.setIssuedAt()
		.setProtectedHeader({ alg: 'HS256' })
		.sign(key);
};

export const verifyJWT = async (secret = '', jwt = '') => {
	const key = stringToUint8Array(secret);
	return await jose.jwtVerify(jwt, key);
};

export const getPayloadFromCookies = async (cookies: Cookies) => {
	const token = cookies.get('token');
	const { payload } = await verifyJWT(process.env.JWT_SECRET, token);
	return payload;
};

export const convertToJson = (object: unknown) => JSON.parse(JSON.stringify(object));
