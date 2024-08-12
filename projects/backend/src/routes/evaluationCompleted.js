'use strict'

const express = require('express');
const router = express.Router();
const EvaluationCompletedController = require('../controllers/evaluationCompletedController');
const ApiMiddleware = require('../middlewares/apiMiddleware.js');
const {completedEvaluation, detailCompletedEvaluation} = require('../common/validators/evaluationCompletedValidator');
const Role = require("../common/constants/role");

/**
 * @swagger
 * /completed/evaluations:
 *   get:
 *     summary: Get a list of all evaluations completed
 *     tags: [Evaluations completed]
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
router.get('/completed/evaluations', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed])], EvaluationCompletedController.listCompleted);

/**
 * @swagger
 * /completed/evaluations/{id}:
 *   get:
 *     summary: Get a evaluations completed by ID evaluations
 *     tags: [Evaluations completed]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the evaluation
 *         schema:
 *           type: string
 *         example:
 *             66b6cbaf10e23850eaf9294a
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       404:
 *         description: Evaluation not found
 */
router.get('/completed/evaluations/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed])], EvaluationCompletedController.detailCompleted);

/**
 * @swagger
 * /evaluations/{id}/submit:
 *   post:
 *     summary: Completed evaluation send
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the evaluation to be submit.
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *             66b6cbaf10e23850eaf9294a
 *     requestBody:
 *       description: Completed evaluation object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *             example:
 *                comment: "I had no problems when carrying out the evaluation"
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
router.post('/evaluations/:id/submit', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.employed]), completedEvaluation()], EvaluationCompletedController.submit);

/**
 * @swagger
 * /reports/employed/{id}:
 *   get:
 *     summary: Get a report in format xlsx to evaluations completed by ID employed
 *     tags: [Evaluations completed]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employed
 *         schema:
 *           type: string
 *         example:
 *             66b6b64dbd23bd28b426c8d5
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/vnd.ms-excel:
 *              schema:
 *                  type: string
 *                  format: binary
 */
router.get('/reports/employed/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), detailCompletedEvaluation()], EvaluationCompletedController.reportEmployed);

/**
 * @swagger
 * /reports/department/{id}:
 *   get:
 *     summary: Get a report in format xlsx to evaluations completed by ID department
 *     tags: [Evaluations completed]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the department
 *         schema:
 *           type: string
 *         example:
 *             66b6ca3e10e23850eaf92941
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/vnd.ms-excel:
 *              schema:
 *                  type: string
 *                  format: binary
 */
router.get('/reports/department/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), detailCompletedEvaluation()], EvaluationCompletedController.reportDepartment);

module.exports = router;
