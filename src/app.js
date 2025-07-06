import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import backofficeRoutes from './routes/backofficeRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parsea JSON

// TODO:Rutas
app.use(express.static('public'));
app.use('/products', productRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

/*
 *  Configuración de EJS views
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/backoffice', backofficeRoutes);

export default app;
