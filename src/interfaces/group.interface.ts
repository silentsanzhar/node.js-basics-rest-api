import Group from '../models/group.model.js';

import { InferAttributes, InferCreationAttributes } from 'sequelize';

export type GroupPermission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupDTO {
  name: string;
  permissions: Array<GroupPermission>;
}

export interface AddUsersToGroupDTO {
  userIDs: string[];
}

export interface GroupModelInputAttributes extends InferCreationAttributes<Group> {}
export interface GroupModelOutputAttributes extends InferAttributes<Group> {}
