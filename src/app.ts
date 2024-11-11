import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import vendedorRoutes from './routes/vendedorRoutes';
import productoRoutes from './routes/productoRoutes';
import categoriaRoutes from './routes/categoriaRoutes';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api', vendedorRoutes);
app.use('/api', productoRoutes);
app.use('/api', categoriaRoutes);

if (process.env.NODE_ENV !== 'lambda') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;