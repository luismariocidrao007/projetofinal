import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../data/products.json');

function readAll() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeAll(products) {
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

function findAll() {
  return readAll();
}

function create(data) {
  const products = readAll();

  const lastId =
    products.length > 0
      ? products[products.length - 1].id
      : 0;

  const newProduct = {
    id: lastId + 1,
    ...data
  };

  products.push(newProduct);

  writeAll(products);

  return newProduct;
}

export default {
  findAll,
  create,
  findById,
  update,
  remove
};

function findById(id) {
  const products = readAll();

  return products.find((product) => product.id === id);
}

function update(id, data) {
  const products = readAll();

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  const updatedProduct = {
    id,
    ...data,
  };

  products[index] = updatedProduct;

  writeAll(products);

  return updatedProduct;
}

function remove(id) {
  const products = readAll();

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);

  writeAll(products);

  return true;
}

function patch(id, data) {
  const products = readAll();

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  const updatedProduct = {
    ...products[index],
    ...data,
    id,
  };

  products[index] = updatedProduct;

  writeAll(products);

  return updatedProduct;
}

function findByCategory(category) {
  const products = readAll();

  return products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );
}

function findByCategory(category) {
  const products = readAll();

  return products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );
}

function searchByTitle(search) {
  const products = readAll();

  return products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
}

export default {
  findAll,
  findById,
  findByCategory,
  searchByTitle,
  create,
  update,
  patch,
  remove,
};