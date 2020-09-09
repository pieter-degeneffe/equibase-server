const { cleanQuery } = require('./helpers.js');
const { productTypes, taxes } = require('../consts');
const Product = require('../models/stock/product');
const ProductBatch = require('../models/stock/productBatch');
const { updateItemById } = require('../utils/mongoose');
const { deleteItem, getItemById, getStockForProduct } = require('../utils/mongoose');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc, query } = cleanQuery(req);
    const [data, total] = await Promise.all([
      Product.find(query).skip((limit * page) - limit).limit(limit).sort({ [sortBy]: sortDesc }).exec(),
      Product.countDocuments(query)
    ]);
    res.status(200).json({
      products: data,
      total
    });
  } catch (err) {
    next(err);
  }
};

exports.getConfig = async (req, res, next) => {
  try {
    res.status(200).json({
      types: productTypes,
      tax: taxes,
    });
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

    await Promise.all(batches.map(({ _id }) => deleteItem(ProductBatch,_id)));
    res.status(200).send(`The product was successfully deleted`);
  } catch (e) {
    next(e);
  }
};
