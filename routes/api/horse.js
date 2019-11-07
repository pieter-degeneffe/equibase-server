const express = require('express');
const router = express.Router();
const horseController = require('../../controllers/horse.js');

router.get('/', horseController.displayAllHorses);
router.get('/:id', horseController.displaySpecificHorse);
router.post('/', horseController.createHorse);
router.put('/:id', horseController.updateHorse);
router.delete('/:id', horseController.deleteHorse);

module.exports = router;
