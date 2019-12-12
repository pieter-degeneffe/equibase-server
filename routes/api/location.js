const express = require('express');
const router = express.Router();
const locationController = require('../../controllers/location.js');

router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocation);
router.post('/', locationController.createLocation);
router.put('/:id', locationController.updateLocation);

module.exports = router;
