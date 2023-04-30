import { sendError, H3Error } from 'h3';
import * as jwt from 'jsonwebtoken';

import { User } from '../db/User';

export default defineEventHandler(async (event) => {
  // If on /auth route, go next'

  // Check Authorization header
  const authorization = event.node.req.headers.authorization;

  if (authorization) {
    // Check if token is valid
    const token = authorization.split(' ')[1];

    // Check if user exists in database by verifying the token and then finding the user in the database
    const config = useRuntimeConfig();

    try {
      const payload = jwt.verify(token, config.jwtSecret) as { id: string };

      const user = await User.findById(payload.id, '-password');

      if (user) {
        // Bind user to event context so we can use it in other handlers
        event.context.user = user;
      }
    } catch (error) {
      // If the token is invalid, return an error
      return createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }
  }
})