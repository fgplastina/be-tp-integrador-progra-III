import { Router } from 'express';
import { getAllCategories, getCategoryById } from '../controllers/categoryController.js';

const router = Router();

// GET /api/categories
router.get('/', getAllCategories);

// GET /api/categories/:id
router.get('/:id', getCategoryById);

export default router;
