import productService from '../services/product.service.js';

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAll();
    if (products.length === 0) {
      return res.status(200).json({ message: 'No hay productos disponibles' });
    }
    res.status(200).json({ message: 'Listado de productos', payload: products });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto encontrado', payload: product });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }
    const newProduct = await productService.create({ name, price });
    res.status(201).json({ message: 'Producto creado', payload: newProduct });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }
    const updatedProduct = await productService.update(req.params.id, { name, price });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto actualizado', payload: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
};

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };