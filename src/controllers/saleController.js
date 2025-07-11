import * as saleModel from '../models/saleModel.js';

export const getAllSales = async (req, res) => {
  try {
    const sales = await saleModel.getAllSales();
    res.json(sales || []);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las ventas' });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const { sale, items } = await saleModel.getSaleDetails(req.params.id);
    if (!sale) return res.status(404).json({ message: 'No se encontró la venta' });
    res.json({ ...sale, items });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la venta' });
  }
};

export const createSale = async (req, res) => {
  try {
    const { total, items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Debe incluir al menos un item en la venta' });
    }

    const id = await saleModel.createSale(total, items);
    res.status(201).json({ message: 'Venta registrada', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar la venta' });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const result = await saleModel.deleteSale(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'No se encontró la venta' });

    res.json({ message: 'Venta eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la venta' });
  }
};
