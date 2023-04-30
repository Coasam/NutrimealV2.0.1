import { H3Error } from 'h3';
import Joi, { ValidationError } from 'joi'

export default async function validateData (schema: Joi.Schema, data: Object) {
  const valid = schema.validateAsync(data) // Validate the data using Joi
    .then(() => {
      return true; // Return true if the data is valid
    })
    .catch((err: ValidationError) => {
      return createError({ message: err.message, statusMessage: 'Validation Error', statusCode: 400 }) // Return an error if the data is invalid
    })
  
  return valid // Return the result
}