const express = require('express');
const router = express.Router();
const semenCollectionController = require('../../controllers/semen/collection.js');
const semenCollectionModificationController = require('../../controllers/semen/collectionModification.js');

router.get('/', semenCollectionController.getAllSemenCollections)
router.get('/:id', semenCollectionController.getSemenCollection);
router.post('/', semenCollectionController.createSemenCollection);
router.put('/:id', semenCollectionController.updateSemenCollection);
router.delete('/:id', semenCollectionController.deleteSemenCollection);

router.post('/:collectionId/modification', semenCollectionModificationController.createModification);


module.exports = router;
