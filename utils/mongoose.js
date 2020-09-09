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
exports.getItem = async (model, query) => {
  const item = await model.find(query);

  if (item) {
    return item;
  } else {
    throw { statusCode: 404, message: `${ query } nothing found`, status: 'Not Found' };
  }
};
exports.updateItemById = async (model, id, item) => {
  const newItem = model.findByIdAndUpdate(id, item, { new: true });
  if (!newItem) {
    throw { statusCode: 404, message: `${ id } not found`, status: 'Not Found' };
  }
  return item;
};

exports.getStockForProduct = async (product) => {
  const batches = await this.getItem(ProductBatch, { product: product._id });
  return {
    ...product._doc,
    batches,
    remaining: batches.reduce((total, cur) => total + cur.remainingAmount, 0)
  };
};
