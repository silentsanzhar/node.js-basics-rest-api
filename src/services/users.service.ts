import bcrypt from 'bcrypt';

import * as userDal from '../dal/user.dal.js';

import { getAutoSuggestUsersFilter, UserModelInputAttributes, UserModelOutputAttributes } from '../interfaces/index.js';

export const createUser = async (payload: UserModelInputAttributes): Promise<UserModelOutputAttributes> => {
  const salt = await bcrypt.genSalt(10);

  payload.password = await bcrypt.hash(payload.password, salt);

  return userDal.create(payload);
};

export const updateUser = async (id: string, payload: UserModelInputAttributes): Promise<UserModelOutputAttributes> => {
  const salt = await bcrypt.genSalt(10);

  payload.password = await bcrypt.hash(payload.password, salt);

  return userDal.update(id, payload);
};

export const getUserById = (id: string): Promise<UserModelOutputAttributes> => {
  return userDal.getById(id);
};

export const getAllUsers = (filter?: getAutoSuggestUsersFilter): Promise<UserModelOutputAttributes[]> => {
  return userDal.getAll(filter);
};

export const deleteUserById = (id: string): Promise<boolean> => {
  return userDal.deleteById(id);
};

export const getUserByLogin = (login: string): Promise<UserModelOutputAttributes> => {
  return userDal.getUserByLogin(login);
};

export const loginUser = async (login: string, password: string): Promise<boolean> => {
  const user = await getUserByLogin(login);

  return bcrypt.compare(password, user.password);
};
