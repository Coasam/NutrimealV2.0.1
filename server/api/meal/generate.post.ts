import validateData from '~~/server/validators';
import Joi from 'joi';
import { calculateCalorieMaintenance } from "~~/util";

const schema = Joi.object({
	diet: Joi.string().valid('pescetarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'vegetarian', 'paleo', 'primal', 'whole30').required(),
	exclude: Joi.string().valid('shellfish', 'peanuts', 'soy', 'dairy', 'eggs', 'wheat', 'fish', 'gluten', 'tree nuts', 'sesame', 'sulfites', 'mustard', 'celery', 'lupine', 'mollusks').required(),
	timeFrame: Joi.string().valid('day', 'week').required()
});

export default defineEventHandler(async event => {
	// Generate a meal plan
	// Check if user is logged in
	if (!event.context.user) {
		return createError({
			statusCode: 401,
			message: 'Unauthorized'
		})
	}

	// Read the body
	const { diet, exclude, timeFrame } = await readBody(event);
	
	// Validate the data
	await validateData(schema, await readBody(event));

	// Calculate calorie maintenance
	const calorieMaintenance = calculateCalorieMaintenance(event.context.user);


	const config = useRuntimeConfig();

	// Generate a meal plan using spoonacular API
	const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=${timeFrame}&targetCalories=${calorieMaintenance}&diet=${diet}&exclude=${exclude}&apiKey=${config.spoonacularKey}`);

	const data = await response.json();

	return data;
});