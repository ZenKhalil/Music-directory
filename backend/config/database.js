import dotenv from 'dotenv';
import fs from 'fs/promises';
import mysql from 'mysql2';

dotenv.config();

const development = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
};

// Add SSL certificate if provided in environment variables
if (process.env.DB_CERT === 'true') {
    development.dialectOptions = {
        ssl: {
            ca: await fs.readFile("./DigiCertGlobalRootCA.crt.pem", 'utf8')
        }
    };
}

// Create a connection to the database
const dbConnection = mysql.createConnection(development);

export default dbConnection;
