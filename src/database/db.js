import mysql from 'mysql2/promise';
import environments from '../config/environments.js';

const { database } = environments;

const connection = mysql.createPool({
  host: environments.database.host,
  user: environments.database.user,
  port: environments.database.port,
  password: environments.database.password,
  database: environments.database.name,
});

export default connection;
