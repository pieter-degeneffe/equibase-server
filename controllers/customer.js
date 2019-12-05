const Customer = require('../models/customer.js');

//Create a new customer
exports.createCustomer = async (req, res, next) => {
  try {
    let customer = new Customer(req.body.customer);
    await customer.save((err) => {
      if (err) return next(err);
      res.status(201).send(customer);
    })
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Get all Customers
exports.getAllCustomers = async (req, res, next) => {
  try {
    await Customer.find({}, (err, customers) => {
      if (err) res.status(404).send();
      res.status(201).send(customers);
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

//Get customer count
exports.getCustomerCount = async (req, res, next) => {
  try {
    await Customer.countDocuments({}, (err, count) => {
      if (err) res.status(404).send();
      res.status(201).json(count);
    });
  } catch(err) {
    return res.status(500).send(err);
  }
};

//Get a specific customer
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

// Get the horses of a specific customer
exports.getHorsesOfCustomer = async (req,res,next) => {
  try {
    // console.log("succes");
    const horsesByCustomer = await Horse.find({owner: req.params.id}).exec(function(err, horses) {
      if (err) return next(err);
      res.status(200).send(horses);
    })
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Update an existing customer
exports.updateCustomer = async (req, res, next) => {
  try {
    const response = await Customer.findByIdAndUpdate(req.params.id, {$set: req.body.customer}, (err, customer) => {
      if (err) return next(err);
      res.status(201).send(customer);
      console.log(customer);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Update the horse of an existing customer
exports.updateHorseOfCustomer = async (req, res, next) => {
  try {
    const response = await Customer.findOneAndUpdate(req.params.id, (err, horse) => {
      if (err) return next(err);
      res.status(201).send(customer);
      console.log(customer);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Delete a Customer
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

//Add a contact to a customer
exports.addContact = async (req,res,next) => {
  try {
    var opts = { runValidators: true };
    Customer.findByIdAndUpdate(req.params.id, {$push: {contacts: req.body}}, opts, (err, customer) => {
      if (err) return next(err);
      res.status(200).send(`The contact was succesfully added`);
    });
  } catch(err) {
    return res.status(500).send(err);
  }
}

//Update the contact of a customer
exports.updateContact = async (req,res,next) => {
  try {
    await Customer.findById(req.params.id, (err, customer) => {
      const contact = customer.contacts.id(req.params.contactId);
      contact.set(req.body);
      customer.save().then(function(savedPost) {
        res.send(savedPost);
      }).catch(function(err) {
        res.status(500).send(err);
      });
    });
  } catch(err) {
    return res.status(500).send(err);
  }
}
//Remove a contact from a customer
exports.deleteContact = async (req,res,next) => {
  try {
    Customer.findByIdAndUpdate(req.params.id, {$pull: {contacts: {_id: req.params.contactId}}}, (err, customer) => {
      res.status(200).send(`The contact was succesfully removed`);
    });
  } catch(err) {
    return res.status(500).send(err);
  }
}

//Get countries
exports.getCountries = (req, res, next) => {
  const countries = Customer.schema.path('country').enumValues;
  res.status(201).send(countries);
};
