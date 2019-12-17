var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const Horse = require('../models/horse.js');
const Customer = require('../models/customer.js');

//Get a search
exports.getSearch = async (req,res,next) => {
  console.log(req.params.id);
  Promise.all([
    Customer.fuzzySearch(req.params.id),
    Horse.fuzzySearch(req.params.id)
    //Customer.fuzzySearch(req.params.id)
  ])
  .then(function(result) {
    res.status(201).send([].concat.apply([],result));
  })
  // .then(results=>{
  //   console.log(results);
  //   // const [horses, customers] = results;
  //   // console.log("horses",horses);
  //   // console.log("customers",customers);
  // })
  .catch(err=>{
    console.error("Something went wrong",err);
  })
  // console.log("Request received");
  // let respons = [];
  // let respons = {
  //   horses: [],
  //   customers: []
  // }



  // Horse.fuzzySearch(req.params.id, function (err, result) {
  //   respons.push(result)
  //   console.error(err);
  //   console.log(result);
  //   });
  //   console.log(respons);
  //   res.status(201).send("test");



  // try {
  //   console.log('search for ' + req.params.id + ' succesfully received');
  //   await Horse.find({
  //     $match: {
  //       name: {
  //         $regex: "Joske",
  //         '$options': 'i'
  //       }
  //     }
  //   }, (err, horses) => {
  //     if (err) return next(err);
  //     res.status(201).json(horses);
  //   });
  // } catch (err) {
  //   return next(err);
  // }

  // try {
  //   console.log('search for ' + req.params.id + ' succesfully received');
  //   await Horse.fuzzySearch("Again", (err, results) => {
  //     if (err) return next(err);
  //     res.status(201).send(results);
  //   });
  // } catch (err) {
  //   return next(err);
  // }
};
