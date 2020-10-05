const { cleanQuery } = require('../utils/helpers.js');
const Product = require('../models/stock/product');
const ProductBatch = require('../models/stock/productBatch');
const { getItem, updateItemById, deleteItem, getItemById, getStockForProduct } = require('../utils/mongoose');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { options, query } = cleanQuery(req);
    const [products, total] = await Promise.all([
      getItem(Product, query, options),
      Product.countDocuments(query)
    ]);
    res.status(200).json({ products, total });
  } catch (err) {
    next(err);
  }
};

exports.batchCreateProducts = async (req, res, next) => {
  try {
    const products = await Product.insertMany(req.body.products);
    res.status(201).send(products);
  } catch (e) {
    next({ statusCode: 400, ...e });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body.product);
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    next({ statusCode: 400, ...e });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await getItemById(Product, req.params.id);
    res.status(200).send(product);
  } catch (e) {
    next({ statusCode: 400, ...e });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await updateItemById(Product, req.params.id, req.body.product);
    res.status(200).send(product);
  } catch (e) {
    next({ statusCode: 400, ...e });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteItem(Product, id);
    const { batches } = await getStockForProduct(product);

    await Promise.all(batches.map(({ _id }) => deleteItem(ProductBatch, _id)));
    res.status(200).send(`The product was successfully deleted`);
  } catch (e) {
    next(e);
  }
};
