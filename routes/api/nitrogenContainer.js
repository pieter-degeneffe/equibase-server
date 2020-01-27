const express = require('express');
const router = express.Router();
const nitrogenContainerController = require('../../controllers/nitrogenContainer.js');

router.get('/', nitrogenContainerController.getNitrogenContainers);
router.post('/', nitrogenContainerController.createNitrogenContainer);
router.put('/:id', nitrogenContainerController.updateNitrogenContainer);
router.delete('/:id', nitrogenContainerController.deleteNitrogenContainer);

module.exports = router;
