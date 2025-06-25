import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parsea JSON

// TODO:Rutas

export default app;
