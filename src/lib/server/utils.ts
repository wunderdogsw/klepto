import * as crypto from 'crypto';
import type { JWTPayload } from 'jose';
import * as jose from 'jose';
import * as cookie from 'cookie';

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

const verifyJWT = async (secret: string, jwt: string) => {
	const key = stringToUint8Array(secret);
	return await jose.jwtVerify(jwt, key);
};

export const getPayloadFromJWTCookie = async (secret: string, request: Request) => {
	const cookieHeader = request.headers.get('cookie') ?? '';
	const { token } = cookie.parse(cookieHeader);
	const { payload } = await verifyJWT(secret, token);
	return payload;
};

export const hasJWTCookie = (request: Request) => {
	const cookieHeader = request.headers.get('cookie') ?? '';
	const { token } = cookie.parse(cookieHeader);
	return !!(cookieHeader || token);
};

export const convertToJson = (object: unknown) => JSON.parse(JSON.stringify(object));
