'use strict'

const express = require('express');
const router = express.Router();
const EvaluationController = require('../controllers/evaluationController');
const ApiMiddleware = require('../middlewares/apiMiddleware.js');
const {detailEvaluation, registerEvaluation, updateEvaluation} = require('../common/validators/evaluationValidator');
const Role = require("../common/constants/role");

/**
 * @swagger
 * /evaluations:
 *   get:
 *     summary: Get a list of all evaluations
 *     tags: [Evaluations]
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
router.get('/evaluations', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed])], EvaluationController.list);

/**
 * @swagger
 * /evaluations/{id}:
 *   get:
 *     summary: Get a evaluations by ID
 *     tags: [Evaluations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the evaluations
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
router.get('/evaluations/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager, Role.employed]), detailEvaluation()], EvaluationController.detail);

/**
 * @swagger
 * /evaluations:
 *   post:
 *     summary: Create new evaluation
 *     tags: [Evaluations]
 *     requestBody:
 *       description: Evaluation object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: date
 *               endDate:
 *                 type: date
 *               status:
 *                 type: string
 *               department_id:
 *                 type: string
 *             example:
 *                title: "Test colors"
 *                startDate: "2024-08-15"
 *                endDate: "2024-08-20"
 *                status: "active"
 *                department_id: "66b6e1d274432ad53f632e00"
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
router.post('/evaluations', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), registerEvaluation()], EvaluationController.register);

/**
 * @swagger
 * /evaluations/{id}:
 *   put:
 *     summary: Update one evaluation  by ID
 *     description: Update the details of a evaluation by providing the evaluation ID.
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the evaluation to be updated.
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *             66b6cbaf10e23850eaf9294a
 *     requestBody:
 *       description: Updated evaluation information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: integer
 *               status:
 *                 type: string
 *               department_id:
 *                 type: string
 *             example:
 *                title: "Test colors"
 *                startDate: "2024-08-15"
 *                endDate: "2024-08-20"
 *                status: "inactive"
 *                department_id: "66b6e1d274432ad53f632e00"
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'Evaluation updated successfully'
 *       404:
 *         description: Employed not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Evaluation not found'
 */
router.put('/evaluations/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), updateEvaluation()], EvaluationController.update);

module.exports = router;
