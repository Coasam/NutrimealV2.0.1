import mongoose, { Mongoose } from 'mongoose';

let cachedMongoose: Mongoose | null = null;

export default defineEventHandler(async () => {
  const config = useRuntimeConfig(); // Get the config from the environment variables

  if (!cachedMongoose) { // If the mongoose connection is not cached, create a new connection
    cachedMongoose = await mongoose.connect(config.mongoUri);
    
    console.log('Cached Mongoose');
  }
});