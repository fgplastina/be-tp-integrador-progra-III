import * as categoryModel from '../models/categoryModel.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json(categories || []);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar la categoría' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'No se encontro el categoría' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar la categoría' });
  }
};
