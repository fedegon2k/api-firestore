import Product from '../models/product.model.js';

const getAll = async () => {
  return await Product.getAll();
};

const findById = async (id) => {
  return await Product.findById(id);
};

const create = async (product) => {
  return await Product.create(product);
};

const update = async (id, product) => {
  return await Product.update(id, product);
};

const deleteById = async (id) => {
  return await Product.delete(id);
};

export default { getAll, findById, create, update, deleteById };