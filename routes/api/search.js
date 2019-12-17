const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/search.js');

router.get('/:id', searchController.getSearch);

module.exports = router;
