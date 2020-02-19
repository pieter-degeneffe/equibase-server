const express = require('express');
const router = express.Router();
const nitrogenContainerController = require('../../controllers/nitrogenContainer.js');

router.post('/', nitrogenContainerController.createNitrogenContainer);
router.get('/', nitrogenContainerController.getNitrogenContainers);
router.put('/:nitrogenContainerId', nitrogenContainerController.updateNitrogenContainer);
router.delete('/:nitrogenContainerId', nitrogenContainerController.deleteNitrogenContainer);

module.exports = router;
