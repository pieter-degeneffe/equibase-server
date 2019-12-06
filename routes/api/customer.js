const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer.js');

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/count', customerController.getCustomerCount);
router.get('/countries', customerController.getCountries);
router.get('/:id', customerController.getCustomer);
router.get('/:id/horse', customerController.getHorsesOfCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.post('/:id/contact', customerController.addContact);
router.put('/:id/contact/:contactId', customerController.updateContact);
router.delete('/:id/contact/:contactId', customerController.deleteContact);
module.exports = router;
