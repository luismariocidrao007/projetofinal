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
  create
};