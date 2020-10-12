const { error } = require('../utils/logger');
const Customer = require('../models/customer.js');
const Horse = require('../models/horse.js');
const Embryo = require('../models/embryo.js');
const { cleanQuery } = require('../utils/helpers');
const { getItem } = require('../utils/mongoose');
const { updateItemById } = require('../utils/mongoose');
const { getItemById } = require('../utils/mongoose');
const { deleteItem } = require('../utils/mongoose');

//Create a new customer
exports.createCustomer = async (req, res, next) => {
  try {
    const customer = new Customer(req.body.customer);
    await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    return next(err);
  }
};

//Get all Customers
exports.getAllCustomers = async (req, res, next) => {
  try {
    const { options, query } = cleanQuery(req);
    const [customers, total] = await Promise.all([getItem(Customer, query, options), Customer.countDocuments(query)]);
    res.status(200).json({ customers, total });
  } catch (err) {
    return next(err);
  }
};

//Get a customer
exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await getItemById(Customer, req.params.customerId);
    res.status(200).send(customer);
  } catch (err) {
    return next(err);
  }
};

//Update a customer
exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await updateItemById(Customer, req.params.customerId, req.body.customer);
    res.status(200).send(customer);
  } catch (err) {
    return next(err);
  }
};

//Delete a customer
exports.deleteCustomer = async (req, res, next) => {
  try {
    await deleteItem(Customer, req.params.customerId);
    res.status(204).send(`The Customer was successfully deleted`);
  } catch (err) {
    return next(err);
  }
};

//Add a contact to a customer
exports.addContact = async (req, res, next) => {
  try {
    var opts = { runValidators: true };
    Customer.findByIdAndUpdate(req.params.customerId, { $push: { contacts: req.body.contact } }, opts, (err, customer) => {
      if (err) return next(err);
      res.status(200).send(`The contact was succesfully added`);
    });
  } catch (err) {
    return next(err);
  }
};

//Update the contact of a customer
exports.updateContact = async (req, res, next) => {
  try {
    await Customer.findById(req.params.customerId, (err, customer) => {
      const contact = customer.contacts.id(req.params.contactId);
      contact.set(req.body.contact);
      customer.save().then(function (savedPost) {
        res.send(savedPost);
      }).catch((err) => {
        error({ origin: req.originalUrl, method: req.method, error: err });

        res.status(500).send(err);
      });
    });
  } catch (err) {
    return next(err);
  }
};

//Delete a contact from a customer
exports.deleteContact = async (req, res, next) => {
  try {
    const customer = Customer.findByIdAndUpdate(req.params.customerId, { $pull: { contacts: { _id: req.params.contactId } } });
    if (customer) {
      res.status(200).send(`The contact was successfully removed`);
    } else {
      throw {
        statusCode: 404,
        message: `Customer with id ${ req.params.customerId } doesn't exist`,
        status: 'Not Found'
      };
    }
  } catch (err) {
    return next(err);
  }
};

//Search for a customer
exports.getCustomerSearch = async (req, res, next) => {
  try {
    const response = await Customer.fuzzySearch(req.params.searchValue);
    res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
};

//Get the horses of a customer
exports.getHorsesOfCustomer = async (req, res, next) => {
  try {
    const { options, query } = cleanQuery(req);
    query.owner = req.params.customerId;
    const [horses, total] = await Promise.all([
      getItem(Horse, query, options),
      Horse.countDocuments(query),
    ]);
    res.status(200).json({ horses, total });
  } catch (err) {
    console.log('Arne: err= ', err);
    next(err);
  }
}
;
exports.getEmbryosOfCustomer = async (req, res, next) => {
  try {
    const { options, query } = cleanQuery(req);
    query.owner = req.params.customerId;
    const [embryos, total] = await Promise.all([
      getItem(Embryo, query, options),
      Embryo.countDocuments(query),
    ]);
    return res.json({ embryos, total });
  } catch (e) {
    return next(e);
  }
};
//Get customer count
// exports.getCustomerCount = async (req, res, next) => {
//   try {
//     await Customer.countDocuments({}, (err, count) => {
//       if (err) return next(err);
//       res.status(200).json(count);
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
//       res.status(200).send(customer);
//     });
//   } catch(err) {
//     return next(err);
//   }
// };

//Get countries
// exports.getCountries = (req, res, next) => {
//   const countries = Customer.schema.path('country').enumValues;
//   res.status(200).send(countries);
// };
