import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const updateProfileSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('admin', 'user'),
  isPublic: Joi.boolean(),
});
