const Customer = require('../models/customer.js');
const Horse = require('../models/horse.js');
const Embryo = require('../models/embryo.js');

//Create a new customer
exports.createCustomer = async (req, res, next) => {
  try {
    let customer = new Customer(req.body.customer);
    await customer.save((err) => {
      if (err) return next(err);
      res.status(201).send(customer);
    })
  } catch(err) {
    return next(err);
  }
};

//Get all Customers
exports.getAllCustomers = async (req, res, next) => {
  try {
    await Customer.find({}, (err, customers) => {
      if (err) return next(err);
      res.status(201).send(customers);
    });
  } catch(err) {
    return next(err);
  }
};

//Get a customer
exports.getCustomer = async (req,res,next) => {
  try {
    await Customer.findById(req.params.customerId, (err, customer) => {
      if (err) res.status(404).send();
      res.status(200).send(customer);
    });
  } catch(err) {
    return next(err);
  }
};

//Update a customer
exports.updateCustomer = async (req, res, next) => {
  try {
    const response = await Customer.findByIdAndUpdate(req.params.customerId, {$set: req.body.customer}, (err, customer) => {
      if (err) return next(err);
      res.status(201).send(customer);
    });
  } catch(err) {
    return next(err);
  }
};

//Delete a customer
exports.deleteCustomer = async (req,res,next) => {
  try {
    Customer.findByIdAndDelete(req.params.customerId, (err, customer) => {
      if (err) return next(err);
      res.status(200).send(`The customer was succesfully deleted`);
    });
  } catch(err) {
    return next(err);
  }
};

//Add a contact to a customer
exports.addContact = async (req,res,next) => {
  try {
    var opts = { runValidators: true };
    Customer.findByIdAndUpdate(req.params.customerId, {$push: {contacts: req.body.contact}}, opts, (err, customer) => {
      if (err) return next(err);
      res.status(200).send(`The contact was succesfully added`);
    });
  } catch(err) {
    return next(err);
  }
}

//Update the contact of a customer
exports.updateContact = async (req,res,next) => {
  try {
    await Customer.findById(req.params.customerId, (err, customer) => {
      const contact = customer.contacts.id(req.params.contactId);
      contact.set(req.body.contact);
      customer.save().then(function(savedPost) {
        res.send(savedPost);
      }).catch(function(err) {
        res.status(500).send(err);
      });
    });
  } catch(err) {
    return next(err);
  }
}

//Delete a contact from a customer
exports.deleteContact = async (req,res,next) => {
  try {
    Customer.findByIdAndUpdate(req.params.customerId, {$pull: {contacts: {_id: req.params.contactId}}}, (err, customer) => {
      res.status(200).send(`The contact was succesfully removed`);
    });
  } catch(err) {
    return next(err);
  }
}

//Search for a customer
exports.getCustomerSearch = async (req, res, next) => {
  try {
    const response = await Customer.fuzzySearch(req.params.searchValue);
    res.status(201).send(response);
  } catch(err) {
    return next(err);
  }
};

//Get the horses of a customer
exports.getHorsesOfCustomer = async (req,res,next) => {
  try {
    const horsesByCustomer = await Horse.find({owner: req.params.customerId}).exec(function(err, horses) {
      if (err) return next(err);
      res.status(200).send(horses);
    })
  } catch(err) {
    return next(err);
  }
};
exports.getEmbryosOfCustomer = async (req,res,next) => {
  try{
    const embryos = await Embryo.find({...req.query, owner:req.params.customerId}).exec();
    return res.json({ embryos });
  }catch (e) {
    return next(e);
  }
}
//Get customer count
// exports.getCustomerCount = async (req, res, next) => {
//   try {
//     await Customer.countDocuments({}, (err, count) => {
//       if (err) res.status(404).send();
//       res.status(201).json(count);
//     });
//   } catch(err) {
//     return next(err);
//   }
// };

//Update the horse of an existing customer
// exports.updateHorseOfCustomer = async (req, res, next) => {
//   try {
//     const response = await Customer.findOneAndUpdate(req.params.customerId, (err, horse) => {
//       if (err) return next(err);
//       res.status(201).send(customer);
//     });
//   } catch(err) {
//     return next(err);
//   }
// };

//Get countries
// exports.getCountries = (req, res, next) => {
//   const countries = Customer.schema.path('country').enumValues;
//   res.status(201).send(countries);
// };
