import User from '../models/users.model.js';

import { Op } from 'sequelize';
import { ErrorWithStatusCode, getAutoSuggestUsersFilter, UserModelInputAttributes, UserModelOutputAttributes } from '../interfaces/index.js';

const handleUserNotFound = (user: User | null) => {
  if (!user) {
    const errorWithStatusCode = new Error('User does not exist') as ErrorWithStatusCode;
    errorWithStatusCode.status = 404;

    throw errorWithStatusCode;
  }

  return user;
};

export const create = async (payload: UserModelInputAttributes): Promise<UserModelOutputAttributes> => {
  const user = await User.create(payload);
  return user;
};

export const update = async (id: string, payload: UserModelInputAttributes): Promise<UserModelOutputAttributes> => {
  const result = await User.update(payload, { where: { id }, returning: true });

  const updatedUser = result[1][0];
  return updatedUser;
};

export const getById = async (id: string): Promise<UserModelOutputAttributes> => {
  const user = await User.findByPk(id);

  return handleUserNotFound(user);
};

export const getAll = async (filter?: getAutoSuggestUsersFilter): Promise<UserModelOutputAttributes[]> => {
  const hasFilter = filter?.loginSubstring && filter.limit;

  if (hasFilter) {
    return User.findAll({
      limit: Number(filter.limit),
      where: {
        login: { [Op.substring]: filter.loginSubstring },
      },
      order: [['login', 'ASC']],
    });
  }

  return User.findAll({
    order: [['login', 'ASC']],
  });
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedUser = await User.destroy({ where: { id } });

  return !!deletedUser;
};

export const getUserByLogin = async (login: string): Promise<UserModelOutputAttributes> => {
  const user = await User.findOne({ where: { login } });

  return handleUserNotFound(user);
};
