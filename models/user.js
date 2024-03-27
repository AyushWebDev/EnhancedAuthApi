import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('User', userSchema);