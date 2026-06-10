import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'InfoCom API no ar 🚀'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});