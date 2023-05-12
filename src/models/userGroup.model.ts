import sequilizeConnection from '../config/db.config.js';
import Group from './group.model.js';
import User from './users.model.js';

import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class UserGroups extends Model<InferAttributes<UserGroups>, InferCreationAttributes<UserGroups>> {}

UserGroups.init(
  {},
  {
    timestamps: false,
    sequelize: sequilizeConnection,
  },
);

Group.belongsToMany(User, { through: UserGroups });
User.belongsToMany(Group, { through: UserGroups });

export default UserGroups;
