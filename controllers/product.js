const { cleanQuery } = require('./helpers.js');

const Product = require('../models/stock/product.js');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc, query } = cleanQuery(req);
    const [data, total] = await Promise.all([
      Product.find(query).skip((limit * page) - limit).limit(limit).sort({ [sortBy]: sortDesc }).exec(),
      Product.countDocuments(query)
    ]);
    res.status(200).json({
      data,
      total
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

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(`The product was successfully deleted`);
  } catch (e) {
    res.status(400).send(e);
  }
};
