import express from 'express';
import {
  listProducts,
  renderCreateForm,
  createProduct,
  renderEditForm,
  updateProduct,
  deleteProduct,
} from '../controllers/backoffice/productController.js';

import {
  listCategories,
  renderCreateCategoryForm,
  createCategory,
  renderEditCategoryForm,
  updateCategory,
  deleteCategory,
} from '../controllers/backoffice/categoryController.js';

import {
  listSales,
  createSale,
  viewSaleDetail,
  renderEditSaleForm,
  renderCreateSaleForm,
  updateSale,
  deleteSale,
} from '../controllers/backoffice/saleController.js';

import {
  listUsers,
  renderCreateUserForm,
  createUser,
  renderEditUserForm,
  updateUser,
  deleteUser,
} from '../controllers/backoffice/userController.js';

const router = express.Router();

// Ruta para el dashboard principal
router.get('/', (req, res) => {
  res.render('backoffice/dashboard');
});

// Rutas para la gestión de productos
router.get('/products', listProducts);
router.get('/products/create', renderCreateForm);
router.post('/products/create', createProduct);
router.get('/products/:id/edit', renderEditForm);
router.post('/products/:id/edit', updateProduct);
router.get('/products/:id/delete', deleteProduct);

// Rutas para la gestión de categorías
router.get('/categories', listCategories);
router.get('/categories/create', renderCreateCategoryForm);
router.post('/categories/create', createCategory);
router.get('/categories/:id/edit', renderEditCategoryForm);
router.post('/categories/:id/edit', updateCategory);
router.get('/categories/:id/delete', deleteCategory);

// Rutas para la gestión de ventas
router.get('/sales', listSales);
router.get('/sales/create', renderCreateSaleForm);
router.post('/sales/create', createSale);
router.get('/sales/:id', viewSaleDetail);
router.get('/sales/:id/delete', deleteSale);
router.get('/sales/:id/edit', renderEditSaleForm);
router.post('/sales/:id/edit', updateSale);

// Rutas para la gestión de usuarios
router.get('/users', listUsers);
router.get('/users/create', renderCreateUserForm);
router.post('/users/create', createUser);
router.get('/users/:id/edit', renderEditUserForm);
router.post('/users/:id/edit', updateUser);
router.get('/users/:id/delete', deleteUser);

export default router;
