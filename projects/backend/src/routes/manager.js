'use strict'

const express = require('express');
const router = express.Router();
const ManagerController = require('../controllers/managerController');
const ApiMiddleware = require('../middlewares/apiMiddleware.js');
const {detailManager, registerManager, updateManager} = require('../common/validators/managerValidator');
const Role = require("../common/constants/role");

/**
 * @swagger
 * /managers:
 *   get:
 *     summary: Get a list of all managers
 *     tags: [Managers]
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
router.get('/managers', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin])], ManagerController.list);

/**
 * @swagger
 * /managers/{id}:
 *   get:
 *     summary: Get a manager by ID
 *     tags: [Managers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the manager
 *         schema:
 *           type: string
 *         example:
 *             66b6ca1010e23850eaf9293e
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       404:
 *         description: Managers not found
 */
router.get('/managers/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin]), detailManager()], ManagerController.detail);

/**
 * @swagger
 * /managers:
 *   post:
 *     summary: Create new manager
 *     tags: [Managers]
 *     requestBody:
 *       description: Managers object to be added
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
 *             example:
 *                firstname: "Lionel"
 *                lastname: "Messi"
 *                dni: 10101010
 *                gender: "man"
 *                address: "Cra. 87 #30-65, Medellín, Antioquia, Colombia"
 *                email: "manager@gmail.com"
 *                username: "manager"
 *                password: "Passw*123"
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
router.post('/managers', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin]), registerManager()], ManagerController.register);

/**
 * @swagger
 * /managers/{id}:
 *   put:
 *     summary: Update one manager  by ID
 *     description: Update the details of a manager by providing the manager ID.
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the manager to be updated.
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *             66b6ca1010e23850eaf9293e
 *     requestBody:
 *       description: Updated manager information
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
 *             example:
 *                firstname: "Lionel"
 *                lastname: "Messi"
 *                dni: 10101010
 *                gender: "man"
 *                address: "Cra. 87 #30-65, Medellín, Antioquia, Colombia"
 *                email: "manager@gmail.com"
 *                username: "goat10"
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'Manager updated successfully'
 *       404:
 *         description: Manager not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Manager not found'
 */
router.put('/managers/:id', [ApiMiddleware.isLoggedIn, ApiMiddleware.verifyRole([Role.admin]), updateManager()], ManagerController.update);

module.exports = router;
