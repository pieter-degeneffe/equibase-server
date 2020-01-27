const express = require('express');
const router = express.Router();
const semenCollectionController = require('../../controllers/semenCollection.js');

router.get('/', semenCollectionController.getAllSemenCollections);
router.post('/', semenCollectionController.createSemenCollection);
router.put('/:id', semenCollectionController.updateSemenCollection);
router.delete('/:id', semenCollectionController.deleteSemenCollection);

module.exports = router;
