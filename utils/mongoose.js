const ProductBatch = require('../models/stock/productBatch.js');

exports.deleteItem = async (model, id) => {
  const item = await model.findByIdAndDelete(id);

  if (item) {
    return item;
  } else {
    throw { statusCode: 404, message: `${ id } not found`, status: 'Not Found' };
  }
};

exports.getItemById = async (model, id) => {
  const item = await model.findById(id);

  if (item) {
    return item;
  } else {
    throw { statusCode: 404, message: `${ id } not found`, status: 'Not Found' };
  }
};
exports.getItem = async (model, query, options) => {
  const item = await model.find(query, null, options);

  if (item) {
    return item;
  } else {
    throw { statusCode: 404, message: `${ query } nothing found`, status: 'Not Found' };
  }
};
exports.updateItemById = async (model, id, item) => {
  const newItem = await model.findByIdAndUpdate(id, item, { new: true });
  if (!newItem) {
    throw { statusCode: 404, message: `${ id } not found`, status: 'Not Found' };
  }
  return item;
};

exports.getStockForProduct = async (product) => {
  const batches = await this.getItem(ProductBatch, { product: product._id });
  return {
    ...product.toObject(),
    remaining: batches.reduce((total, cur) => cur.active ? total + cur.remainingAmount : total, 0),
    value: batches.reduce((total, cur) => cur.active ? total + cur.sellingPrice : total, 0),
  };
};
