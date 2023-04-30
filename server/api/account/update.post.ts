import Joi from 'joi';
import { User } from "~~/server/db/User";
import validateData from '~~/server/validators';

const schema = Joi.object({
	weight: Joi.number().required(),
	age: Joi.number().required(),
	height: Joi.number().required(),
	gender: Joi.string().valid('male', 'female').required()
});

export default defineEventHandler(async event => {
	/* Make sure we're authenticated */
	if (!event.context.user) {
		return createError({
			statusCode: 401,
			message: 'Unauthorized'
		})
	}

	/* Read the body */
	const { weight, age, height, gender } = await readBody(event);

	/* Validate the data */
	await validateData(schema, await readBody(event))
 
	/* Update the user */
	await User.findByIdAndUpdate(event.context.user._id, {
		weight: weight,
		age,
		height: Number(height.toFixed(2)),
		gender,
		onboarded: true
	});

	return { success: true }
});

