// inspired by: https://github.com/sveltejs/realworld/blob/master/src/routes/auth/_respond.js

export const respond = async (createResponse) => {
	try {
		const response = await createResponse();
		return {
			status: 200,
			...response
		};
	} catch (error) {
		console.error(error);
		const { message } = error;
		return {
			status: 400,
			body: { error: { message } }
		};
	}
};
