const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.js');

/**
 * @swagger
 * /product:
 *    get:
 *      summary: Get all products
 *      tags: [Product]
 *      responses:
 *        "200":
 *          description: A paginated list of all products
 */
router.get('/', productController.getAllProducts);
/**
 * @swagger
 * /product:
 *    post:
 *      summary: Create a new product
 *      tags: [Product]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product:
 *                  $ref: "#/components/schemas/Product"
 *      responses:
 *        "201":
 *          description: A paginated list of all products
 *        "400":
 *          description: Bad Request
 */
router.post('/', productController.createProduct);
/**
 * @swagger
 * /product/batch:
 *    post:
 *      summary: Create a batch of products
 *      tags: [Product]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                products:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Product"
 *      responses:
 *        "201":
 *          description: A list of all newly created products
 *        "400":
 *          description: Bad Request
 */
router.post('/batch', productController.batchCreateProducts);
/**
 * @swagger
 * /product/{productId}:
 *    get:
 *      summary: Get the stock of a specific product
 *      tags: [Product]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: A Product object
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 */
router.get('/:id', productController.getProduct);
/**
 * @swagger
 * /product/{productId}:
 *    put:
 *      summary: Update an existing product
 *      tags: [Product]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product:
 *                  $ref: "#/components/schemas/Product"
 *      responses:
 *        "201":
 *          description: The updated Product
 *        "400":
 *          description: Bad Request
 */
router.put('/:id', productController.updateProduct);
/**
 * @swagger
 * /product/{productId}:
 *    delete:
 *      summary: Delete a  product
 *      tags: [Product]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: The product was successfully deleted
 *        "400":
 *          description: Bad Request
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
