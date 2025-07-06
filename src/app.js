import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/productRoutes.js';
import backofficeRoutes from './routes/backofficeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { requireAdmin } from './middlewares/authMiddleware.js';

const app = express();

// Ruta base del proyecto (necesaria con ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 *  Middlewares globales
 */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'clave_secreta_segura',
    resave: false,
    saveUninitialized: false,
  })
);

//  Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

/*
 *  Rutas
 */
app.use('/products', productRoutes); // API
app.use('/', authRoutes); // Login / logout
app.use('/backoffice', requireAdmin, backofficeRoutes); // Admin protegido

/*
 *  Configuración del motor de vistas EJS
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

export default app;
