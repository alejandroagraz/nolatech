'use strict'

const { validationResult } = require("express-validator");
const {list, detail, register, update} = require("../services/evaluationService");

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
            const evaluations=  await list();

            return res.status(200).send({
                status: 'Success',
                data: evaluations
            });
        } catch (err) {
            next(err);
        }
    },

    detail: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            return await detail(req, res);
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

    update: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            return await update(req, res);

        } catch (err) {
            next(err);
        }
    },

};
