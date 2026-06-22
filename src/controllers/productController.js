import repo from '../repositories/productRepository.js';

// GET /products
function getAll(req, res) {
  const { category, search } = req.query;

  if (category) {
    const products = repo.findByCategory(category);

    return res.json(products);
  }

  if (search) {
    const products = repo.searchByTitle(search);

    return res.json(products);
  }

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
  create,
  getById,
  update,
  patch,
  remove
};

function getById(req, res) {
  const id = Number(req.params.id)
    if (isNaN(id)) {

    return res.status(400).json({

      error: 'ID inválido'

    });

  };

  const product = repo.findById(id);

  if (!product) {
    return res.status(404).json({
      error: "Produto não encontrado",
    });
  }

  res.json(product);
}

function update(req, res) {
  const id = Number(req.params.id);

  const { title, price, description, category, image, rating } = req.body;
  if (typeof price !== 'number' || price < 10) {
  return res.status(400).json({
    error: 'Preço inválido'
  });
}
  const updatedProduct = repo.update(id, {
    title,
    price: Number(price),
    description,
    category,
    image,
    rating,
  });

  if (!updatedProduct) {
    return res.status(404).json({
      error: "Produto não encontrado",
    });
  }

  res.json(updatedProduct);
}

function remove(req, res) {
  const id = Number(req.params.id);

  const removed = repo.remove(id);

  if (!removed) {
    return res.status(404).json({
      error: "Produto não encontrado",
    });
  }

  res.status(204).send();
}

function patch(req, res) {
  const id = Number(req.params.id);

  const updatedProduct = repo.patch(id, req.body);

  if (!updatedProduct) {
    return res.status(404).json({
      error: "Produto não encontrado",
    });
  }

  res.json(updatedProduct);
}