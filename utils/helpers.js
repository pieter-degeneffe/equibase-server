const StockModification = require('../models/stock/stockModification.js');
const ProductBatch = require('../models/stock/productBatch.js');
const { modificationTypes } = require('../consts');

const { updateItemById } = require('./mongoose');
const { getItemById } = require('./mongoose');
exports.cleanQuery = (req) => {
  let limit, page, sortBy, sortDesc;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
    delete req.query.limit;
  }
  if (req.query.page) {
    page = parseInt(req.query.page);
    delete req.query.page;
  }
  if (req.query.sortBy) {
    sortBy = req.query.sortBy[0];
    delete req.query.sortBy;
  }
  if (req.query.sortDesc) {
    sortDesc = req.query.sortDesc[0] === 'true' ? -1 : 1;
    delete req.query.sortDesc;
  }
  return { limit, page, sortBy, sortDesc, query: req.query };
};

exports.updateStatus = async (id, newStatus) => {
  const originalBatch = await getItemById(ProductBatch, id);
  const updatedBatch = await updateItemById(ProductBatch, id, { ...originalBatch.toObject(), active: newStatus });
  const mod = new StockModification({
    type: newStatus ? modificationTypes.ACTIVATED : modificationTypes.DEACTIVATED,
    product: originalBatch.product,
    batch: id,
    amount: originalBatch.remainingAmount,
  });
  await mod.save();
  return updatedBatch;
};
