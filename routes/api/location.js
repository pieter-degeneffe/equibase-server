const express = require('express');
const router = express.Router();
const locationController = require('../../controllers/location.js');

router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocations);
router.get('/:locationId', locationController.getLocation);
router.put('/:locationId', locationController.getLocation, locationController.checkAvailablePlaces, locationController.updateLocation);
router.delete('/:locationId', locationController.deleteLocation);

module.exports = router;
