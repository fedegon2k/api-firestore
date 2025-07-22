import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { join, __dirname } from './utils/index.js';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import notFoundMiddleware from './middlewares/404.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
app.set('PORT', process.env.PORT || 5000);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ title: 'Home Page' });
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

// Manejo de errores
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Servidor
app.listen(app.get('PORT'), () => {
  console.log(`Servidor: http://localhost:${app.get('PORT')}`);
});