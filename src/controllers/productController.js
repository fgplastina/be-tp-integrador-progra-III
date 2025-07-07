import * as productModel from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products || []);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar el producto' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'No se encontro el producto' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar el producto' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const id = await productModel.createProduct(req.body);
    res.status(201).json({ message: 'Created', id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al crear el product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const result = await productModel.updateProduct(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'No se encontro el producto' });
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await productModel.deleteProduct(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'No se encontro el producto' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

export const deactivateProduct = async (req, res) => {
  try {
    const result = await productModel.deactivateProduct(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'No se encontro el producto' });
    res.json({ message: 'Producto desactivado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al desactivar el producto' });
  }
};

export const activateProduct = async (req, res) => {
  try {
    const result = await productModel.activateProduct(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'No se encontro el producto' });
    res.json({ message: 'Producto activado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al activar el producto' });
  }
};
