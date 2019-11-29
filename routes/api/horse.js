const express = require('express');
const router = express.Router();
const horseController = require('../../controllers/horse.js');

router.get('/', horseController.getAllHorses);
router.get('/:id', horseController.getHorse);
router.post('/', horseController.createHorse);
router.put('/:id', horseController.updateHorse);
router.delete('/:id', horseController.deleteHorse);


module.exports = router;
