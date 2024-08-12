'use strict'

const express = require('express');
const router = express.Router();
const ResponseController = require('../controllers/responseController');
const ApiMiddleware = require('../middlewares/apiMiddleware.js');
const {registerResponse, verifyResponse} = require('../common/validators/responseValidator');
const Role = require("../common/constants/role");

/**
 * @swagger
 * /responses:
 *   get:
 *     summary: Get a list of all Responses
 *     tags: [Responses]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get('/responses', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed])], ResponseController.list);

/**
 * @swagger
 * /responses:
 *   post:
 *     summary: Create new response
 *     tags: [Responses]
 *     requestBody:
 *       description: Responses object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: string
 *               question_id:
 *                 type: string
 *             example:
 *                response: "Is color blue"
 *                question_id: "66b6ddd20988887e0b67f73d"
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 */
router.post('/responses', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.employed]), registerResponse()], ResponseController.register);

/**
 * @swagger
 * /responses/verify/{id}:
 *   post:
 *     summary: Verify response
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the response to be verify.
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *             66b814381379c2ff6f90af79
 *     requestBody:
 *       description: Responses object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCorrect:
 *                 type: boolean
 *             example:
 *                isCorrect: true
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 */
router.post('/responses/verify/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), verifyResponse()], ResponseController.verify);

module.exports = router;
