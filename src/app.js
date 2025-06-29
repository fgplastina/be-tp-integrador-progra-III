import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parsea JSON

// TODO:Rutas
app.use(express.static('public'));
app.use('/products', productRoutes);

export default app;
