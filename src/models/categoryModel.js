import db from '../database/db.js';

// Obtener todos los categorias activos
export const getAllCategories = async () => {
  const [rows] = await db.execute('SELECT * FROM categories');
  return rows;
};

// Obtener categoria por ID
export const getCategoryById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};

// Crear categoria
export const createCategory = async (data) => {
  const { name, description } = data;
  console.log('Creando la categoria con datos:', data);
  const [result] = await db.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [
    name,
    description,
  ]);
  return result.insertId;
};

// Actualizar categoria
export const updateCategory = async (id, data) => {
  const { name, description } = data;
  console.log('Actualizando categoria con ID:', id, 'con datos:', data);
  const [result] = await db.execute(
    'UPDATE categories SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
  return result;
};

// Eliminar categoria
export const deleteCategory = async (id) => {
  const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
  return result;
};
