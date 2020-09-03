const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/search.js');
/**
 * @swagger
 * /search/product/{searchValue}:
 *    get:
 *      summary: Search for a product
 *      tags: [Search]
 *      parameters:
 *        - in: path
 *          name: searchValue
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: An array of Products
 */
router.get('/product/:searchValue', searchController.searchProduct);
/**
 * @swagger
 * /search/{searchValue}:
 *    get:
 *      summary: Search for customers and/or horses
 *      tags: [Search]
 *      parameters:
 *        - in: path
 *          name: searchValue
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: Search result array
 */
router.get('/:searchValue', searchController.getSearch);

module.exports = router;
