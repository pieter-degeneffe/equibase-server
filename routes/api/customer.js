const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer.js');

router.post('/', customerController.createCustomer);
router.get('/', customerController.displayAllCustomers);
// router.get('/:id', customerController.displaySpecificCustomer);
// router.put('/:id', horseController.updateHorse);
// router.delete('/:id', horseController.deleteHorse);

module.exports = router;
