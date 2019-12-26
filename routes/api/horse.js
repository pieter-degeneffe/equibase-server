const express = require('express');
const router = express.Router();
const horseController = require('../../controllers/horse.js');
const locationController = require('../../controllers/location.js');

router.get('/', horseController.getAllHorses);
router.get('/count', horseController.getHorseCount);
router.get('/:id', horseController.getHorse);
router.post('/', locationController.checkAvailablePlaces, horseController.createHorse);
router.put('/:id', locationController.checkAvailablePlaces, horseController.updateHorse);
router.delete('/:id', horseController.deleteHorse);
router.post('/:id/passport', horseController.createPassport);
router.delete('/:id/passport', horseController.deletePassport);

module.exports = router;
