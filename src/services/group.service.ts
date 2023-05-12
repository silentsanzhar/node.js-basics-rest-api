import * as groupDal from '../dal/group.dal.js';

import { AddUsersToGroupDTO, GroupModelInputAttributes, GroupModelOutputAttributes } from 'src/interfaces/group.interface.js';

export const createGroup = (payload: GroupModelInputAttributes): Promise<GroupModelOutputAttributes> => {
  return groupDal.create(payload);
};

export const updateGroup = (id: string, payload: GroupModelInputAttributes): Promise<GroupModelOutputAttributes> => {
  return groupDal.update(id, payload);
};

export const getGroupById = (id: string): Promise<GroupModelOutputAttributes> => {
  return groupDal.getById(id);
};

export const getAllGroups = (): Promise<GroupModelOutputAttributes[]> => {
  return groupDal.getAll();
};

export const deleteGroupById = (id: string): Promise<boolean> => {
  return groupDal.deleteById(id);
};

export const addUsersToGroup = (groupID: string, payload: AddUsersToGroupDTO): Promise<void> => {
  const { userIDs } = payload;

  return groupDal.addUsersToGroup(groupID, userIDs);
};
