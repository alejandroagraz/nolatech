'use strict'

const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');
const ApiMiddleware = require('../middlewares/apiMiddleware.js');
const {detailQuestion, registerQuestion, updateQuestion} = require('../common/validators/questionValidator');
const Role = require("../common/constants/role");

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get a list of all questions
 *     tags: [Questions]
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
router.get('/questions', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed])], QuestionController.list);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the question
 *         schema:
 *           type: string
 *         example:
 *             66b6d66711b759cad8d33fd5
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       404:
 *         description: Question not found
 */
router.get('/questions/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed]), detailQuestion()], QuestionController.detail);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create new question
 *     tags: [Questions]
 *     requestBody:
 *       description: Question object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               evaluation_id:
 *                 type: string
 *             example:
 *                question: "What color is the color blue?"
 *                evaluation_id: "66b6cbaf10e23850eaf9294a"
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
router.post('/questions', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), registerQuestion()], QuestionController.register);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update one question  by ID
 *     description: Update the details of a question by providing the question ID.
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the question to be updated.
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *             66b6d66711b759cad8d33fd5
 *     requestBody:
 *       description: Updated question information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               evaluation_id:
 *                 type: string
 *             example:
 *                question: "What color is the color black?"
 *                evaluation_id: "66b6cbaf10e23850eaf9294a"
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'Question updated successfully'
 *       404:
 *         description: Question not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Question not found'
 */
router.put('/questions/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed]), updateQuestion()], QuestionController.update);

module.exports = router;
