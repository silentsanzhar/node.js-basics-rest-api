import sequilizeConnection from '../config/db.config.js';
import User from './users.model.js';

import {
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin,
    Model
} from 'sequelize';
import { GroupModelInputAttributes, GroupModelOutputAttributes, GroupPermission } from 'src/interfaces/index.js';

class Group extends Model<GroupModelOutputAttributes, GroupModelInputAttributes> {
    id?: CreationOptional<string>;
    name!: string;
    permissions!: Array<GroupPermission>;
    readonly createdAt?: CreationOptional<Date>;
    readonly updatedAt?: CreationOptional<Date>;

    getUsers!: HasManyGetAssociationsMixin<User>; // Note the null assertions!
    addUser!: HasManyAddAssociationMixin<User, string>;
    addUsers!: HasManyAddAssociationsMixin<User, string>;
    setUsers!: HasManySetAssociationsMixin<User, string>;
    removeUser!: HasManyRemoveAssociationMixin<User, string>;
    removeUsers!: HasManyRemoveAssociationsMixin<User, string>;
}

Group.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: 'name',
                msg: 'A group with this name already exists'
            }
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: sequilizeConnection
    }
);

export default Group;
