const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/search.js');

router.get('/product/:searchValue', searchController.searchProduct);
router.get('/:searchValue', searchController.getSearch);

module.exports = router;
