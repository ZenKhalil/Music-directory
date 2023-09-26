import dotenv from 'dotenv';
dotenv.config();

export const development = {
    username: process.env.DB_USERNAME || 'root_base',
    password: process.env.DB_PASSWORD || 'qwaszx1212@',
    database: process.env.DB_DATABASE || 'music_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
};
