import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  weight: number;
  height: number;
  age: number;
  gender: string;
  onboarded: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight: { type: Number, required: false },
  height: { type: Number, required: false },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  onboarded: { type: Boolean, required: false, default: false },
});

export const User = mongoose.model<IUser>('User', UserSchema);