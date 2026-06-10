import express from 'express';
import productRoutes from './src/routers/productRoutes.js';

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

const PORT = 3000;

// Rota raiz para health check
app.get('/', (req, res) => {
  res.json({
    message: 'InfoCom API no ar 🚀'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});