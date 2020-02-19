const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer.js');

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:customerId', customerController.getCustomer);
router.put('/:customerId', customerController.updateCustomer);
router.delete('/:customerId', customerController.deleteCustomer);

router.post('/:customerId/contact', customerController.addContact);
router.put('/:customerId/contact/:contactId', customerController.updateContact);
router.delete('/:customerId/contact/:contactId', customerController.deleteContact);

router.get('/search/:searchValue', customerController.getCustomerSearch);
router.get('/:customerId/horse', customerController.getHorsesOfCustomer);

// router.get('/count', customerController.getCustomerCount);
// router.get('/countries', customerController.getCountries);
module.exports = router;
