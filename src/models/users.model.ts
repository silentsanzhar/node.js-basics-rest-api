import sequilizeConnection from '../config/db.config.js';

import { CreationOptional, DataTypes, Model } from 'sequelize';
import { UserModelInputAttributes, UserModelOutputAttributes } from '../interfaces/index.js';

class User extends Model<UserModelOutputAttributes, UserModelInputAttributes> {
  id?: CreationOptional<string>;
  login!: string;
  password!: string;
  age!: number;
  readonly createdAt?: CreationOptional<Date>;
  readonly updatedAt?: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING(75),
      allowNull: false,
      unique: {
        name: 'login',
        msg: 'A user with this login already exists',
      },
    },
    password: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequilizeConnection,
  },
);

export default User;
