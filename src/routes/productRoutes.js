import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deactivateProduct,
  activateProduct,
} from '../controllers/productController.js';

const router = Router();

// GET /api/products
router.get('/', getAllProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// POST /api/products
router.post('/', createProduct);

// PUT /api/products/:id
router.put('/:id', updateProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

// PATCH /api/products/:id/deactivate
router.patch('/:id/deactivate', deactivateProduct);

// PATCH /api/products/:id/activate
router.patch('/:id/activate', activateProduct);

export default router;
