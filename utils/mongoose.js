const ProductBatch = require('../models/stock/productBatch.js');
const Product = require('../models/stock/product.js');

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

exports.getStockForProduct = async (product) => await product.getStock();
