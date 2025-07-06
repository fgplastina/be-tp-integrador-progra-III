import mysql from 'mysql2/promise';
import environments from '../config/environments.js';

const { database } = environments;

const connection = mysql.createPool({
  host: database.host,
  user: database.user,
  port: database.port,
  password: database.password,
  database: database.name,
});

export default connection;
