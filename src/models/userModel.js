import pool from '../database/db.js';

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
  return rows;
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Crear usuario
export const createUser = async ({ name, email, password, role }) => {
  await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
    name,
    email,
    password,
    role || 'customer',
  ]);
};

// Actualizar usuario
export const updateUser = async (id, data) => {
  // Armamos un update dinámico para evitar un UPDATE a password null o undefined.
  const fields = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push('name = ?');
    values.push(data.name);
  }

  if (data.email !== undefined) {
    fields.push('email = ?');
    values.push(data.email);
  }

  if (data.role !== undefined) {
    fields.push('role = ?');
    values.push(data.role);
  }

  if (data.password !== undefined) {
    fields.push('password = ?');
    values.push(data.password);
  }

  // Si no hay campos para actualizar, no hacemos nada.
  if (fields.length === 0) return;

  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  return pool.query(sql, values);
};

// Eliminar usuario
export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};
