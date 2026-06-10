import repo from '../repositories/productRepository.js';

// GET /products
function getAll(req, res) {
  const products = repo.findAll();
  res.json(products);
}

// POST /products
function create(req, res) {
  const { title, price, description, category, image } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: 'Título e preço são obrigatórios' });
  }

  const newProduct = repo.create({
    title,
    price: Number(price),
    description: description || '',
    category: category || '',
    image: image || '',
    rating: {
      rate: 0,
      count: 0
    }
  });

  res.status(201).json(newProduct);
}

export default {
  getAll,
  create
};