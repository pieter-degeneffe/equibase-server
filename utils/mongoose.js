const ProductBatch = require('../models/stock/productBatch.js');

exports.deleteItem = async (model, id) => {
  const item = await model.findByIdAndDelete(id);

  if (item) {
    return item;
  } else {
    throw { statusCode: 404, message: `${ id } not found`, status: 'Not Found' };
  }
};

exports.getStockForProduct = async (product) => {
  const batches = await ProductBatch.find({ product: product._id });
  return {
    ...product._doc,
    batches,
    remaining: batches.reduce((total, cur) => total + cur.remainingAmount, 0)
  };
};
