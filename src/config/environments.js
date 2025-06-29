import dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
