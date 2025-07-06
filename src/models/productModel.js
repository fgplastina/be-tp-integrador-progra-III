import db from '../database/db.js';

// Obtener todos los productos activos
export const getAllProducts = async () => {
  try {
    const [rows] = await db.execute(
      'SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id'
    );
    console.log('Productos obtenidos:', rows);
    return rows;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error al obtener el producto por el ID:', error);
    throw error;
  }
};

// Crear producto
export const createProduct = async (data) => {
  try {
    const { name, description, price, image_url, category_id } = data;
    console.log('Data para crear producto:', data);
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, image_url, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image_url, category_id]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (id, data) => {
  try {
    const { name, description, price, image_url, category_id } = data;
    console.log('Data para actualizar producto:', data);
    const [result] = await db.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category_id = ? WHERE id = ?',
      [name, description, price, image_url, category_id, id]
    );
    return result;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (id) => {
  try {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

// Desactivarlo
export const deactivateProduct = async (id) => {
  try {
    const [result] = await db.execute('UPDATE products SET is_active = FALSE WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error al desactivar el producto:', error);
    throw error;
  }
};

// Activarlo
export const activateProduct = async (id) => {
  try {
    const [result] = await db.execute('UPDATE products SET is_active = TRUE WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error al activar el producto:', error);
    throw error;
  }
};
