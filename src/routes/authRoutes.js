import express from 'express';
import { renderLogin, login, logout } from '../controllers/backoffice/authController.js';

const router = express.Router();

// Rutas de autenticación
router.get('/login', renderLogin);
router.post('/login', login);
router.get('/logout', logout);

export default router;
