import db from '../database/db.js';

// Obtener todas las ventas con total y fecha
export const getAllSales = async () => {
  const [rows] = await db.execute(`
    SELECT s.id, s.total, s.created_at, count(si.id) AS item_count
    FROM sales s
    LEFT JOIN sale_items si ON s.id = si.sale_id
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `);
  return rows;
};

// Obtener una venta por ID (con detalle de ítems)
export const getSaleDetails = async (id) => {
  const [saleRows] = await db.execute(
    `
    SELECT id, total, created_at
    FROM sales
    WHERE id = ?
  `,
    [id]
  );

  if (saleRows.length === 0) return { sale: null, items: [] };

  const [items] = await db.execute(
    `
    SELECT 
      si.id,
      si.product_id,
      p.name AS product_name,
      p.image_url,
      si.quantity,
      si.unit_price,
      (si.quantity * si.unit_price) AS subtotal
    FROM sale_items si
    JOIN products p ON si.product_id = p.id
    WHERE si.sale_id = ?
  `,
    [id]
  );

  return {
    sale: saleRows[0],
    items,
  };
};

// Crear una nueva venta con sus ítems
export const createSale = async (total, items) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute('INSERT INTO sales (total) VALUES (?)', [total]);

    const saleId = result.insertId;

    for (const item of items) {
      await conn.execute(
        `INSERT INTO sale_items (sale_id, product_id, quantity, unit_price)
         VALUES (?, ?, ?, ?)`,
        [saleId, item.product_id, item.quantity, item.unit_price]
      );
    }

    await conn.commit();
    return saleId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// Eliminar una venta (los ítems se eliminan por el ON DELETE CASCADE)
export const deleteSale = async (id) => {
  const [result] = await db.execute('DELETE FROM sales WHERE id = ?', [id]);
  return result;
};

// Obtener los ítems de una venta por su ID
export const getItemsBySaleId = async (saleId) => {
  try {
    const [rows] = await db.execute(
      `
        SELECT si.*, p.name AS product_name 
        FROM sale_items si
        JOIN products p ON si.product_id = p.id
        WHERE si.sale_id = ?
      `,
      [saleId]
    );
    return rows;
  } catch (error) {
    console.error('Error al obtener los ítems de la venta:', error);
    throw error;
  }
};

// Obtener una venta por ID
export const getSaleById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM sales WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    throw error;
  }
};

export const updateSale = async (id, data) => {
  const { total } = data;
  await db.execute('UPDATE sales SET total = ? WHERE id = ?', [total, id]);
};

export const updateSaleItems = async (saleId, items) => {
  await db.execute('DELETE FROM sale_items WHERE sale_id = ?', [saleId]);

  const insertQuery = `
    INSERT INTO sale_items (sale_id, product_id, quantity, unit_price)
    VALUES (?, ?, ?, ?)
  `;

  for (const item of items) {
    const { product_id, quantity, unit_price } = item;
    await db.execute(insertQuery, [saleId, product_id, quantity, unit_price]);
  }
};
