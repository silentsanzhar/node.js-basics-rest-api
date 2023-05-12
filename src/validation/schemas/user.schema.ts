import Joi from 'joi';

import { UserDTO } from '../../interfaces/index.js';

export const createOrUpdateUserSchema: Joi.ObjectSchema<UserDTO> = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

export const getAutoSuggestUsersSchema: Joi.ObjectSchema<any> = Joi.object({
  loginSubstring: Joi.string(),
  limit: Joi.number().when('loginSubstring', {
    is: Joi.string().required(),
    then: Joi.number().integer().positive().required(),
  }),
});

export const loginUserSchema: Joi.ObjectSchema<Omit<UserDTO, 'age'>> = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
});
