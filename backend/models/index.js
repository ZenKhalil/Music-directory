import { Sequelize } from 'sequelize';
import { development } from "../config/database.js";

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: 'mysql'
  }
);

export default sequelize;