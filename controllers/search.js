var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const Horse = require('../models/horse.js');
const Customer = require('../models/customer.js');

//Search for a customer or horse
exports.getSearch = async (req,res,next) => {
  Promise.all([
    Customer.fuzzySearch(req.params.searchValue),
    Horse.fuzzySearch(req.params.searchValue)
  ])
  .then(function(result) {
    const respons = [].concat.apply([],result);
    res.status(201).send([].concat.apply([],result));
  })
  .catch(err=>{
    return next(err);
  })
};
