//import fs from 'fs';
import mysql from 'mysql2/promise';
import environments from '../config/environments.js';

// El código comentado serviría para inicializar la base de datos con el script, sin usar Xampp
//const sql = fs.readFileSync(path.resolve('init.sql'), 'utf-8');

const { database } = environments;

const connection = mysql.createPool({
  host: database.host,
  user: database.user,
  port: database.port,
  password: database.password,
  database: database.name,
  decimalNumbers: true,
});

/*
try {
  await connection.query(sql);
  console.log('Base de datos inicializada correctamente');
} catch (error) {
  console.error('Error al inicializar la base de datos:', error);
}
*/

export default connection;