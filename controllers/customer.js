const Customer = require('../models/customer.js');

//Create a new customer
exports.createCustomer = async (req, res, next) => {
  try {
    let customer = new Customer(req.body);
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
exports.getAllCustomers = async (req, res, next) => {
  try {
    await Customer.find({}, (err, customers) => {
      if (err) res.status(404).send();
      res.status(201).json(customers);
    });
  } catch (err) {
    return next(err);
  }
};

//Display a specific customer
exports.getCustomer = async (req,res,next) => {
  try {
    await Customer.findById(req.params.id, (err, customer) => {
      if (err) res.status(404).send();
      res.status(200).send(customer);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Display the horses of a specific customer
exports.getHorsesOfCustomer = async (req,res,next) => {
  try {
    const horsesByCustomer = await Customer.findById(req.params.id).populate('horses').exec(function(err, horsesByCustomer) {
      if (err) return next(err);
      res.status(200).send(horsesByCustomer.horses);
    })
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Update an existing customer
exports.updateCustomer = async (req, res, next) => {
  try {
    const response = await Customer.findOneAndUpdate(req.params.id, {$set: req.body.customer}, (err, customer) => {
      if (err) return next(err);
      res.status(201).send(customer);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Delete an existing Horse
exports.deleteCustomer = async (req,res,next) => {
  try {
    Customer.findByIdAndDelete(req.params.id, (err, customer) => {
      if (err) return next(err);
      res.status(200).send(`The customer was succesfully deleted`);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};
