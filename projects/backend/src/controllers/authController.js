'use strict'

const { validationResult } = require("express-validator");
const {login, register} = require("../services/authService");

module.exports = {

    register: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            return await register(req, res);
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            return await login(req, res);
        } catch (err) {
            next(err);
        }
    },

};
