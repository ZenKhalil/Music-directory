import { Sequelize } from 'sequelize';
import { development } from "../config/database.js";

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    port: development.port,  // Include the port
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: development.dialectOptions  // Include SSL configuration
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
