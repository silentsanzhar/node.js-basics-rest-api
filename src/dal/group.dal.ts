import Group from '../models/group.model.js';
import sequilizeConnection from '../config/db.config.js';

import { ErrorWithStatusCode, GroupModelInputAttributes, GroupModelOutputAttributes } from '../interfaces/index.js';
import { Transaction } from 'sequelize';
import UserGroup from '../models/userGroup.model.js';

const getGroupById = async (id: string): Promise<Group> => {
    const group = await Group.findByPk(id);

    if (!group) {
        const errorWithStatusCode = new Error('Group not found') as ErrorWithStatusCode;
        errorWithStatusCode.status = 404;

        throw errorWithStatusCode;
    }

    return group;
};

export const create = async (payload: GroupModelInputAttributes): Promise<GroupModelOutputAttributes> => {
    const group = await Group.create(payload);
    return group;
};

export const update = async (id: string, payload: GroupModelInputAttributes): Promise<GroupModelOutputAttributes> => {
    const result = await Group.update(payload, { where: { id }, returning: true });

    const updatedGroup = result[1][0];
    return updatedGroup;
};

export const getById = async (id: string): Promise<GroupModelOutputAttributes> => {
    return await getGroupById(id);
};

export const getAll = async (): Promise<GroupModelOutputAttributes[]> => {
    return Group.findAll({
        order: [['name', 'ASC']]
    });
};

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedGroup = await Group.destroy({ where: { id } });

    return !!deletedGroup;
};

export const getUserGroups = async () => {
    return UserGroup.findAll();
};

export const addUsersToGroup = async (groupID: string, userIDs: string[]) => {
    const result = await sequilizeConnection.transaction(async (t: Transaction) => {
    // if any error occurs, it will be handled in generalErrorHandler.
        const group = await getGroupById(groupID);

        return group.setUsers(userIDs, { transaction: t });
    });

    return result;
};
