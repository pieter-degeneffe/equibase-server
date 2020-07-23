const Horse = require('../models/horse.js');
const Customer = require('../models/customer.js');
const Product = require('../models/stock/product.js');

//Search for a customer or horse
exports.getSearch = async (req, res, next) => {
  Promise.all([
      Customer.fuzzySearch(req.params.searchValue),
      Horse.fuzzySearch(req.params.searchValue)
    ])
    .then(function (result) {
      res.status(201).send([].concat.apply([], result));
    })
    .catch(err => {
      return next(err);
    });
};

exports.searchProduct = async (req, res, next) => {
  try {
    console.log('Arne: req.params= ', req.params);
    const result = await Product.fuzzySearch(req.params.searchValue);
    console.log('Arne: result= ', result);
    res.status(201).send([].concat.apply([], result));
  } catch (err) {
    return next(err);
  }
};
