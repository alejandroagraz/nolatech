'use strict'

const express = require('express');
const router = express.Router();
const EmployedController = require('../controllers/employedController');
const ApiMiddleware = require('../middlewares/apiMiddleware.js');
const {detailEmployed, registerEmployed, updateEmployed} = require('../common/validators/employedValidator');
const Role = require("../common/constants/role");

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get a list of all employees
 *     tags: [Employees]
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
router.get('/employees', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager])], EmployedController.list);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get a employed by ID
 *     tags: [Employees]
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
 *           application/json:
 *             example:
 *               data: {}
 *       404:
 *         description: Employed not found
 */
router.get('/employees/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), detailEmployed()], EmployedController.detail);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create new employed
 *     tags: [Employees]
 *     requestBody:
 *       description: Employed object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               dni:
 *                 type: integer
 *               gender:
 *                 type: string
 *               address:
 *                 type: integer
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               department_id:
 *                 type: string
 *             example:
 *                firstname: "Cristiano"
 *                lastname: "Ronaldo"
 *                dni: 98765432
 *                gender: "man"
 *                address: "Cra. 87 #30-65, Medellín, Antioquia, Colombia"
 *                email: "employed@gmail.com"
 *                username: "employed"
 *                password: "Passw*123"
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
router.post('/employees', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), registerEmployed()], EmployedController.register);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update one employed  by ID
 *     description: Update the details of a employed by providing the employed ID.
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the employed to be updated.
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *             66b6b64dbd23bd28b426c8d5
 *     requestBody:
 *       description: Updated employed information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               dni:
 *                 type: integer
 *               gender:
 *                 type: string
 *               address:
 *                 type: integer
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               department_id:
 *                 type: string
 *             example:
 *                firstname: "Cristiano"
 *                lastname: "Ronaldo"
 *                dni: 98765432
 *                gender: "man"
 *                address: "Cra. 87 #30-65, Medellín, Antioquia, Colombia"
 *                email: "employed@gmail.com"
 *                username: "employed"
 *                department_id: "66b6e1d274432ad53f632e00"
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'Employed updated successfully'
 *       404:
 *         description: Employed not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Employed not found'
 */
router.put('/employees/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager]), updateEmployed()], EmployedController.update);

module.exports = router;
