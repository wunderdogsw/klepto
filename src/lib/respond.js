// inspired by: https://github.com/sveltejs/realworld/blob/master/src/routes/auth/_respond.js
import { error } from '@sveltejs/kit';

export const respond = async (createResponse) => {
	try {
		const response = await createResponse();
		return {
			status: 200,
			...response
		};
	} catch (errorObject) {
		console.error(errorObject);
		const { message } = errorObject;
		throw error(400, message);
	}
};
