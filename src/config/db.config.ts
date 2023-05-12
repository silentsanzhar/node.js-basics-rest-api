import { Dialect, Sequelize } from 'sequelize';

const dbHost = process.env.DB_HOST as string;
const dbDriver = process.env.DB_DRIVER as Dialect;

const sequilizeConnection = new Sequelize(dbHost, {
    dialect: dbDriver
});

export default sequilizeConnection;
