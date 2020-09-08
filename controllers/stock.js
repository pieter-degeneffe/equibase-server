const ProductBatch = require('../models/stock/productBatch.js');
const Product = require('../models/stock/product.js');
const StockModification = require('../models/stock/stockModification.js');
const { getStockForProduct } = require('../utils/mongoose');
const { cleanQuery } = require('./helpers.js');

exports.getAllStock = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc, query } = cleanQuery(req);
    const [products, total] = await Promise.all([
      Product.find(query).skip((limit * page) - limit).limit(limit).sort({ [sortBy]: sortDesc }).exec(),
      Product.countDocuments(query)
    ]);
    const data = await Promise.all(products.map(getStockForProduct));
    res.status(200).json({
      data,
      total
    });
  } catch (err) {
    return next(err);
  }
};

exports.getExpiredStock = async (req, res, next) => {
  try {
    const stock = await ProductBatch
      .aggregate()
      .match({ expirationDate: { '$lt': new Date() } })
      .group({ _id: '$product', batches: { $push: '$$CURRENT' } });
    res.status(200).json({ stock });
  } catch (err) {
    return next(err);
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const data = await getStockForProduct(product);

    res.status(200).json({
      data
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const batches = await ProductBatch.find({
      product: req.params.id,
      expirationDate: { $gt: new Date() },
      remainingAmount: { $gt: 0 }
    }).sort({ expirationDate: 1 });
    const totalRemaining = batches.reduce((prev, curr) => prev += curr.remainingAmount, 0);

    if (batches.length === 0) {
      return res.status(404).send('No valid batches found for this product');
    }
    let { amount } = req.body;
    if (totalRemaining < amount) {
      return res.status(403).send('Not enough in stock');
    }

    let counter = 0;
    while (amount > 0) {
      const { _id, remainingAmount } = batches[counter];
      await ProductBatch.findByIdAndUpdate(_id, { remainingAmount: remainingAmount > amount ? remainingAmount - amount : 0 });
      amount = amount - remainingAmount;
      counter++;
    }
    res.status(200).json({
      data: batches
    });
  } catch (err) {
    return next(err);
  }
};

exports.addBatch = async (req, res) => {
  try {
    const batch = new ProductBatch({ ...req.body, remainingAmount: req.body.initialAmount });
    const productExists = await Product.exists({ _id: req.body.product });
    if (productExists) {
      const stockModification = new StockModification({
        batch: batch._id,
        product: req.body.product,
        amount: batch.initialAmount,
        type: 'Aankoop'
      });
      await Promise.all([
        stockModification.save(),
        batch.save()
      ]);
      return res.status(201).send(batch);
    } else {
      return res.status(404).send({ errors: { notFound: `Product with ID ${ req.body.product } does not exist` } });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
