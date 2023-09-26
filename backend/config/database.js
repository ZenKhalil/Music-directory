import dotenv from 'dotenv';
import fs from 'fs/promises';
import mysql from 'mysql2';

dotenv.config();

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
