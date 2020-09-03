const Horse = require('../models/horse.js');
const Customer = require('../models/customer.js');
const Product = require('../models/stock/product.js');

//Search for a customer or horse
exports.getSearch = async (req, res, next) => {
  try {
    const { searchValue } = req.params;
    const [customers, horses,] = await Promise.all([
      Customer.fuzzySearch(searchValue),
      Horse.fuzzySearch(searchValue),
    ]);
    res.status(200).send([...customers, ...horses]);
  } catch (err) {
    return next(err);
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const result = await Product.fuzzySearch(req.params.searchValue);
    res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

