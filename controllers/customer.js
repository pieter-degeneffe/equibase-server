const Customer = require('../models/customer.js');

//Create a new customer
exports.createCustomer = async (req, res, next) => {
  try {
    let customer = new Customer(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    );
    console.log(customer);
    await customer.save((err) => {
      if (err) return next(err);
      res.status(201).send(customer);
    })
  }
  catch(err) {
    return res.status(500).send(customer);
  }
};

//Display list of all Customers
exports.displayAllCustomers = async (req, res, next) => {
  try {
    await Customer.find({}, (err, customers) => {
      if (err) res.status(404).send();
      res.status(201).json(customers);
    });
  } catch (err) {
    return next(err);
  }
};

//Display a specific horse
// exports.displaySpecificHorse = async (req,res,next) => {
//   try {
//     await Horse.findById(req.params.id, (err, horse) => {
//       if (err) res.status(404).send();
//       res.status(201).send(horse);
//     });
//   }
//   catch(err) {
//     return res.status(500).send(err);
//   }
// };
//

//
// //Update an existing horse
// exports.updateHorse = (req, res, next) => {
//   Horse.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, horse) => {
//     if (err) return next(err);
//     res.send('Product updated.');
//   });
// };
//
// //Delete an existing Horse
// exports.deleteHorse = (req,res,next) => {
//   Horse.findByIdAndDelete(req.params.id, (err, horse) => {
//     if (err) return next(err);
//     res.send(`The horse was succesfully deleted`);
//   });
// };
