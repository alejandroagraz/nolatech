'use strict'

const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/authController");
const {loginUser, registerUser} = require('../common/validators/authValidator');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auths]
 *     requestBody:
 *       description: User object to be added
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
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                firstname: "Jose"
 *                lastname: "Agraz"
 *                dni: 12345678
 *                email: "joseagraz29@gmail.com"
 *                username: "admin"
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
router.post ('/auth/register', registerUser(), AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auths]
 *     requestBody:
 *       description: Login Users
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                username: "employed@gmail.com"
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
router.post ('/auth/login', loginUser(), AuthController.login);

module.exports = router;
