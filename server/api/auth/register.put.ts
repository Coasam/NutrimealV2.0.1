import { hash } from "bcrypt";
import { User } from "~~/server/db/User";

export default defineEventHandler(async event => {

	const { email, password } = await readBody(event);

	// Check if the user exists
	const emailExists = await User.exists({ email });

	// If the user exists, return an error
	if (emailExists) {
		return createError({
			statusCode: 400,
			message: 'The E-Mail you have entered is already in-use by another account.'
		})
	}

	// Encrypt password using bcrypt and 12 rounds
	const hashedPassword = await hash(password, 12);

	// Create new user in the database
	await User.create({
		email,
		password: hashedPassword
	});

	return {};
});