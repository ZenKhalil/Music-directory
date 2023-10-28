import dotenv from 'dotenv';
import fs from 'fs/promises';
import mysql from 'mysql2';

dotenv.config();

<<<<<<< Updated upstream
const development = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: await fs.readFile("./DigiCertGlobalRootCA.crt.pem", 'utf8')
        }
    }
=======
export const development = {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'Abc1234@',
    database: process.env.DB_DATABASE || 'music_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
>>>>>>> Stashed changes
};

const mysqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    ssl: {
        ca: await fs.readFile("./DigiCertGlobalRootCA.crt.pem", 'utf8')
    }
};

const dbConnection = mysql.createConnection(mysqlConfig);

export { development, dbConnection };
