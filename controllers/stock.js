const ProductBatch = require('../models/stock/productBatch.js');
const Product = require('../models/stock/product.js');
const StockModification = require('../models/stock/stockModification.js');
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
const getStockForProduct = async (product) => {
  const batches = await ProductBatch.find({ product: product._id });
  return {
    ...product._doc,
    batches: batches.map(batch => batch.lotNumber),
    remaining: batches.reduce((total, cur) => total + cur.remainingAmount, 0)
  };
};
exports.getStockById = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc, } = cleanQuery(req);
    const product = await Product.findById(req.params.id).skip((limit * page) - limit).limit(limit).sort({ [sortBy]: sortDesc }).exec();
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
    const { limit, page, sortBy, sortDesc, } = cleanQuery(req);
    const product = await Product.update(req.params.id, {}).skip((limit * page) - limit).limit(limit).sort({ [sortBy]: sortDesc }).exec();
    const data = await getStockForProduct(product);

    res.status(200).json({
      data
    });
  } catch (err) {
    return next(err);
  }
};

exports.addBatch = async (req, res) => {
  try {
    const batch = new ProductBatch(req.body);
    const productExists = await Product.exists({ _id: req.body.product });
    if (productExists) {
      const stockModification = new StockModification({
        batch: batch._id,
        product: req.body.product,
        amount: batch.initialAmount,
        type: 'Aankoop'
      });
      await Promise.all([stockModification.save(),
        await batch.save()]);
      return res.status(201).send(batch);
    } else {
      return res.status(404).send({ errors: { notFound: `Product with ID ${ req.body.product } does not exist` } });
    }
  } catch (e) {
    console.log('Arne: e= ', e);
    res.status(400).send(e);
  }
};
