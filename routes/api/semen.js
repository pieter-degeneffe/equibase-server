const express = require('express');
const router = express.Router();
const semenCollectionController = require('../../controllers/semen.js');

router.get('/', semenCollectionController.getAllSemenCollections)
router.get('/:id', semenCollectionController.getSemenCollection);
router.post('/', semenCollectionController.createSemenCollection);
router.put('/:id', semenCollectionController.updateSemenCollection);
router.delete('/:id', semenCollectionController.deleteSemenCollection);

router.post('/:collectionId/modification', semenCollectionController.createModification);
router.delete('/:collectionId/modification/:modificationId', semenCollectionController.deleteModification);


module.exports = router;
