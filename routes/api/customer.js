const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer.js');

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/countries', customerController.getCountries);
router.get('/:id', customerController.getCustomer);
router.get('/:id/horse', customerController.getHorsesOfCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
