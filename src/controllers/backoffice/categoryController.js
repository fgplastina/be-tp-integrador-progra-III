import * as categoryModel from '../../models/categoryModel.js';

// Listado
export const listCategories = async (req, res) => {
  const categories = await categoryModel.getAllCategories();
  res.render('backoffice/categories/list', { categories });
};

// Formulario de creación
export const renderCreateCategoryForm = (req, res) => {
  res.render('backoffice/categories/form', {
    category: null,
    formAction: '/backoffice/categories/create',
  });
};

// Crear
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  await categoryModel.createCategory({ name, description });
  res.redirect('/backoffice/categories');
};

// Formulario de edición
export const renderEditCategoryForm = async (req, res) => {
  const category = await categoryModel.getCategoryById(req.params.id);
  if (!category) return res.status(404).send('Categoría no encontrado');
  res.render('backoffice/categories/form', {
    category,
    formAction: `/backoffice/categories/${req.params.id}/edit`,
  });
};

// Editar
export const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  await categoryModel.updateCategory(req.params.id, { name, description });
  res.redirect('/backoffice/categories');
};

// Eliminar
export const deleteCategory = async (req, res) => {
  await categoryModel.deleteCategory(req.params.id);
  res.redirect('/backoffice/categories');
};
