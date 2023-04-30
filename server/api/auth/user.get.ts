export default defineEventHandler(async event => {
	if (!event.context.user) {
		return createError({
			statusCode: 401,
			message: 'Unauthorized'
		})
	}

	return event.context.user;
});