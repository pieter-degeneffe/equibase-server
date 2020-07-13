const express = require('express');
const router = express.Router();
const icsiController = require('../../controllers/icsi.js');

router.get('/', icsiController.getAllICSI);
router.get('/embryos', icsiController.getAllEmbryos);
router.post('/transfer', icsiController.transferEmbryo);
router.post('/export', icsiController.exportEmbryo);
router.post('/', icsiController.createICSI);
router.get('/:icsiId', icsiController.getICSI);
router.delete('/:icsiId', icsiController.deleteICSI);
// router.put('/:icsiId', icsiController.updateICSI);
// router.get('/:icsiId/embryo', icsiController.getAllEmbryosByICSIId);
// router.post('/:icsiId/embryo', icsiController.addEmbryos);


module.exports = router;
