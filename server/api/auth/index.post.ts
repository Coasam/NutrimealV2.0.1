import { User } from '../../db/User';
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
  
  const { email, password } = await readBody(event);

  const user = await User.findOne({ email });

  if (!user) {
    // Return 400, bad E-mail or Password
    throw createError({
      statusCode: 400,
      message: 'E-Mail and or Password is incorrect'
    })
  }

  // Check if the password is correct by encrypting the password and comparing it to the encrypted password in the database
  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    // Return 400, bad E-mail or Password
    throw createError({
      statusCode: 400,
      message: 'E-Mail and or Password is incorrect'
    })
  }
  
  // Create Json web token, signed with a secret key stored in an Environment file, and expires in 1 day, it stores a user ID and tells the server they are logged in
  const config = useRuntimeConfig();
  const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });

  return { accessToken: token };
})