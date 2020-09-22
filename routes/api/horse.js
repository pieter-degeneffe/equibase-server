const express = require('express');
const router = express.Router();
const horseController = require('../../controllers/horse.js');
const locationController = require('../../controllers/location.js');

router.post('/', locationController.checkAvailablePlaces, horseController.createHorse);
router.get('/', horseController.getAllHorses);
router.get('/:horseId', horseController.getHorse);
router.put('/:horseId', locationController.checkAvailablePlaces, horseController.updateHorse);
router.delete('/:horseId', horseController.deleteHorse);

router.post('/:horseId/passport', horseController.createPassport);
router.delete('/:horseId/passport', horseController.deletePassport);

router.post('/:horseId/lodging', horseController.createLodging);
router.delete('/:horseId/lodging/:lodgingId', horseController.deleteLodging);

router.get('/:horseId/embryos', horseController.getEmbryosOfHorse);
router.get('/:horseId/medication', horseController.getStockModsByHorse);

//router.get('/count', horseController.getHorseCount);

module.exports = router;
