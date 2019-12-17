var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const Horse = require('../models/horse.js');
const Customer = require('../models/customer.js');

//Get a search
exports.getSearch = async (req,res,next) => {
  Promise.all([
    Customer.fuzzySearch(req.params.id),
    Horse.fuzzySearch(req.params.id)
  ])
  .then(function(result) {
    const respons = [].concat.apply([],result);
    res.status(201).send([].concat.apply([],result));
  })
  .catch(err=>{
    return next(err);
  })
};
