'use strict'

const { validationResult } = require("express-validator");
const {list, register, verify} = require("../services/responseService");

module.exports = {

    list: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            const responses=  await list();

            return res.status(200).send({
                status: 'Success',
                data: responses
            });
        } catch (err) {
            next(err);
        }
    },

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

    verify: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            return await verify(req, res);

        } catch (err) {
            next(err);
        }
    },

};
