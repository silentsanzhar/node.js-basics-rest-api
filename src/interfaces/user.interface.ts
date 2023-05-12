import User from '../models/users.model.js';

import { InferAttributes, InferCreationAttributes } from 'sequelize';

export interface getAutoSuggestUsersFilter {
  loginSubstring?: string;
  limit?: string | number;
}

export interface UserDTO {
  login: string;
  password: string;
  age: number;
}

export interface UserModelInputAttributes extends InferCreationAttributes<User> {}
export interface UserModelOutputAttributes extends InferAttributes<User> {}
