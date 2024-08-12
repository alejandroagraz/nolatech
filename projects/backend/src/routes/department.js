'use strict'

const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departmentController');
const ApiMiddleware = require('../middlewares/apiMiddleware.js');
const {registerDepartment} = require('../common/validators/departmentValidator');
const Role = require("../common/constants/role");

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get a list of all departments
 *     tags: [Departments]
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
router.get('/departments', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin, Role.manager])], DepartmentController.list);

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Create new department
 *     tags: [Departments]
 *     requestBody:
 *       description: Department object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               manager_id:
 *                 type: string
 *             example:
 *                name: "Appliance"
 *                description: "electronic articles"
 *                manager_id: "66b6ca1010e23850eaf9293e"
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
router.post('/departments', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin]), registerDepartment()], DepartmentController.register);

module.exports = router;
