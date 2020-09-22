const ProductBatch = require('../models/stock/productBatch.js');
const Product = require('../models/stock/product.js');
const StockModification = require('../models/stock/stockModification.js');
const Customer = require('../models/customer.js');
const Horse = require('../models/horse.js');
const { modificationTypes } = require('../consts');
const { getItem, getItemById, getStockForProduct } = require('../utils/mongoose');
const { cleanQuery } = require('../utils/helpers.js');
const { ObjectId } = require('mongoose').Types;

exports.getAllStock = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc, query } = cleanQuery(req);
    console.log('Arne: query= ', query);
    const [products, total] = await Promise.all([
      Product.find(query).skip((limit * page) - limit).limit(limit).sort({ [sortBy]: sortDesc }),
      Product.countDocuments(query)
    ]);
    // const stock = await Promise.all(products.map(getStockForProduct));
    res.status(200).json({
      products,
      total
    });
  } catch (err) {
    return next(err);
  }
};

exports.getExpiredStock = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc } = cleanQuery(req);
    const stock = ProductBatch
      .aggregate()
      .match({ expirationDate: { '$lt': new Date() } })
      .group({ _id: '$product', batches: { $push: '$$CURRENT' } })
      .skip((limit * page) - limit)
      .limit(limit)
      .sort({ [sortBy]: sortDesc });
    res.status(200).json({ stock });
  } catch (err) {
    return next(err);
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc, query } = cleanQuery(req);
    const [product, batches, total] = await Promise.all([
      ProductBatch.find({ product: req.params.id }).skip((limit * page) - limit).limit(limit).sort({ [sortBy]: sortDesc }),
      ProductBatch.countDocuments({product:req.params.id}),
    ]);

    res.status(200).json({
      batches,
      total
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    let { amount, type, client, horse } = req.body;
    const { id: product } = req.params;
    const missingProperties = [];
    const clientValid = ObjectId.isValid(client);
    const horseValid = ObjectId.isValid(horse);
    const [horseExists, clientExists] = await Promise.all([
      horseValid ? Horse.exists({ _id: horse }) : '',
      clientValid ? Customer.exists({ _id: client }) : ''
    ]);
    if (!amount) {
      missingProperties.push('amount');
    }
    if (!type) {
      missingProperties.push('type');
    }
    if (type === modificationTypes.SEL && !clientExists) {
      missingProperties.push('client');
    }
    if (type === modificationTypes.ADMINISTRATION && !horseExists) {
      missingProperties.push('horse');
    }
    if (missingProperties.length > 0) {
      return next({
        statusCode: 400,
        message: `Missing ${ missingProperties.length === 1 ? 'property' : 'properties' }: ${ missingProperties.join(', ') }`
      });
    }

    const batches = await ProductBatch.find({
      product,
      expirationDate: { $gt: new Date() },
      remainingAmount: { $gt: 0 }
    }).sort({ expirationDate: 1 });
    const totalRemaining = batches.reduce((prev, curr) => prev += curr.remainingAmount, 0);

    if (batches.length === 0) {
      throw {
        statusCode: 404,
        message: `No valid batches found for this product: ${ req.params.id }`,
        status: 'Not Found'
      };
    }
    if (totalRemaining < amount) {
      throw { statusCode: 403, message: 'Not enough in stock', status: 'Not Found' };
    }

    let index = 0;
    while (amount > 0) {
      const { _id: batch, remainingAmount } = batches[index];
      const newRemaining = remainingAmount > amount ? remainingAmount - amount : 0;
      const mod = new StockModification({
        type,
        client,
        horse,
        product,
        batch,
        amount: newRemaining === 0 ? remainingAmount : amount,
      });
      await mod.validate();
      await Promise.all([
        ProductBatch.findByIdAndUpdate(batch, { remainingAmount: newRemaining }),
        mod.save()
      ]);
      amount = amount - remainingAmount;
      index++;
    }
    res.send(204);
  } catch (err) {
    return next(err);
  }
};

exports.addBatch = async (req, res, next) => {
  try {
    const productExists = await Product.exists({ _id: req.body.product });
    if (productExists) {
      const batch = new ProductBatch({ ...req.body, remainingAmount: req.body.initialAmount });
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
      throw { statusCode: 404, message: `Product with ID ${ req.body.product } does not exist`, status: 'Not Found' };
    }
  } catch (e) {
    next({ statusCode: 400, ...e });
  }
};

exports.getStockModById = async (req, res, next) => {
  try {
    const { out } = req.query;
    const mods = await getItem(StockModification, {
      product: req.params.id,
      type: out ? { $not: modificationTypes.BUY } : undefined
    });
    res.status(200).json(mods);
  } catch (e) {
    next(e);
  }
};

exports.getStockMod = async (req, res, next) => {
  try {
    const { from, to, out } = req.query;
    const mods = await getItem(StockModification, out !== undefined ? {
      type: { $ne: modificationTypes.BUY }, createdAt: {
        $gte: new Date(from ? from : 0),
        $lte: to ? new Date(to) : new Date()
      }
    } : {});
    res.status(200).json(mods);
  } catch (e) {
    next(e);
  }
};

exports.getDeliveries = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const deliveries = await getItem(ProductBatch, {
      deliveryDate: {
        $gte: new Date(from),
        $lte: to ? new Date(to) : new Date()
      }
    }, { sort: 'deliveryDate' });
    res.json(deliveries);
  } catch (e) {
    next(e);
  }
};
