const { cleanQuery } = require('./helpers.js');
const { productTypes, taxes } = require('../consts');
const Product = require('../models/stock/product');
const ProductBatch = require('../models/stock/productBatch');
const { getStockForProduct } = require('../utils/mongoose');
const { deleteItem } = require('../utils/mongoose');

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
    return next(err);
  }
};

exports.getConfig = async (req, res, next) => {
  try {
    res.status(200).json({
      types: productTypes,
      tax: taxes,
    });
  } catch (err) {
    return next(err);
  }
};

exports.batchCreateProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body.products);
    res.status(201).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body.product);
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.sendStatus(404);
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body.product, { new: true });
    if (!product) {
      return res.sendStatus(404);
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteItem(Product, id);
    const { batches } = await getStockForProduct(product);

    await Promise.all(batches.map(({ _id }) => ProductBatch.findByIdAndDelete(_id)));
    res.status(200).send(`The product was successfully deleted`);
  } catch (e) {
    next(e);
  }
};
