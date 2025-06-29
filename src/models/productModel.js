import db from '../database/db.js';

// Obtener todos los productos activos
export const getAllProducts = async () => {
  const [rows] = await db.execute('SELECT * FROM products');
  return rows;
};

// Obtener producto por ID
export const getProductById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

// Crear producto
export const createProduct = async (data) => {
  const { name, description, price, image_url, category } = data;
  const [result] = await db.execute(
    'INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, image_url, category]
  );
  return result.insertId;
};

// Actualizar producto
export const updateProduct = async (id, data) => {
  const { name, description, price, image_url, category } = data;
  const [result] = await db.execute(
    'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category = ? WHERE id = ?',
    [name, description, price, image_url, category, id]
  );
  return result;
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
  return result;
};

// Desactivarlo
export const deactivateProduct = async (id) => {
  const [result] = await db.execute('UPDATE products SET is_active = FALSE WHERE id = ?', [id]);
  return result;
};

// Activarlo
export const activateProduct = async (id) => {
  const [result] = await db.execute('UPDATE products SET is_active = TRUE WHERE id = ?', [id]);
  return result;
};
